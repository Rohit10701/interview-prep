from flask import Blueprint, render_template, redirect, url_for, flash, request, current_app
from flask_login import login_user, logout_user, login_required, current_user
from app import limiter
from src.auth.controller import AuthController
from src.auth.model import User
from utils.rate_limiter import get_request_ip
import functools

# Create blueprint
auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route('/login', methods=['GET', 'POST'])
@limiter.limit("10 per minute")  # Global rate limit
def login():
    """Login route"""
    # Redirect if already logged in
    if current_user.is_authenticated:
        return redirect(url_for('user.dashboard'))
    
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        remember = request.form.get('remember', False) == 'on'
        
        # Validate form data
        if not email or not password:
            flash('Email and password are required', 'danger')
            return render_template('auth/login.html')
        
        # Get client IP for rate limiting
        ip_address = get_request_ip()
        
        # Attempt login
        success, result = AuthController.validate_login(email, password, ip_address)
        
        if success:
            # Log user in
            login_user(result, remember=remember)
            current_app.logger.info(f"User {result.id} logged in successfully")
            
            # Redirect to requested page or dashboard
            next_page = request.args.get('next')
            if next_page and next_page.startswith('/'):
                return redirect(next_page)
            return redirect(url_for('user.dashboard'))
        else:
            # Show error message
            flash(result, 'danger')
            current_app.logger.warning(f"Failed login attempt for {email} from {ip_address}")
    
    return render_template('auth/login.html')

@auth_bp.route('/signup', methods=['GET', 'POST'])
@limiter.limit("5 per hour")  # Limit signup attempts
def signup():
    """Signup route"""
    # Redirect if already logged in
    if current_user.is_authenticated:
        return redirect(url_for('user.dashboard'))
    
    if request.method == 'POST':
        email = request.form.get('email')
        username = request.form.get('username')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')
        
        # Validate form data
        if not all([email, username, password, confirm_password]):
            flash('All fields are required', 'danger')
            return render_template('auth/signup.html')
        
        if password != confirm_password:
            flash('Passwords do not match', 'danger')
            return render_template('auth/signup.html')
        
        # Register user
        success, result = AuthController.register_user(email, username, password)
        
        if success:
            # Log user in
            login_user(result)
            flash('Registration successful! Welcome to Robinhood Clone.', 'success')
            current_app.logger.info(f"New user {result.id} registered successfully")
            return redirect(url_for('user.dashboard'))
        else:
            # Show error message
            flash(result, 'danger')
    
    return render_template('auth/signup.html')

@auth_bp.route('/logout')
@login_required
def logout():
    """Logout route"""
    logout_user()
    flash('You have been logged out.', 'info')
    return redirect(url_for('auth.login'))

# Create a decorator for handling authentication failures
def auth_error_handler(f):
    @functools.wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except Exception as e:
            current_app.logger.error(f"Auth error: {str(e)}")
            flash("Authentication error. Please try again.", "danger")
            return redirect(url_for('auth.login'))
    return decorated_function

# Apply the decorator to the blueprint
auth_bp.before_request(auth_error_handler)