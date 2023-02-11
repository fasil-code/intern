#imports
from flask import Flask,jsonify,render_template,request,session
from flask import Flask,render_template,url_for,flash,redirect
from forms import RegistrationForm,LoginForm,ResetRequestForm,ResetPassword
app = Flask(__name__)
import random
import geonamescache
import os
import bcrypt
import math
import random
from functools import wraps
import smtplib
from flask_session import Session
from flask_mysqldb import MySQL
app = Flask(__name__)
mysql = MySQL(app)
import mysql.connector
from terms import terms
gc=geonamescache.GeonamesCache()
countries = gc.get_countries()
from flask import render_template
from user import register_route,login_route,logout_route,reset_password_route,set_password_route

app = Flask(__name__)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'

app.config['MYSQL_PASSWORD'] = 'alchemist'
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

def create_database():
    conn = mysql.connector.connect(
        host=app.config['MYSQL_HOST'],
        user=app.config['MYSQL_USER'],
        password=app.config['MYSQL_PASSWORD']
    )

    cursor = conn.cursor()
    
    cursor.execute("CREATE DATABASE IF NOT EXISTS ftd")
    cursor.execute("USE ftd")
    cursor.execute(
        "CREATE TABLE IF NOT EXISTS user (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(80) NOT NULL , email VARCHAR(120) NOT NULL UNIQUE, password VARCHAR(160) NOT NULL)"
    )
  
    cursor.close()
    conn.close()

# Call this function once in your application code to create the database and table.
create_database()

app.config['MYSQL_DB'] = 'ftd'
app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
mysql = MySQL(app)




   
    




# for emotion data


@app.route("/register", methods=['GET', 'POST'])
def register():
    return register_route()

def before_request():
    if not session.get('logged_in') and request.endpoint in ['index', 'secret']:
        return redirect(url_for('login'))

@app.route("/login",methods=['GET','POST'])
def login():
    return login_route()
         

@app.route('/reset_password',methods=['GET','POST'])
def reset_password():
    return reset_password_route()
   
    


@app.route('/set_password',methods=['GET','POST'])
def set_password():
    return set_password_route()
     

@app.route('/logout')
def logout():
    
    # Remove the logged_in key from the session
    return logout_route()
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    return response
        
@app.route("/send_score", methods=["POST"])
def send_score():
    score= request.form.get("score")
    column= request.form.get("column")
    
    
    
   # #   Connect to the database
   #  conn = mysql.connect
   #  cursor = conn.cursor()
   
   # #  Insert the score into the database
   #  cursor.execute(f"INSERT INTO scores ({column}) VALUES (%s)", (score,))
   #  conn.commit()

   #  # Close the connection
   #  cursor.close()
   #  conn.close()

    return "Score received: " + score + " for " + column     
        
 #1  Home     
@app.route("/home", methods=['GET','POST'])
@app.route("/", methods=['GET','POST'])
def home():
   if 'logged_in' in session:
        return render_template('navbar.html', logged_in=True)
  
   return render_template('navbar.html', logged_in=False)


#Test Page 
@app.route("/tests",methods=['GET','POST'])
def tests():
   if 'logged_in' in session:
        email = session.get('logged_in')
        return render_template('home.html',terms=terms,email=email)   
   return redirect('login')





#dashboard
@app.route("/dashboard",methods=['GET','POST'])
def dashboard():
   return render_template('dashboard.html')


@app.route("/api-key")
def get_api_key():
    api_key = os.environ.get("API_KEY")
    return api_key


#1 Emoji Game
@app.route("/emoji",methods=['GET','POST'])
def emoji():
   return render_template('Emoji/emoji.html')



 

 #3 Emoji Recogonisation Test (ert)
@app.route("/emojrecog",methods=['GET','POST'])
def emojrecog():
   return render_template('EmojRecog/EmojRecog.html')


#4 Ace
@app.route("/layout",methods=['GET','POST'])
def layout():
   name = request.args.get('name')
   
   return render_template('layout.html',url=name)
#5 Ace2)

@app.route("/ace1",methods=['GET','POST'])
def ace1():
   days=["Choose the day today","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
   seasons=["Choose the Season",'Spring','Summer','Autumn','Winter']
   states=['Choose the State','Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal','Jammu and Kashmir','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal']

   
  # print countries dictionary
   list=[]

   for i in countries:
      list.append(countries[i]['name'])

   list.sort()
   list.insert(0,"Choose your country")
   return render_template('ACE/attention/attention1.html',days=days,seasons=seasons,list=list,states=states)

    
@app.route("/ace2",methods=['GET','POST'])
def ace2():
   return render_template('ACE/attention/attention2.html') 
@app.route("/ace3",methods=['GET','POST']) 
def ace3():
   return render_template('ACE/attention/attention3.html',url="ace4") 
@app.route("/ace4",methods=['GET','POST']) 
def ace4():
   return render_template('ACE/attention/attention4.html',url="ace5")  
@app.route("/ace5",methods=['GET','POST']) 
def ace5():
   return render_template('ACE/memory/memory1.html',url="layout")    

@app.route("/ace6",methods=['GET','POST']) 
def ace6():
   return render_template('ACE/language/language2.html',url="ace7") 
@app.route("/ace7",methods=['GET','POST']) 
def ace7():
   return render_template('ACE/language/language3.html',url="layout") 
@app.route("/ace8",methods=['GET','POST']) 
def ace8():
   return render_template('ACE/language/language4.html',url="ace6") 
@app.route("/ace9",methods=['GET','POST']) 
def ace9():
   return render_template('ACE/memory/memory2.html',url="ace11") 
@app.route("/ace10",methods=['GET','POST']) 
def ace10():
   return render_template('ACE/memory/memory3.html',url="layout") 
@app.route("/ace11",methods=['GET','POST']) 
def ace11():
   return render_template('ACE/memory/memory4.html',url="ace10") 
@app.route("/ace12",methods=['GET','POST']) 
def ace12():
   return render_template('ACE/fluency/fluency2.html',url="layout")
@app.route("/ace13",methods=['GET','POST'])  
def ace13():
   return render_template('ACE/fluency/fluency1.html',url="ace12") 
@app.route("/lang",methods=['GET','POST'])
def language1():

   return render_template('ACE/language/language1.html',url="ace8")
# visuo-spatial  tests
@app.route("/vs1",methods=['GET','POST'])
def vs1():

   return render_template('ACE/visuospatial/vs1.html',url="vs2")

@app.route("/vs2",methods=['GET','POST'])
def vs2():

   return render_template('ACE/visuospatial/vs2.html',url="/")

#5 Pulse Tracking Test (PTT)
@app.route("/ptt",methods=['GET','POST'])
def ptt():
   return render_template('PTT/ptt.html')

#6 Trail Making Test (TMT I & II)
@app.route("/tmt",methods=['GET','POST'])
def tmt():
    return render_template('TMT/TMT.html')
@app.route("/tmt-2",methods=['GET','POST'])
def tmt2():
    return render_template('TMT/TMT2.html')
if __name__ == "__main__":
    app.run(debug = True)
    