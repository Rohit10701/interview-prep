from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import os

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager()
limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

def create_app(config_name='default'):
    # Initialize app
    app = Flask(__name__, template_folder='src/templates', static_folder='src/static')
    
    # Configuration
    from config.config import config_dict
    app.config.from_object(config_dict[config_name])
    
    # Initialize extensions with app
    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)
    limiter.init_app(app)
    
    # Set up login view
    login_manager.login_view = 'auth.login'
    login_manager.login_message = 'Please log in to access this page.'
    login_manager.login_message_category = 'info'
    
    # Register blueprints
    from src.auth.routes import auth_bp
    from src.user.routes import user_bp
    from src.stocks.routes import stocks_bp
    from src.watchlist.routes import watchlist_bp
    
    app.register_blueprint(auth_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(stocks_bp)
    app.register_blueprint(watchlist_bp)
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)