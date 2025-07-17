from flask import Flask
from app.extensions import db, migrate
from app.routes.admin_routes import admin_bp  # ✅ Make sure this import is correct

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    migrate.init_app(app, db)

    app.register_blueprint(admin_bp, url_prefix="/")  # ✅ Register it here

    return app

app = create_app()
