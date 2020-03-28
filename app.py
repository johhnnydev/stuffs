from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from dotenv import load_dotenv
import os

app = Flask(__name__)
load_dotenv()

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = os.getenv(
    'SQLALCHEMY_TRACK_MODIFICATIONS')

db = SQLAlchemy(app)

migrate = Migrate(app, db)

ma = Marshmallow(app)

# MODELS


class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    category_description = db.Column(db.String, nullable=False)

    def __init__(self, category_description):
        self.category_description = category_description

# SCHEMA SETUP


class CategorySchema(ma.Schema):
    class Meta:
        fields = ('id', 'category_description')


category_schema = CategorySchema()
categories_schema = CategorySchema(many=True)


@app.route('/')
def hello_world():
    return render_template('index.html')


@app.route('/category', methods=['POST'])
def add_category():
    if request.json:
        print(request.json['category_description'])
        new_category = Category(request.json['category_description'])
        db.session.add(new_category)
        db.session.commit()
        return category_schema.jsonify(new_category)
    else:
        return "ewwww"


@app.route('/category/<id>', methods=['DELETE'])
def delete_category(id):
    category = Category.query.get(id)
    db.session.delete(category)
    db.session.commit()
    return category_schema.jsonify(category)


@app.route('/category', methods=['GET'])
def get_all_category():
    categories = Category.query.all()
    return categories_schema.jsonify(categories)
