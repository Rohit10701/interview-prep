from datetime import datetime, timedelta
from flask import current_app, request
from app import db
from src.auth.model import User, LoginAttempt

class AuthController:
    @staticmethod
    def register_user(email, username, password):
        """
        Register a new user
        
        Args:
            email (str): User's email
            username (str): User's username
            password (str): User's password
            
        Returns:
            tuple: (success_bool, message_or_user_object)
        """
        # Check if email already exists
        if User.query.filter_by(email=email).first():
            return False, "Email already registered"
            
        # Check if username already exists
        if User.query.filter_by(username=username).first():
            return False, "Username already taken"
            
        # Create new user
        try:
            user = User(email=email, username=username)
            user.password = password  # This will hash it via the setter
            db.session.add(user)
            db.session.commit()
            return True, user
        except Exception as e:
            db.session.rollback()
            current_app.logger.error(f"Error registering user: {str(e)}")
            return False, "Registration failed. Please try again."
    
    @staticmethod
    def validate_login(email, password, ip_address):
        """
        Validate user login credentials and track login attempts
        
        Args:
            email (str): User's email
            password (str): User's password
            ip_address (str): IP address of request
            
        Returns:
            tuple: (success_bool, message_or_user_object)
        """
        # Check if too many login attempts
        if AuthController.is_login_rate_limited(email, ip_address):
            return False, "Too many login attempts. Please try again later."
        
        # Find user
        user = User.query.filter_by(email=email).first()
        
        # Record login attempt
        login_attempt = LoginAttempt(
            ip_address=ip_address,
            email=email,
            successful=False  # Default to False, update if successful
        )
        db.session.add(login_attempt)
        
        # Validate credentials
        if not user or not user.verify_password(password):
            db.session.commit()  # Save the failed attempt
            return False, "Invalid email or password"
        
        # Update login attempt to successful
        login_attempt.successful = True
        
        # Update user's last login time
        user.update_last_login()
        
        db.session.commit()
        return True, user
    
    @staticmethod
    def is_login_rate_limited(email, ip_address):
        """
        Check if login is rate limited based on recent attempts
        
        Args:
            email (str): User's email
            ip_address (str): IP address of request
            
        Returns:
            bool: True if rate limited, False otherwise
        """
        # Check attempts in the last 15 minutes
        fifteen_mins_ago = datetime.utcnow() - timedelta(minutes=15)
        
        # Count attempts from this IP
        ip_attempts = LoginAttempt.query.filter(
            LoginAttempt.ip_address == ip_address,
            LoginAttempt.timestamp >= fifteen_mins_ago
        ).count()
        
        # Count attempts for this email
        email_attempts = LoginAttempt.query.filter(
            LoginAttempt.email == email,
            LoginAttempt.timestamp >= fifteen_mins_ago
        ).count()
        
        # Rate limit if either exceeds threshold
        # 5 attempts per 15 minutes for same IP or email
        return ip_attempts >= 5 or email_attempts >= 5