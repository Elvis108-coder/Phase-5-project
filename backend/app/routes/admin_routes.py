from flask import Blueprint, jsonify
from ..models.product import Product
from ..models.order import Order
from ..extensions import db

admin_bp = Blueprint("admin", __name__)

@admin_bp.route("/analytics", methods=["GET"])
def get_admin_analytics():
    total_products = Product.query.count()
    total_orders = Order.query.count()
    total_sales = db.session.query(db.func.sum(Order.total)).scalar() or 0.0

    return jsonify({
        "total_products": total_products,
        "total_orders": total_orders,
        "total_sales": round(total_sales, 2)
    })
