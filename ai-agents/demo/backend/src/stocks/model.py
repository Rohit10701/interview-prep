from app import db
from datetime import datetime

class Stock(db.Model):
    """Stock model for basic stock information"""
    __tablename__ = 'stocks'
    
    id = db.Column(db.Integer, primary_key=True)
    ticker = db.Column(db.String(10), unique=True, nullable=False, index=True)
    name = db.Column(db.String(120), nullable=False)
    last_price = db.Column(db.Float, nullable=True)
    last_updated = db.Column(db.DateTime, nullable=True)
    
    # Relationships
    user_stocks = db.relationship('UserStock', back_populates='stock', lazy='dynamic')
    watchlist_items = db.relationship('WatchlistItem', back_populates='stock', lazy='dynamic')
    
    def __repr__(self):
        return f'<Stock {self.ticker}>'
    
    def update_price(self, price):
        """Update the stock price"""
        self.last_price = price
        self.last_updated = datetime.utcnow()
        db.session.commit()


class UserStock(db.Model):
    """Model for user's owned stocks"""
    __tablename__ = 'user_stocks'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    stock_id = db.Column(db.Integer, db.ForeignKey('stocks.id'), nullable=False)
    quantity = db.Column(db.Float, nullable=False, default=0)
    average_buy_price = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = db.relationship('User', back_populates='stocks')
    stock = db.relationship('Stock', back_populates='user_stocks')
    
    # Unique constraint: A user can only have one entry per stock
    __table_args__ = (
        db.UniqueConstraint('user_id', 'stock_id', name='uix_user_stock'),
    )
    
    def __repr__(self):
        return f'<UserStock {self.user.username} - {self.stock.ticker}: {self.quantity}>'
    
    @property
    def current_value(self):
        """Calculate current value of the stock holding"""
        if self.stock.last_price:
            return self.quantity * self.stock.last_price
        return 0
    
    @property
    def profit_loss(self):
        """Calculate profit/loss for this holding"""
        if self.stock.last_price:
            return (self.stock.last_price - self.average_buy_price) * self.quantity
        return 0
    
    @property
    def profit_loss_percentage(self):
        """Calculate profit/loss percentage"""
        if self.average_buy_price == 0:
            return 0
        if self.stock.last_price:
            return ((self.stock.last_price - self.average_buy_price) / self.average_buy_price) * 100
        return 0


class Transaction(db.Model):
    """Model for stock buy/sell transactions"""
    __tablename__ = 'transactions'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    stock_id = db.Column(db.Integer, db.ForeignKey('stocks.id'), nullable=False)
    transaction_type = db.Column(db.String(4), nullable=False)  # 'buy' or 'sell'
    quantity = db.Column(db.Float, nullable=False)
    price = db.Column(db.Float, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    user = db.relationship('User')
    stock = db.relationship('Stock')
    
    def __repr__(self):
        return f'<Transaction {self.transaction_type} {self.stock.ticker}: {self.quantity} @ {self.price}>'
    
    @property
    def total_value(self):
        """Calculate total value of the transaction"""
        return self.quantity * self.price