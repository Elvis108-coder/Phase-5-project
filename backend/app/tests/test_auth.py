
import pytest
from app import create_app, db
from app.models.user import User
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash

@pytest.fixture
def app():
    app = create_app("testing")
    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture
def test_user(app):
    user = User(
        username="testuser",
        email="test@example.com",
        password_hash=generate_password_hash("testpass"),
        role="customer"
    )
    db.session.add(user)
    db.session.commit()
    return user

def test_register_user_success(client):
    response = client.post('/auth/register', json={
        "username": "newuser",
        "email": "new@example.com",
        "password": "newpass"
    })
    assert response.status_code == 201
    assert b'User registered successfully' in response.data

def test_register_existing_email(client, test_user):
    response = client.post('/auth/register', json={
        "username": "duplicate",
        "email": "test@example.com",
        "password": "somepass"
    })
    assert response.status_code == 400
    assert b'Email already exists' in response.data

def test_register_missing_fields(client):
    response = client.post('/auth/register', json={
        "username": "incomplete"
        # Missing email and password
    })
    assert response.status_code == 400

def test_login_success(client, test_user):
    response = client.post('/auth/login', json={
        "email": "test@example.com",
        "password": "testpass"
    })
    assert response.status_code == 200
    assert b'access_token' in response.data

def test_login_invalid_password(client, test_user):
    response = client.post('/auth/login', json={
        "email": "test@example.com",
        "password": "wrongpass"
    })
    assert response.status_code == 401
    assert b'Invalid email or password' in response.data

def test_login_nonexistent_user(client):
    response = client.post('/auth/login', json={
        "email": "ghost@example.com",
        "password": "doesntmatter"
    })
    assert response.status_code == 401

def test_disabled_user_login(client, app, test_user):
    with app.app_context():
        test_user.role = "disabled"
        db.session.commit()

    response = client.post('/auth/login', json={
        "email": "test@example.com",
        "password": "testpass"
    })
    assert response.status_code == 403
    assert b'User account is disabled' in response.data

def test_profile_access_success(client, app, test_user):
    with app.app_context():
        token = create_access_token(identity=test_user.id)

    response = client.get('/auth/profile', headers={
        "Authorization": f"Bearer {token}"
    })
    assert response.status_code == 200
    assert b'test@example.com' in response.data

def test_profile_access_unauthorized(client):
    response = client.get('/auth/profile')  # No token
    assert response.status_code == 401

