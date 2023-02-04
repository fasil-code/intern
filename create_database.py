from flask import Flask,jsonify,render_template,request

app = Flask(__name__)
from flask_mysqldb import MySQL
 
app = Flask(__name__)
 
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Zargar@123'
app.config['MYSQL_DB'] = 'ftd'
 
mysql = MySQL(app)