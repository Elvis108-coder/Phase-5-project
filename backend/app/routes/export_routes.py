from flask import Blueprint, request
from app.models import Product, Order
from app.utils.export_csv import generate_csv_response
from app.models import db
from flask_jwt_extended import jwt_required
from app.utils.auth_helpers import role_required
from flasgger.utils import swag_from

export_bp = Blueprint('export_bp', __name__, url_prefix='/export')

@export_bp.route('/products')
@jwt_required()
@role_required('admin')
@swag_from({
    'tags': ['Export'],
    'description': 'Export product data to CSV',
    'security': [{'Bearer': []}],
    'parameters': [],
    'responses': {
        200: {
            'description': 'CSV file containing product data',
            'content': {
                'text/csv': {
                    'schema': {
                        'type': 'string',
                        'format': 'binary'
                    }
                }
            }
        },
        403: {'description': 'Forbidden'}
    }
})
def export_products():
    products = Product.query.all()
    data = [{
        "id": p.id,
        "name": p.name,
        "price": p.price,
        "stock": p.stock,
        "views": p.views
    } for p in products]

    fieldnames = ["id", "name", "price", "stock", "views"]
    return generate_csv_response(data, fieldnames, "products")

@export_bp.route('/orders')
@jwt_required()
@role_required('admin')
@swag_from({
    'tags': ['Export'],
    'description': 'Export order data to CSV',
    'security': [{'Bearer': []}],
    'parameters': [],
    'responses': {
        200: {
            'description': 'CSV file containing order data',
            'content': {
                'text/csv': {
                    'schema': {
                        'type': 'string',
                        'format': 'binary'
                    }
                }
            }
        },
        403: {'description': 'Forbidden'}
    }
})
def export_orders():
    orders = Order.query.all()
    data = [{
        "id": o.id,
        "user_id": o.user_id,
        "status": o.status,
        "total_amount": o.total_amount,
        "created_at": o.created_at.isoformat()
    } for o in orders]

    fieldnames = ["id", "user_id", "status", "total_amount", "created_at"]
    return generate_csv_response(data, fieldnames, "orders")
