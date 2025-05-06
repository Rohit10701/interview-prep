from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from app import db, login_manager
import uuid

class User(UserMixin, db.Model):
    """User model for authentication and profile"""
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(db.String(36), unique=True, default=lambda: str(uuid.uuid4()))
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    username = db.Column(db.String(64), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(128))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime, nullable=True)
    is_active = db.Column(db.Boolean, default=True)
    
    # Relationships
    stocks = db.relationship('UserStock', back_populates='user', lazy='dynamic')
    watchlist = db.relationship('WatchlistItem', back_populates='user', lazy='dynamic')
    
    @property
    def password(self):
        """Password getter (raises error)"""
        raise AttributeError('password is not a readable attribute')
    
    @password.setter
    def password(self, password):
        """Password setter (stores hash)"""
        self.password_hash = generate_password_hash(password)
    
    def verify_password(self, password):
        """Verify password against stored hash"""
        return check_password_hash(self.password_hash, password)
    
    def update_last_login(self):
        """Update last login timestamp"""
        self.last_login = datetime.utcnow()
        db.session.commit()
    
    def __repr__(self):
        return f'<User {self.username}>'


class LoginAttempt(db.Model):
    """Model to track login attempts for rate limiting"""
    __tablename__ = 'login_attempts'
    
    id = db.Column(db.Integer, primary_key=True)
    ip_address = db.Column(db.String(45), nullable=False, index=True)  # IPv6 can be up to 45 chars
    email = db.Column(db.String(120), nullable=False, index=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    successful = db.Column(db.Boolean, default=False)
    
    def __repr__(self):
        return f'<LoginAttempt {self.email} from {self.ip_address}>'


@login_manager.user_loader
def load_user(user_id):
    """Flask-Login user loader function"""
    return User.query.get(int(user_id))