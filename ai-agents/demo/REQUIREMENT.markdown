# Requirements for Robinhood Clone Take-Home Assignment

## Overview

This document outlines the requirements for building a simplified Robinhood clone, a stock-trading web application, as a take-home assignment. The app includes core functionality for user authentication, portfolio management, and stock data display using real stock data from the Yahoo Finance API via the `yfinance` Python library. It is implemented using Flask (backend) and React with TypeScript (frontend). Optional agentic AI features demonstrate autonomous capabilities aligned with SellScale’s AI-driven sales outreach focus. The assignment is designed to be completed in 5–7 hours for the non-agentic version, with an additional 8.5–10.5 hours for agentic features.

## Non-Agentic Requirements

The non-agentic version is a minimal stock-trading app with user authentication, a dashboard, and trading functionality using real stock data.

### Functional Requirements

1. **User Authentication**:
   - Users can sign up with an email and password.
   - Users can log in with valid credentials.
   - Users can log out.
   - Only authenticated users can access the dashboard.
2. **Dashboard**:
   - Display a user’s portfolio (e.g., list of owned stocks, quantities, total value based on current prices).
   - Show real-time or historical stock prices for a few stocks (e.g., AAPL, TSLA, MSFT) fetched via `yfinance`.
   - Include a navigation bar with links to Login, Signup, Dashboard, and Logout.
3. **Stock Trading**:
   - Users can “buy” stocks by specifying a ticker and quantity (mock transaction, no real payment).
   - Users can “sell” owned stocks.
   - Update portfolio value using current stock prices from `yfinance`.
4. **Watchlist**:
   - Users can add/remove stocks to a watchlist.
   - Display watchlist stocks with current prices from `yfinance`.

### Technical Requirements

- **Backend**:
  - Use Flask with a modular structure inspired by https://github.com/thebearpark/sellscale-backend:
    - `app/models/`: User, Stock, Transaction, Watchlist models.
    - `app/routes/`: Blueprints for auth, trading, and stock data routes.
    - `app/extensions/`: SQLAlchemy, JWTManager.
    - `app/config.py`: Configuration with environment variables.
    - `run.py`: Entry point.
  - Database: SQLite for simplicity.
  - Authentication: JWT for securing routes.
  - Stock Data: Use `yfinance` to fetch real-time or historical stock prices (e.g., `yf.Ticker("AAPL").info["regularMarketPrice"]` for current price).
  - Example Endpoint: `/stocks` returns prices for specified tickers (e.g., `{"AAPL": 150.25, "TSLA": 700.10, "MSFT": 300.50}`).
  - Dependencies: `flask`, `flask-sqlalchemy`, `flask-jwt-extended`, `flask-cors`, `python-dotenv`, `bcrypt`, `yfinance`.
- **Frontend**:
  - Use React with TypeScript, organized using Atomic Design:
    - **Atoms**: Button, TextField, Typography (Material-UI wrappers).
    - **Molecules**: FormField (input with label), StockRow (display ticker and price).
    - **Organisms**: Navbar, AuthForm, PortfolioTable, TradingForm, WatchlistTable.
    - **Pages**: Login, Signup, Dashboard.
  - UI Library: Material-UI for responsive, professional design.
  - Routing: React Router for navigation.
  - Dependencies: `@mui/material`, `axios`, `react-router-dom`, `@emotion/react`, `@emotion/styled`.
- **Constraints**:
  - Use `yfinance` for stock data; no other real APIs required.
  - Cache stock data for 5 minutes to avoid excessive API calls (store in memory or database).
  - No payment integration.
  - Keep UI simple but functional (responsive, clear layout).
  - Complete in 5–7 hours.

### Deliverables

- GitHub repository with:
  - Backend: Flask app with modular structure, `yfinance` integration.
  - Frontend: React/TypeScript app with Atomic Design.
  - `.env` template for environment variables (e.g., `JWT_SECRET_KEY`).
  - `requirements.txt` and `package.json` for dependencies.
- README with:
  - Setup instructions (e.g., `pip install -r requirements.txt`, `npm install`, `flask run`, `npm start`).
  - Assumptions (e.g., `yfinance` for stock data, SQLite for database).
  - Notes on scalability (e.g., use PostgreSQL, rate-limit API calls in production).
- Working app with:
  - Signup/login functionality.
  - Dashboard showing portfolio and watchlist with real stock prices.
  - Buy/sell stock feature using current prices.
  - Responsive UI.

### Evaluation Criteria

