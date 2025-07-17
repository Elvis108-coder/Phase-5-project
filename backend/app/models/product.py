from ..extensions import db

class Product(db.Model):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, default=0)

    # Add relationship to link OrderItems
    order_items = db.relationship("OrderItem", back_populates="product", cascade="all, delete-orphan")
