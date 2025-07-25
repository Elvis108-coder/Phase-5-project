
# app/models/order.py

from app import db
from datetime import datetime

# -----------------------------------
# 📦 Order
# -----------------------------------

class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    total_amount = db.Column(db.Numeric(10, 2), nullable=False)
    status = db.Column(db.String(50), default='pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # One order → many order items
    order_items = db.relationship('OrderItem', backref='order', lazy=True, cascade="all, delete-orphan")
    invoice = db.relationship('Invoice', uselist=False, backref='order')

    def __repr__(self):
        return f"<Order id={self.id} user_id={self.user_id} total={self.total_amount}>"
    
    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "total_amount": str(self.total_amount),
            "status": self.status,
            "created_at": self.created_at.isoformat(),
            "order_items": [item.to_dict() for item in self.order_items],
            "invoice": self.invoice.to_dict() if self.invoice else None
        }

# -----------------------------------
# 🧾 OrderItem
# -----------------------------------

class OrderItem(db.Model):
    __tablename__ = 'order_items'

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)

    quantity = db.Column(db.Integer, nullable=False)
    price_at_purchase = db.Column(db.Numeric(10, 2), nullable=False)

    def __repr__(self):
        return f"<OrderItem order_id={self.order_id} product_id={self.product_id}>"
    
    def to_dict(self):
        return {
            "id": self.id,
            "order_id": self.order_id,
            "product_id": self.product_id,
            "quantity": self.quantity,
            "price_at_purchase": str(self.price_at_purchase)
        }

