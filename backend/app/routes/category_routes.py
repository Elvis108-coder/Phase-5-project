from flask import Flask, jsonify, request, Blueprint
from app.models.category import Category
from flask_jwt_extended import jwt_required
from app.utils.auth_helpers import role_required
from app import db
from flasgger.utils import swag_from

category_bp = Blueprint('category', __name__)

@category_bp.route('/', methods=['GET'])
@jwt_required()
@role_required('admin', 'customer')
@swag_from({
    'tags': ['Category'],
    'description': 'List all categories',
    'security': [{'Bearer': []}],
    'parameters': [],
    'responses': {
        200: {
            'description': 'List of categories',
            'examples': {
                'application/json': [
                    {"id": 1, "name": "Electronics"},
                    {"id": 2, "name": "Books"}
                ]
            }
        }
    },
    401: {
        'description': 'Unauthorized'
    }
})
def list_categories():
    categories = Category.query.all()
    return jsonify([{"id": cat.id, "name": cat.name} for cat in categories]), 200

@category_bp.route('/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
@role_required('admin')
@swag_from({
    'tags': ['Category'],
    'description': 'Manage a specific category by ID',
    'security': [{'Bearer': []}],
    'parameters': [
        {
            'name': 'id',
            'in': 'path',
            'required': True,
            'type': 'integer',
            'description': 'ID of the category to manage'
        }
    ],
    'responses': {
        200: {
            'description': 'Category details',
            'examples': {
                'application/json': {"id": 1, "name": "Electronics"}
            }
        },
        404: {
            'description': 'Category not found'
        }
    }
})
def manage_category(id):
    category = Category.query.get_or_404(id)

    if request.method == 'GET':
        return jsonify({"id": category.id, "name": category.name}), 200

    elif request.method == 'PUT':
        data = request.get_json()
        category.name = data.get('name', category.name)
        db.session.commit()
        return jsonify({"id": category.id, "name": category.name}), 200

    elif request.method == 'DELETE':
        db.session.delete(category)
        db.session.commit()
        return jsonify({"message": f"Category with id {id} deleted successfully"}), 204
    
@category_bp.route('/', methods=['POST'])
@jwt_required()
@role_required('admin')
@swag_from({
    'tags': ['Category'],
    'description': 'Create a new category',
    'security': [{'Bearer': []}],
    'parameters': [
        {
            'name': 'category',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'name': {
                        'type': 'string',
                        'description': 'Name of the category'
                    }
                },
                'example': {
                    'name': 'New Category'
                }
            }
        }
    ],
    'responses': {
        201: {
            'description': 'Category created successfully',
            'examples': {
                'application/json': {"id": 3, "name": "New Category"}
            }
        },
        400: {
            'description': 'Bad request - name is required'
        }
    }
})
def create_category():
    data = request.get_json()
    if not data or 'name' not in data:
        return jsonify({"msg": "Name is required"}), 400
    
    new_category = Category(name=data['name'])
    db.session.add(new_category)
    db.session.commit()
    
    return jsonify({"id": new_category.id, "name": new_category.name}), 201
