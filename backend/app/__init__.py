from flask import Flask
from .extensions import db, migrate, cors
from .routes.admin_routes import admin_bp

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app)

    app.register_blueprint(admin_bp, url_prefix="/admin")

    return app
