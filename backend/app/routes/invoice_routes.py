from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from app import db
from app.models.invoice import Invoice
from app.utils.auth_helpers import role_required
from flasgger.utils import swag_from

invoice_bp = Blueprint('invoice', __name__, url_prefix='/invoices')

# Helper to check admin role
# def admin_required():
#     claims = get_jwt()
#     if claims.get("role") != "admin":
#         return jsonify({"msg": "Admins only!"}), 403
#     return None

# GET all invoices - Admin only (usually sensitive)
@invoice_bp.route('/', methods=['GET'])
@jwt_required()
@role_required('admin')
@swag_from({
    'tags': ['Invoice'],
    'description': 'List all invoices',
    'security': [{'Bearer': []}],
    'parameters': [],
    'responses': {
        200: {
            'description': 'List of invoices',
            'examples': {
                'application/json': [
                    {"id": 1, "user_id": 1, "total": 100.0, "order_id": 1, "invoice_url": "http://example.com/invoice/1", "generated_at": "2023-10-01T12:00:00Z"}
                ]
            }
        }
    },
    401: {
        'description': 'Unauthorized'
    }
})
def get_invoices():
    # admin_check = admin_required()
    # if admin_check:
    #     return admin_check
    invoices = Invoice.query.all()
    return jsonify([invoice.to_dict() for invoice in invoices]), 200

# GET a single invoice by ID - User can only access their own invoice or admin
@invoice_bp.route('/<int:id>', methods=['GET'])
@jwt_required()
@role_required('admin', 'customer')
@swag_from({
    'tags': ['Invoice'],
    'description': 'Get a specific invoice by ID',
    'security': [{'Bearer': []}],
    'parameters': [
        {
            'name': 'id',
            'in': 'path',
            'required': True,
            'type': 'integer',
            'description': 'ID of the invoice to retrieve'
        }
    ],
    'responses': {
        200: {
            'description': 'Invoice details',
            'examples': {
                'application/json': {"id": 1, "user_id": 1, "total": 100.0, "order_id": 1, "invoice_url": "http://example.com/invoice/1", "generated_at": "2023-10-01T12:00:00Z"}
            }
        },
        404: {
            'description': 'Invoice not found'
        }
    }
})
def get_invoice(id):
    invoice = Invoice.query.get_or_404(id)
    # current_user_id = get_jwt_identity()
    # claims = get_jwt()

    # if invoice.user_id != current_user_id and claims.get("role") != "admin":
    #     return jsonify({"msg": "Access denied"}), 403

    return jsonify(invoice.to_dict()), 200

# CREATE a new invoice - Admin only
# @invoice_bp.route('/', methods=['POST'])
# @jwt_required()
# @role_required('admin')
# def create_invoice():
#     # admin_check = admin_required()
#     # if admin_check:
#     #     return admin_check
#     data = request.get_json()

 
#     invoice = Invoice(**data)
#     db.session.add(invoice)
#     db.session.commit()
#     return jsonify(invoice.to_dict()), 201
from datetime import datetime

@invoice_bp.route('/', methods=['POST'])
@jwt_required()
@role_required('admin')
@swag_from({
    'tags': ['Invoice'],
    'description': 'Create a new invoice',
    'security': [{'Bearer': []}],
    'parameters': [
        {
            'name': 'invoice',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'user_id': {'type': 'integer'},
                    'total': {'type': 'number'},
                    'order_id': {'type': 'integer'},
                    'invoice_url': {'type': 'string'}
                },
                'required': ['user_id', 'total', 'order_id', 'invoice_url']
            }
        }
    ],
    'responses': {
        201: {
            'description': 'Invoice created successfully',
            'examples': {
                'application/json': {"id": 1, "user_id": 1, "total": 100.0, "order_id": 1, "invoice_url": "http://example.com/invoice/1", "generated_at": "2023-10-01T12:00:00Z"}
            }
        },
        400: {
            'description': 'Bad request - Invoice already exists for this order'
        }
    }
})
def create_invoice():
    data = request.get_json()

    # Step 1: Check if an invoice already exists for the given order
    existing_invoice = Invoice.query.filter_by(order_id=data.get('order_id')).first()
    if existing_invoice:
        return jsonify({"msg": "Invoice for this order already exists"}), 400

    # Step 2: Create the new invoice
    invoice = Invoice(
        user_id=data.get('user_id'),
        total=data.get('total'),
        order_id=data.get('order_id'),
        invoice_url=data.get('invoice_url'),
        generated_at=datetime.utcnow()
    )

    # Step 3: Save to database
    db.session.add(invoice)
    db.session.commit()

    return jsonify(invoice.to_dict()), 201


# UPDATE an existing invoice - Admin only
@invoice_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
@role_required('admin')
@swag_from({
    'tags': ['Invoice'],
    'description': 'Update an existing invoice by ID',
    'security': [{'Bearer': []}],
    'parameters': [
        {
            'name': 'id',
            'in': 'path',
            'required': True,
            'type': 'integer',
            'description': 'ID of the invoice to update'
        },
        {
            'name': 'invoice',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'user_id': {'type': 'integer'},
                    'total': {'type': 'number'},
                    'order_id': {'type': 'integer'},
                    'invoice_url': {'type': 'string'}
                },
                'required': ['user_id', 'total', 'order_id']
            }
        }
    ],
    'responses': {
        200: {
            'description': 'Invoice updated successfully',
            'examples': {
                'application/json': {"id": 1, "user_id": 1, "total": 150.0, "order_id": 1, "invoice_url": "http://example.com/invoice/1", "generated_at": "2023-10-01T12:00:00Z"}
            }
        },
        404: {
            'description': 'Invoice not found'
        }
    }
})
def update_invoice(id):
    # admin_check = admin_required()
    # if admin_check:
    #     return admin_check

    invoice = Invoice.query.get_or_404(id)
    data = request.get_json()

    for key, value in data.items():
        setattr(invoice, key, value)

    db.session.commit()
    return jsonify(invoice.to_dict()), 200

# DELETE an invoice - Admin only
@invoice_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
@role_required('admin')
@swag_from({
    'tags': ['Invoice'],
    'description': 'Delete an invoice by ID',
    'security': [{'Bearer': []}],
    'parameters': [
        {
            'name': 'id',
            'in': 'path',
            'required': True,
            'type': 'integer',
            'description': 'ID of the invoice to delete'
        }
    ],
    'responses': {
        204: {'description': 'Invoice deleted successfully'},
        404: {'description': 'Invoice not found'}
    }
})
def delete_invoice(id):
    # admin_check = admin_required()
    # if admin_check:
    #     return admin_check

    invoice = Invoice.query.get_or_404(id)
    db.session.delete(invoice)
    db.session.commit()
    return '', 204
