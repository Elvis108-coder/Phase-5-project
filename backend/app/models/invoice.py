
# app/models/invoice.py

from app import db
from datetime import datetime


class Invoice(db.Model):
    __tablename__ = 'invoices'

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    total = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

   

    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False, unique=True)
    invoice_url = db.Column(db.String, nullable=False)
    generated_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Invoice id={self.id} order_id={self.order_id}>"
    
    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "total": self.total,
            "created_at": self.created_at.isoformat(),
            "order_id": self.order_id,
            "invoice_url": self.invoice_url,
            "generated_at": self.generated_at.isoformat()
        }

