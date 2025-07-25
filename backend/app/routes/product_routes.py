from flask import Flask, jsonify, request, Blueprint
from app.models.product import Product
from app.models import db
from app.models.category import Category
from flask_jwt_extended import jwt_required
from app.utils.auth_helpers import role_required
from app.routes.category_routes import category_bp
from flasgger.utils import swag_from

product_bp = Blueprint('product', __name__)

# @product_bp.route('/')
# def products():
#     return "https://player.vimeo.com/video/871463199?h=bf967a15de" 

@product_bp.route('/', methods=['GET'])
@jwt_required()
@role_required('admin', 'customer')
@swag_from({
    'tags': ['Product'],
    'description': 'List all products',
    'security': [{'Bearer': []}],
    'parameters': [
        {  'name': 'category',
            'in': 'query',
            'required': False,
            'type': 'string',
            'description': 'Filter products by category name'
        }
    ],
    'responses': {
        200: {
            'description': 'List of products',
            'examples': {
                'application/json': [
                    {"id": 1, "name": "Product 1", "price": 10.0, "stock": 100, "views": 50, "category": "Electronics"},
                    {"id": 2, "name": "Product 2", "price": 20.0, "stock": 200, "views": 150, "category": "Books"}
                ]
            }
        }
    },
    401: {
        'description': 'Unauthorized'
    }
})
def list_products():
    # products = Product.query.all()
    # return jsonify([{
    #     "id": prod.id, 
    #     "name": prod.name,
    #     "description": prod.description,
    #     "price": prod.price,
    #     "image_url": prod.image_url,
    #     "category": prod.category.name
    # } for prod in products]), 200
    category_name = request.args.get('category')
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    query = Product.query

    if category_name:
        query = query.join(Product.category).filter(Category.name.ilike(f'%{category_name}%'))

    pagination = query.paginate(page=page, per_page=per_page, error_out=False)

    products = [{
        "id": prod.id,
        "name": prod.name,
        "description": prod.description,
        "price": prod.price,
        "image_url": prod.image_url,
        "category": prod.category.name if prod.category else None
    } for prod in pagination.items]

    return jsonify({
        "products": products,
        "total": pagination.total,
        "pages": pagination.pages,
        "current_page": pagination.page,
        "per_page": pagination.per_page
    }), 200



@product_bp.route('/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
@role_required('admin')
@swag_from({
    'tags': ['Product'],
    'description': 'Manage a specific product by ID',
    'security': [{'Bearer': []}],
    'parameters': [
        {         'name': 'id',
            'in': 'path',
            'required': True,
            'type': 'integer',
            'description': 'Product ID'
        },
        {
            'name': 'product',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': { 
                    'name': {'type': 'string'},
                    'description': {'type': 'string'},
                    'price': {'type': 'number'},
                    'image_url': {'type': 'string'},
                    'category_id': {'type': 'integer'}
                },
                'required': ['name', 'price']
            }
        }
],
    'responses': {
        200: {
            'description': 'Product details',
            'examples': {
                'application/json': {"id": 1, "name": "Product 1", "description": "A great product", "price": 10.0, "image_url": "http://example.com/image.jpg", "category": "Electronics"}
            }
        },
        404: {
            'description': 'Product not found'
        }
    }
})
def manage_product(id):
    product = Product.query.get_or_404(id)

    if request.method == 'GET':
        return jsonify({
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "price": product.price,
            "image_url": product.image_url,
            "category": product.category.name
        }), 200

    elif request.method == 'PUT':
        data = request.get_json()
        product.name = data.get('name', product.name)
        product.description = data.get('description', product.description)
        product.price = data.get('price', product.price)
        product.image_url = data.get('image_url', product.image_url)
        product.category_id = data.get('category_id', product.category_id)
        db.session.commit()
        return jsonify({
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "price": product.price,
            "image_url": product.image_url,
            "category": product.category.name
        }), 200

    elif request.method == 'DELETE':
        db.session.delete(product)
        db.session.commit()
        return jsonify({"message": "Product deleted successfully"}), 204
    

@product_bp.route('/', methods=['POST'])
@jwt_required()
@role_required('admin')
@swag_from({
    'tags': ['Product'],
    'description': 'Create a new product',
    'security': [{'Bearer': []}],
    'parameters': [
        {            'name': 'product',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'name': {'type': 'string'},
                    'description': {'type': 'string'},
                    'price': {'type': 'number'},
                    'image_url': {'type': 'string'},
                    'category_id': {'type': 'integer'}
                },
                'required': ['name', 'price']
            }
        }
    ],
    'responses': {
        201: {
            'description': 'Product created successfully',
            'examples': {
                'application/json': {"id": 1, "name": "New Product", "description": "A new product", "price": 15.0, "image_url": "http://example.com/new_image.jpg", "category": "Electronics"}
            }
        },
        400: {'description': 'Bad Request'}
    }
})
def create_product():
    data = request.get_json()
    if not data or 'name' not in data or 'price' not in data:
        return jsonify({"msg": "Name and price are required"}), 400
    
    category = Category.query.get(data.get('category_id'))
    if not category:
        return jsonify({"msg": "Category not found"}), 404
    
    new_product = Product(
        name=data['name'],
        description=data.get('description', ''),
        price=data['price'],
        image_url=data.get('image_url', ''),
        category_id=data.get('category_id')
    )
    
    db.session.add(new_product)
    db.session.commit()
    
    return jsonify({
        "id": new_product.id,
        "name": new_product.name,
        "description": new_product.description,
        "price": new_product.price,
        "image_url": new_product.image_url,
        "category": new_product.category.name
    }), 201