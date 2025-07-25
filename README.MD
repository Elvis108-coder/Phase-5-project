 ##  Beauty Products App – Backend (Flask API)
This is the backend API for the Beauty Products Admin Dashboard, built with Flask, SQLAlchemy, and PostgreSQL. It supports features such as product management, order creation, and admin analytics for reporting.

## Team Roles
Team Member	Responsibilities
Natalie	Authentication & User Management
Ray	Product & Category CRUD
Milka	Cart, Orders & Invoice
Elvis	Admin Dashboard Features & Analytics (Backend & Frontend)

## Backend Folder Structure
Phase-5-project/
├── backend/
│   ├── .env
│   ├── .gitignore
│   ├── Dockerfile
│   ├── Pipfile
│   ├── Pipfile.lock
│   ├── requirements.txt
│   ├── run.py
│   ├── gunicorn_config.py
│   ├── migrations/
│   ├── instance/
│   │   └── dev.db
│   ├── .github/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── config.py
│   │   ├── swagger.json
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── cart.py
│   │   │   ├── category.py
│   │   │   ├── invoice.py
│   │   │   ├── order.py
│   │   │   ├── product.py
│   │   │   └── user.py
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── analytics_routes.py
│   │   │   ├── auth_routes.py
│   │   │   ├── cart_routes.py
│   │   │   ├── category_routes.py
│   │   │   ├── export_routes.py
│   │   │   ├── invoice_routes.py
│   │   │   ├── order_routes.py
│   │   │   ├── product_routes.py
│   │   │   └── user_routes.py
│   │   ├── schemas/
│   │   ├── templates/
│   │   ├── tests/
│   │   └── utils/
|──.gitignore
├── README.MD

# Setup Instructions
1. Clone and navigate to the project

git clone  https://github.com/Elvis108-coder/Phase-5-project.git
cd Phase-5-project/backend
2. Install dependencies

pipenv install
pipenv shell
3. Set environment variables (via .env or terminal)

FLASK_ENV=development
DATABASE_URL=postgresql://your_user:your_password@localhost:5432/beauty_db
4. Run database migrations

flask db init       # Run only once
flask db migrate -m "Initial migration"
flask db upgrade
5. Start the Flask server

flask run
# API Endpoints Overview
## Authentication (Natalie)
POST /register

POST /login

GET /me

## Products & Categories (Ray)
GET /products

POST /products

PATCH /products/<id>

DELETE /products/<id>

GET /categories

## Orders, Cart & Invoices (Milka)
POST /orders

GET /orders

GET /invoices/<order_id>

#  Admin Analytics & Dashboard (Elvis)
GET /admin/orders
View all customer orders with details.

GET /analytics?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD
View summarized sales analytics within a date range.

# Testing the API
Use Postman or cURL to interact with endpoints. Add Authorization headers as required.
We used  Swagger UI for interactive API documentation
# Tech Stack
Python (Flask)

PostgreSQL

SQLAlchemy

Flask-Migrate

Flask-CORS

👨‍💻 Developer Note
This backend is part of the final group project at Moringa School (Phase 5). The API will power the admin dashboard and e-commerce frontend.