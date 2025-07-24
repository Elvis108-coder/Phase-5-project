from .. import db

class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False, unique=True)

    products = db.relationship('Product', back_populates='category', lazy=True)

    def __repr__(self):
        return f'<Category {self.name}>'
