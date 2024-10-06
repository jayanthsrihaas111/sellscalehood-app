# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import yfinance as yf
import firebase_admin
from firebase_admin import credentials, db
import logging

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Initialize Firebase Admin SDK
cred = credentials.Certificate('firebase_credentials.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://sellscalehood-app-default-rtdb.firebaseio.com/'
})

# Initialize logging
logging.basicConfig(level=logging.INFO)

# Reference to the database
ref = db.reference('/')

# Endpoint to query stock data
@app.route('/api/query', methods=['GET'])
def query_stock():
    ticker = request.args.get('ticker')
    if not ticker:
        logging.warning("Ticker symbol not provided.")
        return jsonify({'error': 'Ticker is required'}), 400

    try:
        logging.info(f"Fetching data for ticker: {ticker}")
        stock = yf.Ticker(ticker)
        data = stock.info

        # Log the retrieved data
        logging.info(f"Data fetched for ticker {ticker}: {data}")

        # Check for 'regularMarketPrice' or provide fallback
        price = data.get('regularMarketPrice') or data.get('currentPrice') or data.get('previousClose')
        if price is None:
            logging.warning(f"No price information found for ticker: {ticker}")
            return jsonify({'error': 'Stock data not available or not found'}), 404

        return jsonify({
            'ticker': ticker.upper(),
            'price': price,
            'name': data.get('shortName', 'N/A')
        })
    except Exception as e:
        logging.error(f"Error fetching data for ticker {ticker}: {str(e)}")
        return jsonify({'error': 'Query failed'}), 500


# Helper function to validate ticker symbol
def is_valid_ticker(ticker):
    try:
        stock = yf.Ticker(ticker)
        # Check if the returned info contains any valid information
        if 'shortName' in stock.info and stock.info['shortName']:
            return True
    except Exception as e:
        logging.error(f"Error validating ticker {ticker}: {str(e)}")
    return False

# Endpoint to buy a stock
@app.route('/api/buy', methods=['POST'])
def buy_stock():
    data = request.get_json()
    ticker = data.get('ticker')
    quantity = data.get('quantity')
    
    # Log the incoming request data
    logging.info(f"Received buy request - Ticker: {ticker}, Quantity: {quantity}")

    if not ticker or not quantity:
        logging.warning("Missing ticker or quantity in buy request.")
        return jsonify({'error': 'Ticker and quantity are required'}), 400

    # Validate the ticker symbol
    if not is_valid_ticker(ticker):
        logging.warning(f"Invalid ticker symbol: {ticker}")
        return jsonify({'error': 'Invalid ticker symbol'}), 400

    try:
        portfolio_ref = ref.child('portfolio')
        portfolio_ref.push({
            'ticker': ticker.upper(),
            'quantity': quantity,
            'type': 'buy'
        })
        return jsonify({'message': 'Stock bought successfully'}), 200
    except Exception as e:
        logging.error(f"Error during buy transaction: {str(e)}")
        return jsonify({'error': 'Transaction failed'}), 500

# Endpoint to sell a stock
@app.route('/api/sell', methods=['POST'])
def sell_stock():
    data = request.get_json()
    ticker = data.get('ticker')
    quantity = data.get('quantity')
    
    # Log the incoming request data
    logging.info(f"Received sell request - Ticker: {ticker}, Quantity: {quantity}")

    if not ticker or not quantity:
        logging.warning("Missing ticker or quantity in sell request.")
        return jsonify({'error': 'Ticker and quantity are required'}), 400

    # Validate the ticker symbol
    if not is_valid_ticker(ticker):
        logging.warning(f"Invalid ticker symbol: {ticker}")
        return jsonify({'error': 'Invalid ticker symbol'}), 400

    try:
        portfolio_ref = ref.child('portfolio')
        portfolio_ref.push({
            'ticker': ticker.upper(),
            'quantity': quantity,
            'type': 'sell'
        })
        return jsonify({'message': 'Stock sold successfully'}), 200
    except Exception as e:
        logging.error(f"Error during sell transaction: {str(e)}")
        return jsonify({'error': 'Transaction failed'}), 500



# Endpoint to view portfolio
@app.route('/api/portfolio', methods=['GET'])
def view_portfolio():
    try:
        portfolio_ref = ref.child('portfolio')
        portfolio = portfolio_ref.get()
        portfolio_list = []
        if portfolio:
            for key, value in portfolio.items():
                portfolio_list.append(value)
        return jsonify({'portfolio': portfolio_list}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
