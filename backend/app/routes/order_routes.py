from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from app import db
from app.models.order import OrderItem
from app.utils.auth_helpers import role_required
from flasgger.utils import swag_from

order_item_bp = Blueprint('order_item', __name__)

# def admin_required():
#     claims = get_jwt()
#     if claims.get("role") != "admin":
#         return jsonify({"msg": "Admins only!"}), 403
#     return None

# Get all order items - Admin only
@order_item_bp.route('/', methods=['GET'])
@jwt_required()
@role_required('admin')
@swag_from({
    'tags': ['Order Item'],
    'description': 'List all order items',
    'security': [{'Bearer': []}],
    'parameters': [],
    'responses': {
        200: {
            'description': 'List of order items',
            'examples': {
                'application/json': [
                    {"id": 1, "order_id": 1, "product_id": 1, "quantity": 2, "price": 20.0}
                ]
            }
        }
    },
    401: {
        'description': 'Unauthorized'
    }
})
def get_order_items():
    # Edit to use role_required decorator
    # admin_check = role_required("admin")
    # if admin_check:
    #     return admin_check

    items = OrderItem.query.all()
    return jsonify([item.to_dict() for item in items]), 200

# Get an order item by ID - user can access only if owns the order or admin
@order_item_bp.route('/<int:id>', methods=['GET'])
@jwt_required()
@role_required('admin')
@swag_from({
    'tags': ['Order Item'],
    'description': 'Get a specific order item by ID',
    'security': [{'Bearer': []}],
    'parameters': [
        {
            'name': 'id',
            'in': 'path',
            'required': True,
            'type': 'integer',
            'description': 'ID of the order item to retrieve'
        }
    ],
    'responses': {
        200: {
            'description': 'Order item details',
            'examples': {
                'application/json': {"id": 1, "order_id": 1, "product_id": 1, "quantity": 2, "price": 20.0}
            }
        },
        404: {
            'description': 'Order item not found'
        }
    }
})
def get_order_item(id):
    item = OrderItem.query.get_or_404(id)
    # current_user_id = get_jwt_identity()
    # claims = get_jwt()

    # if item.order.user_id != current_user_id and claims.get("role") != "admin":
    #     return jsonify({"msg": "Access denied"}), 403

    return jsonify(item.to_dict()), 200

# Create order item - Admin only (usually order items created automatically during order creation)
@order_item_bp.route('/', methods=['POST'])
@jwt_required()
@role_required('admin')
@swag_from({
    'tags': ['Order Item'],
    'description': 'Create a new order item',
    'security': [{'Bearer': []}],
    'parameters': [
        {
            'name': 'order_item',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'order_id': {'type': 'integer'},
                    'product_id': {'type': 'integer'},
                    'quantity': {'type': 'integer'},
                    'price_at_purchase': {'type': 'number'}
                },
                'required': ['order_id', 'product_id', 'quantity', 'price']
            }
        }
    ],
    'responses': {
        201: {
            'description': 'Order item created successfully',
            'examples': {
                'application/json': {"id": 1, "order_id": 1, "product_id": 1, "quantity": 2, "price": 20.0}
            }
        },
        400: {
            'description': 'Bad request'
        }
    }
})
def create_order_item():
    # admin_check = admin_required()
    # if admin_check:
    #     return admin_check

    data = request.get_json()
    item = OrderItem(**data)
    db.session.add(item)
    db.session.commit()
    return jsonify(item.to_dict()), 201

# Update an order item - Admin only
@order_item_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
@role_required('admin')
@swag_from({
    'tags': ['Order Item'],
    'description': 'Update an existing order item by ID',
    'security': [{'Bearer': []}],
    'parameters': [
        {
            'name': 'id',
            'in': 'path',
            'required': True,
            'type': 'integer',
            'description': 'ID of the order item to update'
        },
        {
            'name': 'order_item',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'order_id': {'type': 'integer'},
                    'product_id': {'type': 'integer'},
                    'quantity': {'type': 'integer'},
                    'price_at_purchase': {'type': 'number'}
                },
                'required': ['order_id', 'product_id', 'quantity', 'price_at_purchase']
            }
        }
    ],
    'responses': {
        200: {
            'description': 'Order item updated successfully',
            'examples': {
                'application/json': {"id": 1, "order_id": 1, "product_id": 1, "quantity": 2, "price": 20.0}
            }
        },
        404: {
            'description': 'Order item not found'
        }
    }
})
def update_order_item(id):
    # admin_check = admin_required()
    # if admin_check:
    #     return admin_check

    item = OrderItem.query.get_or_404(id)
    data = request.get_json()
    for key, value in data.items():
        setattr(item, key, value)
    db.session.commit()
    return jsonify(item.to_dict()), 200

# Delete an order item - Admin only
@order_item_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
@role_required('admin')
@swag_from({
    'tags': ['Order Item'],
    'description': 'Delete an order item by ID',
    'security': [{'Bearer': []}],
    'parameters': [
        {
            'name': 'id',
            'in': 'path',
            'required': True,
            'type': 'integer',
            'description': 'ID of the order item to delete'
        }
    ],
    'responses': {
        204: {'description': 'Order item deleted successfully'},
        404: {'description': 'Order item not found'}
    }
})
def delete_order_item(id):
    # admin_check = admin_required()
    # if admin_check:
    #     return admin_check

    item = OrderItem.query.get_or_404(id)
    db.session.delete(item)
    db.session.commit()
    return '', 204
