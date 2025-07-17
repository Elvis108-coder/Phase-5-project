from flask import Blueprint, request, jsonify
from ..models.product import Product
from ..models.order import Order
from ..extensions import db
from sqlalchemy import func
from datetime import datetime

admin_bp = Blueprint("admin", __name__)

@admin_bp.route("/analytics", methods=["GET"])
def get_admin_analytics():
    # Optional start and end date query parameters
    start_date = request.args.get("start_date")
    end_date = request.args.get("end_date")

    query = Order.query

    if start_date:
        start = datetime.strptime(start_date, "%Y-%m-%d")
        query = query.filter(Order.created_at >= start)

    if end_date:
        end = datetime.strptime(end_date, "%Y-%m-%d")
        query = query.filter(Order.created_at <= end)

    total_products = Product.query.count()
    total_orders = query.count()
    total_sales = query.with_entities(func.sum(Order.total)).scalar() or 0.0

    return jsonify({
        "total_products": total_products,
        "total_orders": total_orders,
        "total_sales": round(total_sales, 2)
    })
