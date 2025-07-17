from flask import Blueprint, request, jsonify, send_file
from app.models import db, Product, Order, OrderItem, Customer
from sqlalchemy import func, and_
import csv, io
from datetime import datetime

analytics_bp = Blueprint('analytics', __name__, url_prefix='/analytics')

@analytics_bp.route('/products')
def product_analytics():
    top_sellers = db.session.query(
        Product.name,
        func.sum(OrderItem.quantity).label('total_sold')
    ).join(OrderItem).group_by(Product.id).order_by(func.sum(OrderItem.quantity).desc()).limit(5).all()

    most_viewed = Product.query.order_by(Product.views.desc()).limit(5).all()

    return jsonify({
        'top_sellers': [{'name': p[0], 'total_sold': p[1]} for p in top_sellers],
        'most_viewed': [{'name': p.name, 'views': p.views} for p in most_viewed]
    })

@analytics_bp.route('/orders')
def order_analytics():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    category = request.args.get('category')
    customer_id = request.args.get('customer_id')

    query = db.session.query(Order)

    if start_date:
        query = query.filter(Order.created_at >= datetime.strptime(start_date, '%Y-%m-%d'))
    if end_date:
        query = query.filter(Order.created_at <= datetime.strptime(end_date, '%Y-%m-%d'))
    if customer_id:
        query = query.filter(Order.customer_id == int(customer_id))

    if category:
        query = query.join(OrderItem).join(Product).filter(Product.category == category)

    orders = query.all()
    total_orders = len(orders)

    total_revenue = sum(
        sum(item.quantity * item.price for item in order.items)
        for order in orders
    )

    orders_per_day = db.session.query(
        func.strftime('%Y-%m-%d', Order.created_at).label('day'),
        func.count(Order.id)
    ).group_by('day').all()

    return jsonify({
        'total_orders': total_orders,
        'total_revenue': total_revenue,
        'orders_per_day': [{'day': o[0], 'count': o[1]} for o in orders_per_day]
    })

@analytics_bp.route('/export/products')
def export_products():
    products = Product.query.all()
    si = io.StringIO()
    cw = csv.writer(si)
    cw.writerow(['ID', 'Name', 'Price', 'Category', 'Views'])
    for p in products:
        cw.writerow([p.id, p.name, p.price, p.category, p.views])
    output = io.BytesIO()
    output.write(si.getvalue().encode('utf-8'))
    output.seek(0)
    return send_file(output, mimetype='text/csv', as_attachment=True, download_name='products.csv')

@analytics_bp.route('/export/orders')
def export_orders():
    orders = Order.query.all()
    si = io.StringIO()
    cw = csv.writer(si)
    cw.writerow(['Order ID', 'Customer', 'Date', 'Total Items', 'Total Price'])
    for o in orders:
        total_items = sum(i.quantity for i in o.items)
        total_price = sum(i.quantity * i.price for i in o.items)
        cw.writerow([o.id, o.customer.name, o.created_at, total_items, total_price])
    output = io.BytesIO()
    output.write(si.getvalue().encode('utf-8'))
    output.seek(0)
    return send_file(output, mimetype='text/csv', as_attachment=True, download_name='orders.csv')

@analytics_bp.route('/fulfill/<int:order_id>')
def fulfill_order(order_id):
    order = Order.query.get(order_id)
    if not order:
        return jsonify({'error': 'Order not found'}), 404
    order.status = 'Fulfilled'
    db.session.commit()
    return jsonify({'message': f'Order {order.id} marked as fulfilled'})
