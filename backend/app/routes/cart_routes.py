from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from app import db
from app.models.cart import Cart, CartItem
from app.utils.auth_helpers import role_required
from flasgger.utils import swag_from

cart_bp = Blueprint('cart', __name__, url_prefix='/cart')

# Helper to check admin role
# def admin_required():
#     claims = get_jwt()
#     if claims.get("role") != "admin":
#         return jsonify({"msg": "Admins only!"}), 403
#     return None

# -------------------------
# CART ROUTES
# -------------------------

@cart_bp.route('/', methods=['GET'])
@jwt_required()
@role_required('admin')
@swag_from({
    'tags': ['Cart'],
    'description': 'List all carts',
    'security': [{'Bearer': []}],
    'parameters': [],
    'responses': {
        200: {
            'description': 'List all carts',
            'examples': {
                'application/json': [
                    {"id": 1, "user_id": 1, "items": []},
                    {"id": 2, "user_id": 2, "items": []}
                ]
            }
        }
    }
})
def get_carts():
    # Admin only: list all carts
    # admin_check = admin_required()
    # if admin_check:
    #     return admin_check

    carts = Cart.query.all()
    return jsonify([cart.to_dict() for cart in carts])

@cart_bp.route('/<int:id>', methods=['GET'])
@jwt_required()
@role_required('admin', 'customer') 
@swag_from({
    'tags': ['Cart'],
    'description': 'Get a specific cart by ID',
    'security': [{'Bearer': []}],
    'parameters': [
        {
            'name': 'id',
            'in': 'path',
            'required': True,
            'type': 'integer',
            'description': 'ID of the cart to retrieve'
        }
    ],
    'responses': {
        200: {
            'description': 'Cart details',
            'examples': {
                'application/json': {"id": 1, "user_id": 1, "items": []}
            }
        },
        404: {'description': 'Cart not found'}
    }
})
def get_cart(id):
    cart = Cart.query.get_or_404(id)
    current_user_id = get_jwt_identity()
    claims = get_jwt()

    # # Allow if cart belongs to user or user is admin
    if cart.user_id != current_user_id and claims.get("role") != "admin":
        return jsonify({"msg": "Access denied"}), 403

    return jsonify(cart.to_dict())

@cart_bp.route('/', methods=['POST'])
@jwt_required()
@role_required('admin', 'customer')
@swag_from({
    'tags': ['Cart'],
    'description': 'Create a new cart',
    'security': [{'Bearer': []}],
    'parameters': [
        {
            'name': 'cart',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'user_id': {'type': 'integer'},
                    # Add other cart fields as needed
                },
                'required': ['user_id']
            }
        }
    ],
    'responses': {
        201: {
            'description': 'Cart created successfully',
            'examples': {
                'application/json': {"id": 1, "user_id": 1, "items": []}
            }
        },
        400: {'description': 'Invalid input'}
    }
})
def create_cart():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    # Assign cart to logged-in user
    data.pop('user_id', None)  # Remove user_id from data if provided
    cart = Cart(user_id=current_user_id, **data)
    db.session.add(cart)
    db.session.commit()
    return jsonify(cart.to_dict()), 201

@cart_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
@role_required('admin', 'customer')
@swag_from({
    'tags': ['Cart'],
    'description': 'Update a specific cart by ID',
    'security': [{'Bearer': []}],
    'parameters': [
        {
            'name': 'cart',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'user_id': {'type': 'integer'},
                    # Add other cart fields as needed
                }
            }
        }
    ],
    'responses': {
        200: {
            'description': 'Cart updated successfully',
            'examples': {
                'application/json': {"id": 1, "user_id": 1, "items": []}
            }
        },
        404: {'description': 'Cart not found'},
        400: {'description': 'Invalid input'}
    }
})
def update_cart(id):
    cart = Cart.query.get_or_404(id)
    # current_user_id = get_jwt_identity()
    # claims = get_jwt()

    # if cart.user_id != current_user_id and claims.get("role") != "admin":
    #     return jsonify({"msg": "Access denied"}), 403

    data = request.get_json()
    for key, value in data.items():
        setattr(cart, key, value)
    db.session.commit()
    return jsonify(cart.to_dict())

@cart_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
@role_required('admin', 'customer')
@swag_from({
    'tags': ['Cart'],
    'description': 'Delete a specific cart by ID',
    'security': [{'Bearer': []}],
    'parameters': [
        {
            'name': 'id',
            'in': 'path',
            'required': True,
            'type': 'integer',
            'description': 'ID of the cart to delete'
        }
    ],
    'responses': {
        204: {'description': 'Cart deleted successfully'},
        404: {'description': 'Cart not found'}
    }
})
def delete_cart(id):
    cart = Cart.query.get_or_404(id)
    # current_user_id = get_jwt_identity()
    # claims = get_jwt()

    # if cart.user_id != current_user_id and claims.get("role") != "admin":
    #     return jsonify({"msg": "Access denied"}), 403

    db.session.delete(cart)
    db.session.commit()
    return '', 204

