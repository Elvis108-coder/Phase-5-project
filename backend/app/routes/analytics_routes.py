from flask import Blueprint, jsonify
from app.models import db, Product, Order, OrderItem
from sqlalchemy import func
from flask_jwt_extended import jwt_required
from app.utils.auth_helpers import role_required
from flasgger.utils import swag_from
from datetime import datetime

analytics_bp = Blueprint('analytics', __name__, url_prefix='/analytics')

@analytics_bp.route('/products')
@jwt_required()
@role_required('admin')
@swag_from({
    'tags': ['Analytics'],
    'description': 'Get product analytics including top sellers and most viewed products.',
    'security': [{'Bearer': []}],
    'responses': {
        200: {
            'description': 'Product analytics data',
            'examples': {
                'application/json': {
                    'top_sellers': [{'name': 'Product A', 'total_sold': 100}],
                    'most_viewed': [{'name': 'Product B', 'views': 500}]
                }
            }
        }
    },
    400: {
        'description': 'Bad Request'
    },
    401: {
        'description': 'Unauthorized - Invalid or missing token'
    },
    403: {
        'description': 'Forbidden - Insufficient permissions'
    }
})
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
@jwt_required()
@role_required('admin')
@swag_from({
    'tags': ['Analytics'],
    'description': 'Get order analytics including total orders, total revenue, and orders per day.',
    'security': [{'Bearer': []}],
    'responses': {
        200: {
            'description': 'Order analytics data',
            'examples': {
                'application/json': {
                    'total_orders': 100,
                    'total_revenue': 5000.00,
                    'orders_per_day': [{'day': '2023-10-01', 'count': 10}]
                }
            }
        }
    },
    400: {
        'description': 'Bad Request'
    },
    401: {
        'description': 'Unauthorized - Invalid or missing token'
    },
    403: {
        'description': 'Forbidden - Insufficient permissions'
    }
})
def order_analytics():
    total_orders = db.session.query(func.count(Order.id)).scalar()

    total_revenue = db.session.query(
        func.sum(OrderItem.quantity * OrderItem.price_at_purchase)
    ).scalar()

    orders_per_day = db.session.query(
        func.date(Order.created_at).label('day'),
        func.count(Order.id)
    ).group_by(func.date(Order.created_at)).all()

    return jsonify({
        'total_orders': total_orders,
        'total_revenue': total_revenue,
        'orders_per_day': [{'day': datetime.strptime(o[0], '%Y-%m-%d').isoformat(), 'count': o[1]} for o in orders_per_day]
    })
