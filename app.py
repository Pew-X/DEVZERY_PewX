import json
from flask import Flask, request, jsonify
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from models import db, User

app = Flask(__name__)
CORS(app, supports_credentials=True)

app.config['SECRET_KEY'] = 'f14b3778d202841e41f0e34361564795'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flaskdb.db'
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

jwt = JWTManager(app)

SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True

bcrypt = Bcrypt(app)
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/logintoken', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()
    if user is None or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Invalid email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify({
        "email": email,
        "access_token": access_token
    })

@app.route("/signup", methods=["POST"])
def signup():
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "Email already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password, about="SAMPLE ABOUT ME")
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "Registration successful"
    })

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if isinstance(data, dict):
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        return response

@app.route('/register', methods=["POST"])
def register_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user_exists = User.query.filter_by(email=email).first()

    if user_exists:
        return jsonify({"error": "Email already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password, about="sample about me")
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "Registration successful"
    })

@app.route('/profiles', methods=["GET"])
def get_all_profiles():
    profiles = User.query.all()
    profile_list = [{"id": profile.id, "email": profile.email} for profile in profiles]
    return jsonify(profile_list)

@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "Logout successful"})
    unset_jwt_cookies(response)
    return response

@app.route('/profile/<getemail>')
@jwt_required()
def my_profile(getemail):
    if not getemail:
        return jsonify({"error": "Unauthorized Access"}), 401

    user = User.query.filter_by(email=getemail).first()

    response_body = {
        "id": user.id,
        "name": user.name,  # You might need to update this if the User model has a 'name' attribute
        "email": user.email,
        "about": user.about
    }

    return response_body

if __name__ == "__main__":
    app.run(debug=True)
