import os
from datetime import timedelta

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    """Base config class"""
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'hard-to-guess-string'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=30)
    WTF_CSRF_ENABLED = True
    
    @staticmethod
    def init_app(app):
        pass

class DevelopmentConfig(Config):
    """Development config"""
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, '../dev.sqlite')

class TestingConfig(Config):
    """Testing config"""
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('TEST_DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, '../test.sqlite')
    WTF_CSRF_ENABLED = False

class ProductionConfig(Config):
    """Production config"""
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, '../prod.sqlite')
    
    @classmethod
    def init_app(cls, app):
        Config.init_app(app)
        
        # Production specific setup
        import logging
        from logging.handlers import RotatingFileHandler
        
        # Create logs directory if it doesn't exist
        if not os.path.exists('logs'):
            os.mkdir('logs')
            
        # Set up file handler
        file_handler = RotatingFileHandler('logs/robinhood_clone.log', 
                                          maxBytes=10240, backupCount=10)
        file_handler.setFormatter(logging.Formatter(
            '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
        file_handler.setLevel(logging.INFO)
        
        # Add handler to app logger
        app.logger.addHandler(file_handler)
        app.logger.setLevel(logging.INFO)
        app.logger.info('Robinhood Clone startup')

# Config dictionary for app initialization
config_dict = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}