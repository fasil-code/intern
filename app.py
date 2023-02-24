from flask import Flask,jsonify,abort, make_response,render_template,request,session
from flask import Flask,render_template,url_for,flash,redirect
import geonamescache
import os
import uuid
import datetime

from report import generate_route_pdf
from flask_session import Session
from flask_mysqldb import MySQL
app = Flask(__name__)
mysql = MySQL(app)

from terms import terms
gc=geonamescache.GeonamesCache()
countries = gc.get_countries()
import pymysql
from flask import render_template
from user import register_route,login_route,logout_route,reset_password_route,set_password_route
import json
import pickle

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'

# app.config['MYSQL_PASSWORD'] = '7006022139'
app.config['MYSQL_PASSWORD'] = 'Zargar@123'
# app.config['MYSQL_PASSWORD'] = '#1Openupsesame'
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

def create_database():
   conn = pymysql.connect(
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
   cursor.execute(
      '''CREATE TABLE IF NOT EXISTS emotion (
      id INT AUTO_INCREMENT PRIMARY KEY, 
      email VARCHAR(255) NOT NULL,
      Date VARCHAR(255),
      emoji_game INT DEFAULT 0,
      time_emoji_game VARCHAR(255),
      ert INT DEFAULT 0,
      time_ert VARCHAR(255),
      session_id VARCHAR(255)     
      )'''
   )
   cursor.execute(
      '''CREATE TABLE IF NOT EXISTS ace (
         id INT AUTO_INCREMENT PRIMARY KEY, 
         email VARCHAR(255) NOT NULL,
         Date VARCHAR(255),
         attention1 INT DEFAULT 0,
         attention2 INT DEFAULT 0,
         attention3 INT DEFAULT 0,
         fluency1 INT DEFAULT 0,
         fluency2 INT DEFAULT 0,
         memory1 INT DEFAULT 0,
         memory2 INT DEFAULT 0,
         memory3 INT DEFAULT 0,
         memory4 INT DEFAULT 0,
         language1 INT DEFAULT 0,
         language2 INT DEFAULT 0,
         language3 INT DEFAULT 0,
         language4 INT DEFAULT 0,
         language5 INT DEFAULT 0,
         visuospatial1 INT DEFAULT 0,
         visuospatial2 INT DEFAULT 0,
         session_id VARCHAR(255)
         
      )'''    
   )
      
   cursor.execute(
      '''CREATE TABLE IF NOT EXISTS ptt (
         id INT AUTO_INCREMENT PRIMARY KEY,
         email VARCHAR(255) NOT NULL,
         Date VARCHAR(255),
         ptt_score INT DEFAULT 0,
         
         WrongClicks INT DEFAULT 0,
         CorrectClicks INT DEFAULT 0,
         
         
         session_id VARCHAR(255)
      )'''
   ) 
   cursor.execute(
      '''CREATE TABLE IF NOT EXISTS tmt (
         id INT AUTO_INCREMENT PRIMARY KEY,
         email VARCHAR(255) NOT NULL,
         Date VARCHAR(255),
         tmt_score1 INT DEFAULT 0,
         tmt_score2 INT DEFAULT 0,
         session_id VARCHAR(255)
      )'''
      
      
      
   ) 
   cursor.close()
   conn.close()

# Call this function once in your application code to create the database and table.
create_database()

app.config['MYSQL_DB'] = 'ftd'
app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
mysql = MySQL(app)
mysql = MySQL(app)



   
    




# for emotion data
mysql = MySQL(app)

@app.route("/register", methods=['GET', 'POST'])
def register():
    return register_route()
def before_request():
    if not session.get('logged_in') and request.endpoint in ['index', 'secret']:
        return redirect(url_for('login'))


@app.route("/login",methods=['GET','POST'])
def login():
    return login_route()
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    return response      


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
#session_id


  
@app.route("/send_score", methods=["POST"])
def send_score():

   
   email=session.get('logged_in')
   column= request.form.get("column")
   wrong_clicks=request.form.get('wrong_clicks')
   correct_clicks=request.form.get('correct_clicks')
   
      
   score= request.form.get("score")
   tmt1=request.form.get('tmt1')
   tmt2=request.form.get('tmt2')
   
   time=request.form.get('time')

   
   

   

   
   

   conn   = mysql.connect
   cursor = conn.cursor()

   # cursor.execute(f"SELECT * FROM emotion WHERE session_id = %s AND email = %s", (sesion_key, email))
   # result_emoji = cursor.fetchone()

   # cursor.execute(f"SELECT * FROM ace WHERE session_id = %s AND email = %s", (sesion_key, email))
   # result_ace = cursor.fetchone()

   # cursor.execute(f"SELECT * FROM ptt WHERE session_id = %s AND email = %s", (sesion_key, email))
   # result_ptt = cursor.fetchone()

   # cursor.execute(f"SELECT * FROM tmt WHERE session_id = %s AND email = %s", (sesion_key, email))
   # result_tmt = cursor.fetchone()

   aceColumn = ['attention1','attention2','attention3','fluency1','fluency2','memory1','memory2',
               'memory3','memory4','language1','language2','language3','language4','language5','visuospatial1','visuospatial2']
   if column in aceColumn:
        
      # Update the existing row
         cursor.execute(f"UPDATE ace SET {column}= %s WHERE session_id = %s AND email = %s", (score, sesion_key, email))
         conn.commit()


   if column=="emoji":
      
         # Update the existing row
         cursor.execute(f"UPDATE emotion SET emoji_game = %s, time_emoji_game = %s WHERE session_id = %s AND email = %s", (score, time, sesion_key, email))
         conn.commit()
   if column=="ert":
         cursor.execute(f"UPDATE emotion SET ert = %s, time_ert = %s WHERE session_id = %s AND email = %s", (score, time, sesion_key, email))
         conn.commit()

   
   if column=="ptt":

       cursor.execute(f"UPDATE ptt SET ptt_score = %s,  WrongClicks= %s,CorrectClicks=%s WHERE session_id = %s AND email = %s", (score, wrong_clicks,correct_clicks, sesion_key, email))
       conn.commit()
   
   if column=="tmt":
        if tmt1:
           
          cursor.execute(f"UPDATE tmt SET tmt_score1 = %s WHERE session_id = %s AND email = %s", (tmt1, sesion_key, email))
          conn.commit()
        if tmt2:
           cursor.execute(f"UPDATE tmt SET tmt_score2 = %s WHERE session_id = %s AND email = %s", (tmt2, sesion_key, email))
           conn.commit() 
   cursor.close()
   conn.close()

   return "Score received: " + score + " for " + column   
        
   
@app.route("/home", methods=['GET','POST'])
@app.route("/", methods=['GET','POST'])
def home():
   if 'logged_in' in session:
         name=session.get('name')
         # Generate a new session ID
         return render_template('navbar.html',name=name,  logged_in=True)         
   return render_template('navbar.html', logged_in=False)


#Test Page 

@app.route("/tests",methods=['GET','POST'])
def tests():
   if 'logged_in' in session:
        
        
        global sesion_key
        session_id = request.args.get('session_id')
        sesion_key=session_id
        email = session.get('logged_in')
        date= datetime.datetime.now().date()
        conn = mysql.connect
        cursor = conn.cursor()
        # Attempt for emoji game and ert test
        cursor.execute(f"SELECT * FROM emotion WHERE session_id = %s AND email = %s", (session_id, email))
        result_emotion = cursor.fetchone()
         # Attempt for ace test
        cursor.execute(f"SELECT * FROM ace WHERE session_id = %s AND email = %s", (session_id, email))
        result_ace = cursor.fetchone()
        #Attempt for ptt test
        cursor.execute(f"SELECT * FROM ptt WHERE session_id = %s AND email = %s", (session_id, email))
        result_ptt = cursor.fetchone()
        #Atempt for tmt test
        cursor.execute(f"SELECT * FROM tmt WHERE session_id = %s AND email = %s", (session_id, email))
        result_tmt = cursor.fetchone()
        #emoji
        if(not result_emotion):
            cursor.execute(f"INSERT INTO emotion (email, Date, session_id) VALUES (%s, %s, %s)", (email, date, session_id)) 
            conn.commit()
         #ace   
        if(not result_ace):
            cursor.execute(f"INSERT INTO ace (email, Date, session_id) VALUES (%s, %s, %s)", (email, date, session_id)) 
            conn.commit()
         #ptt
        if(not result_ptt):
            cursor.execute(f"INSERT INTO ptt (email, Date, session_id) VALUES (%s, %s, %s)", (email, date, session_id)) 
            conn.commit() 
          #tmt  
        if(not result_tmt):
            cursor.execute(f"INSERT INTO tmt (email, Date, session_id) VALUES (%s, %s, %s)", (email, date, session_id)) 
            conn.commit()
         
        cursor.close()
        conn.close()    
    
                
        return render_template('home.html',terms=terms,email=email,session_id=session_id)   
   return redirect('login')


@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    return response
#dashboard
@app.route("/dashboard",methods=['GET','POST'])
def dashboard():
   if 'logged_in' in session:
      conn = mysql.connect
      cursor = conn.cursor()
      email = email = session.get('logged_in') 
      
      # Replace with the actual email value you want to search for
      # emotion
      query = "SELECT * FROM emotion WHERE email = %s"
      cursor.execute(query, (email,))
      results_emoji = cursor.fetchall()
      
      # ACE
      query = "SELECT * FROM ace WHERE email = %s"
      cursor.execute(query, (email,))
      results_ace = cursor.fetchall()
      
      # PTT
      query = "SELECT * FROM ptt WHERE email = %s"
      cursor.execute(query, (email,))
      results_ptt = cursor.fetchall()

      # TMT
      query = "SELECT * FROM tmt WHERE email = %s"
      cursor.execute(query, (email,))
      results_tmt = cursor.fetchall()

      size=len(results_ace)
      results=results_emoji+results_ace+results_ptt+results_tmt
       
      
      return render_template('dashboard.html',results=results,size=size)
   return redirect('login')


@app.route("/api-key")
def get_api_key():
   api_key = os.environ.get("API_KEY")
   return api_key



@app.route("/generate_pdf", methods=['GET', 'POST'])
def generate_pdf():
   return generate_route_pdf()

@app.route("/termsconditions",methods=['GET','POST'])
def termsconditions():
     if 'logged_in' in session:
        
        email = session.get('logged_in')
        global sesion_key
        session_id = request.args.get('session_id')
        sesion_key=session_id
        return render_template('terms.html',terms=terms,email=email,session_id=session_id)   
     return redirect('login')

@app.route("/attempt", methods=['GET', 'POST'])
def attempt():
   if 'logged_in' in session:
           # Generate a new session ID
            session_id = str(uuid.uuid4())
            session['session_id'] = session_id
            return render_template('attempt.html', session_id=session_id, logged_in=True)
   return redirect('login') 

#1 Emoji Game
@app.route("/emoji",methods=['GET','POST'])
def emoji():
   session_id = request.args.get('session_id')
   return render_template('Emoji/emoji.html',session_id=session_id)

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
   seasons=["Choose the Season",'Spring','Summer','Autumn','Winter','Monsoon']
   states=['Choose the State','Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal','Jammu and Kashmir','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal']
   # print countries dictionary
   list=[]
   for i in countries:
      list.append(countries[i]['name'])
   list.sort()
   list.insert(0,"Choose your country")
   return render_template('ACE/attention/attention1.html',days=days,seasons=seasons,list=list,states=states,url="ace3")
  
@app.route("/ace2",methods=['GET','POST'])
def ace2():
   return render_template('ACE/attention/attention2.html')

@app.route("/ace3",methods=['GET','POST']) 
def ace3():
   return render_template('ACE/attention/attention3.html',url="ace4",home="/home") 
@app.route("/ace4",methods=['GET','POST']) 
def ace4():
   return render_template('ACE/attention/attention4.html',url="layout")  
@app.route("/ace5",methods=['GET','POST']) 
def ace5():
   return render_template('ACE/memory/memory1.html',url="ace9")    

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

   return render_template('ACE/language/language1.html',url="lang2")
@app.route("/lang2",methods=['GET','POST'])
def language5():

   return render_template('ACE/language/language5.html',url="ace8")   

# visuo-spatial  tests
@app.route("/vs1",methods=['GET','POST'])
def vs1():

   return render_template('ACE/visuospatial/vs1.html',url="vs2")

@app.route("/vs2",methods=['GET','POST'])
def vs2():

   return render_template('ACE/visuospatial/vs2.html',url="/ace_res")
# aceresults route
@app.route("/ace_res",methods=['GET','POST'])
def ace_results():
        email = session.get('logged_in')
        conn = mysql.connect
        cursor = conn.cursor()
        cursor.execute(f"SELECT * FROM ace WHERE session_id = %s AND email = %s", (sesion_key, email))
        result_ace = cursor.fetchone()
        leng=len(result_ace)
        
        cursor.close()
        conn.close() 
        url='/tests?session_id='+sesion_key
        return render_template('ACE/ace_results.html',result_ace=result_ace,url=url)
#5 Pulse Tracking Test (PTT)
@app.route("/ptt",methods=['GET','POST'])
def ptt():
   url = '/tests?session_id='+sesion_key
   return render_template('PTT/ptt.html', url=url)

#6 Trail Making Test (TMT I & II)
@app.route("/tmt",methods=['GET','POST'])
def tmt():
   url = '/tests?session_id='+sesion_key
   return render_template('TMT/TMT.html', url=url)
@app.route("/tmt-2",methods=['GET','POST'])
def tmt2():
    return render_template('TMT/TMT2.html')
if __name__ == "__main__":
    app.run(debug = True)
