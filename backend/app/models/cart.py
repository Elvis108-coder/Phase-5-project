
# app/models/cart.py

from app import db
from datetime import datetime

# -----------------------------------
# 🛒 Cart
# -----------------------------------

class Cart(db.Model):
    __tablename__ = 'carts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # One cart → many items
    items = db.relationship('CartItem', backref='cart', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Cart id={self.id} user_id={self.user_id}>"
    
    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "created_at": self.created_at.isoformat(),
            "items": [item.to_dict() for item in self.items]
        }

# -----------------------------------
# 
# -----------------------------------
class CartItem(db.Model):
    __tablename__ = 'cart_items'

    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey('carts.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)

    def __repr__(self):
        return f"<CartItem cart_id={self.cart_id} product_id={self.product_id}>"

    def to_dict(self):
        return {
            "id": self.id,
            "cart_id": self.cart_id,
            "product_id": self.product_id,
            "quantity": self.quantity
        }