- **Functionality**: All features (signup, login, dashboard, trading, watchlist) work with real stock data.
- **Code Quality**: Clean, modular code following `sellscale-backend` and Atomic Design.
- **Security**: Password hashing, JWT for protected routes, input sanitization.
- **UI/UX**: Simple, responsive, intuitive interface with clear error messages (e.g., “Invalid ticker”).
- **Data Handling**: Efficient use of `yfinance` with caching to avoid API overuse.
- **Documentation**: Clear README with setup and assumptions.
- **Time Management**: Completed within 5–7 hours, prioritizing core features.

### Time Estimate

- Backend (2.5–3.5 hours): Setup Flask, models, auth/trading routes, `yfinance` integration, stock data endpoint.
- Frontend (2–3 hours): Build atoms, molecules, organisms (Navbar, PortfolioTable), pages, integrate APIs.
- Testing/Documentation (0.5–1 hour): Test features, write README.
- Total: 5–7 hours.

## Agentic AI Requirements (Optional)

The agentic AI features extend the non-agentic app to demonstrate autonomous, proactive behavior, using real stock data for context. These align with SellScale’s focus on AI-driven sales outreach and task execution.

### Functional Requirements

1. **Portfolio Recommendations**:
   - Endpoint: `/recommend-stocks` analyzes user’s portfolio and recent stock price trends (via `yfinance`) to suggest stocks to buy/sell.
   - Example: “AAPL’s price rose 5% this week; consider holding.”
   - UI: Button in dashboard to trigger recommendations; display results in a list.
2. **Trading Plan Generation**:
   - Endpoint: `/plan-trading` accepts a goal (e.g., “Increase portfolio by 10%”) and generates a multistep plan using stock data (e.g., \[“Buy 10 shares of MSFT at $300”, “Set price alert”\]).
   - UI: Form in dashboard to input goal; display plan with steps.
3. **Stock Tip Outreach**:
   - Endpoint: `/generate-email` creates personalized email drafts to share stock tips, incorporating real stock data (e.g., “Hi John, AAPL is up 5% this week…”).
   - UI: Form in dashboard to input prospect details and stock; display generated email.

### Technical Requirements

- **Backend**:
  - Add `outreach` blueprint in `app/routes/outreach.py` for agentic endpoints.
  - Mock AI Logic: Use rule-based logic with `yfinance` data (e.g., recommend stocks with positive weekly change) to simulate AI.
  - Example: Use `yf.Ticker("AAPL").history(period="1w")` for price trends.
  - Model (Optional): Add `TradingPlan` model to store plans (JSON field for tasks).
  - Secure all endpoints with JWT.
  - Cache `yfinance` data to avoid excessive API calls.
- **Frontend**:
  - New Organisms:
    - `Recommendations`: Display stock suggestions with price trends.
    - `TradingPlan`: Input goal and show plan.
    - `StockTip`: Input prospect/stock and display email.
  - Update `Dashboard.tsx` to include new organisms.
  - Use existing atoms (Button, Typography) and molecules (FormField).
- **Constraints**:
  - No real LLMs (use mock logic with `yfinance` data).
  - Keep agentic features simple but autonomous (e.g., generate plans without user micromanagement).
  - Complete in 8.5–10.5 hours.

### Deliverables

- Updated GitHub repository with:
  - New `outreach` blueprint and endpoints using `yfinance` data.
  - New frontend organisms for agentic features.
  - Updated README with agentic feature instructions.
- Working app with:
  - Recommendations based on real stock trends.
  - Trading plan generation using stock prices.
  - Email drafts with stock data context.
- Notes in README on:
  - Mock AI usage with `yfinance`.
  - Potential production upgrades (e.g., integrate OpenAI, use WebSocket for real-time prices).

### Evaluation Criteria

- **Agentic Behavior**: Features demonstrate autonomy (e.g., proactive recommendations, task planning).
- **Integration**: Seamless use of real stock data in agentic features.
- **Code Quality**: Modular, reusable code for agentic features.
- **UI/UX**: Intuitive interface for triggering and viewing agentic outputs.
- **Scalability**: Notes on production improvements (e.g., real LLM, rate-limited API calls).

### Time Estimate

- Backend (3.5–4.5 hours): Add outreach blueprint, implement three endpoints, integrate `yfinance` for trends.
- Frontend (4–5 hours): Build three organisms, update dashboard, integrate APIs.
- Testing/Documentation (1 hour): Test features, update README.
- Total: 8.5–10.5 hours (added to 5–7 hours for non-agentic).

## General Guidelines

- **Prioritization**: Complete non-agentic features first; add agentic features if time allows.
- **Scalability Notes**: In README, mention production upgrades (e.g., PostgreSQL, rate-limited `yfinance` calls, real LLM).
- **Security**: Hash passwords, use JWT, sanitize inputs.
- **Testing**: Manually test all features (signup, login, trading, watchlist, agentic features).
- **Submission**:
  - Host on GitHub (private if needed).
  - Include