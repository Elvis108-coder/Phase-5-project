from flask import Blueprint, jsonify, request
from sqlalchemy import func, desc
from ..models.product import Product
from ..models.order import Order
from ..models.order_item import OrderItem
from ..extensions import db

admin_bp = Blueprint("admin", __name__)

@admin_bp.route("/analytics", methods=["GET"])
def get_admin_analytics():
    # Optional: Date filters from query params
    start_date = request.args.get("start_date")
    end_date = request.args.get("end_date")

    query = db.session.query(Order)
    if start_date:
        query = query.filter(Order.created_at >= start_date)
    if end_date:
        query = query.filter(Order.created_at <= end_date)

    filtered_orders = query.all()
    order_ids = [order.id for order in filtered_orders]

    # Totals
    total_products = Product.query.count()
    total_orders = len(filtered_orders)
    total_sales = sum(order.total for order in filtered_orders)

    # Product popularity (top 5 by quantity sold)
    popularity = (
        db.session.query(
            Product.name,
            func.sum(OrderItem.quantity).label("total_quantity_sold")
        )
        .join(OrderItem.product)
        .filter(OrderItem.order_id.in_(order_ids))
        .group_by(Product.name)
        .order_by(desc("total_quantity_sold"))
        .limit(5)
        .all()
    )

    popular_products = [
        {"product_name": name, "quantity_sold": qty}
        for name, qty in popularity
    ]

    return jsonify({
        "total_products": total_products,
        "total_orders": total_orders,
        "total_sales": round(total_sales, 2),
        "top_selling_products": popular_products
    })

@admin_bp.route('/analytics/orders', methods=['GET'])
def get_all_orders():
    orders = Order.query.all()
    result = []
    for order in orders:
        items = []
        for item in order.order_items:
            items.append({
                "product_name": item.product.name,
                "quantity": item.quantity
            })
        result.append({
            "order_id": order.id,
            "total": order.total,
            "created_at": order.created_at.strftime('%Y-%m-%d'),
            "items": items
        })
    return jsonify(result), 200
