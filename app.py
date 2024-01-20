import json
from flask import Flask, request, jsonify
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager #pip install Flask-JWT-Extended = https://pypi.org/project/Flask-JWT-Extended/
from flask_bcrypt import Bcrypt #pip install Flask-Bcrypt = https://pypi.org/project/Flask-Bcrypt/
from flask_cors import CORS #ModuleNotFoundError: No module named 'flask_cors' = pip install Flask-Cors
 
from models import db, User
 
api = Flask(__name__)
CORS(api, supports_credentials=True)
 
api.config['SECRET_KEY'] = 'cairocoders-ednalan'
api.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flaskdb.db'
# Databse configuration  Mysql                            Username:password@hostname/databasename
#app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:''@localhost/flaskreact'
 
api.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(api)
 
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True
 
bcrypt = Bcrypt(api)    
db.init_app(api)
  
with api.app_context():
    db.create_all()
 
@api.route("/")
def hello_world():
    return "<p>Hello, World!</p>"
 
@api.route('/logintoken', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
  
    user = User.query.filter_by(email=email).first()
    #if email != "test" or password != "test":
    #    return {"msg": "Wrong email or password"}, 401
    if user is None:
        return jsonify({"error": "Wrong email or passwords"}), 401
      
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
      
    access_token = create_access_token(identity=email)
    #response = {"access_token":access_token}
  
    return jsonify({
        "email": email,
        "access_token": access_token
    })
    #return response
 
@api.route("/signup", methods=["POST"])
def signup():
    email = request.json["email"]
    password = request.json["password"]
   
    user_exists = User.query.filter_by(email=email).first() is not None
   
    if user_exists:
        return jsonify({"error": "Email already exists"}), 409
       
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(name="cairocoders Ednalan", email=email, password=hashed_password, about="sample about me")
    db.session.add(new_user)
    db.session.commit()
   
    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })
 
@api.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response
 
@api.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response
 
@api.route('/profile/<getemail>')
@jwt_required() 
def my_profile(getemail):
    print(getemail)
    if not getemail:
        return jsonify({"error": "Unauthorized Access"}), 401
       
    user = User.query.filter_by(email=getemail).first()
  
    response_body = {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "about" : user.about
    }
  
    return response_body