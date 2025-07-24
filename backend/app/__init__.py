from flask import Flask

from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
# Imports the config class dictionary (config_by_name) from config.py to load environment-specific configs.
from app.config import config_by_name
from flasgger import Swagger

# Initialize extensions
# These create instances of Flask extensions without tying them to the app yet.
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
cors = CORS()

swagger = Swagger()

# Defines a function that takes in a configuration name ("development", "testing", etc.).
# This function creates and configures the Flask app based on the provided configuration.
def create_app(config_name = "development"):
    # Creates a new Flask application instance.
    app = Flask(__name__)
    # Loads the configuration settings based on the config_name argument.
    # This line makes .env variables like DATABASE_URL, JWT_SECRET_KEY, etc., available to the app.
    app.config.from_object(config_by_name[config_name])

    app.config['SWAGGER'] = {
    'title': 'Beauty Shop API',
    'uiversion': 3,
    'securityDefinitions': {
        'Bearer': {
            'type': 'apiKey',
            'name': 'Authorization',
            'in': 'header',
            'description': "JWT Authorization header using the Bearer scheme. Example: 'Authorization: Bearer {token}'"
        }
    }
}

    
    # Initializes the Flask extensions with the app instance.
    # Initializes the SQLAlchemy database connection with the Flask app.
    db.init_app(app)
    # Initializes the Flask-Migrate extension for database migrations.
    migrate.init_app(app, db)
    # Initializes the Flask-JWT-Extended extension for JWT authentication. Hence on can use JWT in their routes
    jwt.init_app(app)
    # Initializes Flask-CORS to handle Cross-Origin Resource Sharing, allowing the app to accept requests from different origins.
    cors.init_app(app)

    # Initializes Flasgger for API documentation.
    swagger.init_app(app)
    
    from app.routes import (auth_routes,
                             user_routes, 
                             analytics_routes,
                               export_routes, 
                               cart_routes, 
                               order_routes, 
                               invoice_routes, 
                               category_routes, 
                               product_routes
                               )
    from app import models
       

    # Register blueprints
    app.register_blueprint(auth_routes.auth_bp, url_prefix='/auth')
    app.register_blueprint(user_routes.bp, url_prefix='/users')
    app.register_blueprint(analytics_routes.analytics_bp, url_prefix='/analytics')
    app.register_blueprint(export_routes.export_bp, url_prefix='/export')
    app.register_blueprint(cart_routes.cart_bp, url_prefix='/cart')
    app.register_blueprint(order_routes.order_item_bp, url_prefix='/order-items')
    app.register_blueprint(invoice_routes.invoice_bp, url_prefix='/invoices')
    app.register_blueprint(category_routes.category_bp, url_prefix='/categories')
    app.register_blueprint(product_routes.product_bp, url_prefix='/products')
    app.register_blueprint(order_routes.order_bp, url_prefix='/orders')

    return app

