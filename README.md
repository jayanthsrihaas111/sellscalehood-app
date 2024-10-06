# SellScaleHood Application

SellScaleHood is a simple stock trading web application inspired by Robinhood. This project features a full-stack solution with a backend built using Flask and a frontend using ReactJS, leveraging Firebase as a real-time database for portfolio management.

## Technologies Used
- **Backend**: Flask, Firebase Admin SDK, yfinance
- **Frontend**: React, Material-UI
- **Database**: Firebase Realtime Database


## Getting Started
Follow these steps to set up the backend and frontend locally.

### Backend Setup
1. **Clone the Repository**:
   ```sh
   git clone https://github.com/jayanthsrihaas111/sellscalehood-app.git
   cd sellscalehood-app/backend
   ```

2. **Create a Virtual Environment**:
   ```sh
   python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install Dependencies**:
   ```sh
   pip install -r requirements.txt
   ```
   Make sure you have `requirements.txt` with the following content:
   ```
   Flask==3.0.3
   Flask-Cors==5.0.0
   firebase-admin==6.5.0
   yfinance==0.2.44
   python-dotenv==1.0.1
   ```

4. **Firebase Setup**:
   - Obtain your Firebase credentials JSON file from the Firebase Console.
   - Place the credentials file in the `backend` directory and name it `firebase_credentials.json`.

5. **Create a `.env` File**:
   - Create a `.env` file in the `backend` directory with the following content:
     ```env
     FIREBASE_CREDENTIALS_PATH=firebase_credentials.json
     DATABASE_URL=https://sellscalehood-app-default-rtdb.firebaseio.com/
     ```

6. **Start the Backend Server**:
   ```sh
   python app.py
   ```
   The backend server will run at `http://127.0.0.1:5000`.

### Frontend Setup
1. **Navigate to the Frontend Directory**:
   ```sh
   cd ../frontend
   ```

2. **Install Dependencies**:
   ```sh
   npm install
   ```

3. **Proxy Setup**:
   - Make sure the `proxy` field in `package.json` points to your backend server:
     ```json
     "proxy": "http://localhost:5000"
     ```

4. **Start the Frontend Server**:
   ```sh
   npm start
   ```
   The frontend server will run at `http://localhost:3000`.

## Running the Application
Once both the backend and frontend servers are running, you can open your browser and navigate to `http://localhost:3000` to interact with the SellScaleHood application.

- **Query Stock**: Look up stock prices using a valid ticker symbol.
- **Buy/Sell Stock**: Buy or sell stocks by entering a ticker symbol and the quantity.
- **View Portfolio**: View all transactions, including buy and sell records.

## API Documentation
The backend provides the following API endpoints:

- **GET `/api/query`**: Query stock data.
  - **Params**: `ticker` (string) - Stock ticker symbol.
- **POST `/api/buy`**: Buy a stock.
  - **Body**: `{ "ticker": "TSLA", "quantity": 1 }`
- **POST `/api/sell`**: Sell a stock.
  - **Body**: `{ "ticker": "AAPL", "quantity": 2 }`
- **GET `/api/portfolio`**: View the user's portfolio.