# -------------------------
# CART ITEM ROUTES
# -------------------------

@cart_bp.route('/<int:cart_id>/items', methods=['GET'])
@jwt_required()
@role_required('admin', 'customer')
@swag_from({
    'tags': ['Cart'],
    'description': 'List all items in a specific cart',
    'security': [{'Bearer': []}],
    'parameters': [
        {
            'name': 'cart_id',
            'in': 'path',
            'required': True,
            'type': 'integer',
            'description': 'ID of the cart to retrieve items from'
        }
    ],
    'responses': {
        200: {
            'description': 'List of cart items',
            'examples': {
                'application/json': [
                    {"id": 1, "cart_id": 1, "product_id": 1, "quantity": 2},
                    {"id": 2, "cart_id": 1, "product_id": 2, "quantity": 1}
                ]
            }
        },
        404: {'description': 'Cart not found'}
    }
})
def get_cart_items(cart_id):
    cart = Cart.query.get_or_404(cart_id)
    current_user_id = get_jwt_identity()
    claims = get_jwt()

    if cart.user_id != current_user_id and claims.get("role") != "admin":
        return jsonify({"msg": "Access denied"}), 403

    return jsonify([item.to_dict() for item in cart.items])

@cart_bp.route('/<int:cart_id>/items', methods=['POST'])
@jwt_required()
@role_required('admin', 'customer')
@swag_from({
    'tags': ['Cart'],
    'description': 'Add an item to a specific cart',
    'security': [{'Bearer': []}],
    'parameters': [
        {
            'name': 'cart_id',
            'in': 'path',
            'required': True,
            'type': 'integer',
            'description': 'ID of the cart to add an item to'
        },
        {
            'name': 'item',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'product_id': {'type': 'integer'},
                    'quantity': {'type': 'integer', 'default': 1}
                },
                'required': ['product_id']

            }
        }
    ],
    'responses': {
        201: {
            'description': 'Item added to cart successfully',
            'examples': {
                'application/json': {"id": 1, "cart_id": 1, "product_id": 1, "quantity": 2}
            }
        },
        404: {'description': 'Cart not found'},
        400: {'description': 'Invalid input'}
    }
})
def add_cart_item(cart_id):
    cart = Cart.query.get_or_404(cart_id)
    current_user_id = get_jwt_identity()
    claims = get_jwt()

    if cart.user_id != current_user_id and claims.get("role") != "admin":
        return jsonify({"msg": "Access denied"}), 403

    data = request.get_json()
    item = CartItem(cart_id=cart.id, **data)
    db.session.add(item)
    db.session.commit()
    return jsonify(item.to_dict()), 201

@cart_bp.route('/items/<int:item_id>', methods=['PUT'])
@jwt_required()
@role_required('admin', 'customer')
@swag_from({
    'tags': ['Cart'],
    'description': 'Update a specific cart item by ID',
    'security': [{'Bearer': []}],
    'parameters': [
        {
            'name': 'item_id',
            'in': 'path',
            'required': True,
            'type': 'integer',
            'description': 'ID of the cart item to update'
        },
        {
            'name': 'item',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'quantity': {'type': 'integer'}
                }
            }
        }
    ],
    'responses': {
        200: {
            'description': 'Item updated successfully',
            'examples': {
                'application/json': {"id": 1, "cart_id": 1, "product_id": 1, "quantity": 3}
            }
        },
        404: {'description': 'Item not found'},
        400: {'description': 'Invalid input'}
    }
})
def update_cart_item(item_id):
    item = CartItem.query.get_or_404(item_id)
    cart = item.cart
    current_user_id = get_jwt_identity()
    claims = get_jwt()

    if cart.user_id != current_user_id and claims.get("role") != "admin":
        return jsonify({"msg": "Access denied"}), 403

    data = request.get_json()
    for key, value in data.items():
        setattr(item, key, value)
    db.session.commit()
    return jsonify(item.to_dict())

@cart_bp.route('/items/<int:item_id>', methods=['DELETE'])
@jwt_required()
@role_required('admin', 'customer')
@swag_from({
    'tags': ['Cart'],
    'description': 'Delete a specific cart item by ID',
    'security': [{'Bearer': []}],
    'parameters': [
        {
            'name': 'item_id',
            'in': 'path',
            'required': True,
            'type': 'integer',
            'description': 'ID of the cart item to delete'
        }
    ],
    'responses': {
        204: {'description': 'Item deleted successfully'},
        404: {'description': 'Item not found'}
    }
})
def delete_cart_item(item_id):
    item = CartItem.query.get_or_404(item_id)
    cart = item.cart
    current_user_id = get_jwt_identity()
    claims = get_jwt()

    if cart.user_id != current_user_id and claims.get("role") != "admin":
        return jsonify({"msg": "Access denied"}), 403

    db.session.delete(item)
    db.session.commit()
    return '', 204
