

from flask import Flask,jsonify, make_response,render_template,request,session
from flask import Flask,render_template,url_for,flash,redirect
app = Flask(__name__)
import random
import geonamescache
import os
import bcrypt
import math
import random
import uuid
import datetime
from reportlab.lib.enums import TA_CENTER,TA_RIGHT,TA_LEFT
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from io import BytesIO
from io import BytesIO
from reportlab.lib.pagesizes import letter, landscape
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Table, TableStyle
from reportlab.lib import colors
from flask import make_response
from flask import make_response
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


# app.config['MYSQL_PASSWORD'] = 'Zargar@123'
app.config['MYSQL_PASSWORD'] = '#1Openupsesame'

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
    cursor.execute(
     '''CREATE TABLE IF NOT EXISTS emotion (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    email VARCHAR(255) NOT NULL,
     Date VARCHAR(255),
    emoji_game INT,
    time_emoji_game VARCHAR(255),
    ert INT,
    time_ert VARCHAR(255),
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


@app.route("/register", methods=['GET', 'POST'])
def register():
    return register_route()

def before_request():
    if not session.get('logged_in') and request.endpoint in ['index', 'secret']:
        return redirect(url_for('login'))

@app.route("/login",methods=['GET','POST'])
def login():
    return login_route()
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
    email = session.get('logged_in')
    
    
    date= datetime.datetime.now().date()

    score= request.form.get("score")
    column= request.form.get("column")
    time=request.form.get('time')
    
    conn = mysql.connect
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM emotion WHERE session_id = %s AND email = %s", (sesion_key, email))
    result = cursor.fetchone()
    if column=="emoji":
      
      if not result:
        # Insert a new row
       
        cursor.execute(f"INSERT INTO emotion (email,Date, emoji_game, time_emoji_game,session_id) VALUES (%s,%s, %s, %s,%s)", (email,date, score, time,sesion_key))
        conn.commit()
      else:
         # Update the existing row
        cursor.execute(f"UPDATE emotion SET emoji_game = %s, time_emoji_game = %s WHERE session_id = %s AND email = %s", (score, time, sesion_key, email))
        conn.commit()
    elif column=="ert":
         if not result:
        
        # Insert a new row
          cursor.execute(f"INSERT INTO emotion (email,Date, ert, time_ert,session_id) VALUES (%s,%s, %s, %s,%s)", (email,date, score, time,sesion_key))
          conn.commit()
         else:
         # Update the existing row
           cursor.execute(f"UPDATE emotion SET ert = %s, time_ert = %s WHERE session_id = %s AND email = %s", (score, time, sesion_key, email))
           conn.commit()
   
    
    
 
    cursor.close()
    conn.close()

    return "Score received: " + score + " for " + column   
        
 #1  Home     
@app.route("/home", methods=['GET','POST'])
@app.route("/", methods=['GET','POST'])
def home():
   if 'logged_in' in session:
           # Generate a new session ID
            session_id = str(uuid.uuid4())
            session['session_id'] = session_id
            return render_template('navbar.html', session_id=session_id, logged_in=True)
            
   return render_template('navbar.html', logged_in=False)


#Test Page  
sesion_key="abcd"
@app.route("/tests",methods=['GET','POST'])
def tests():
   if 'logged_in' in session:
        
        email = session.get('logged_in')
        global sesion_key
        session_id = request.args.get('session_id')
        sesion_key=session_id
        return render_template('home.html',terms=terms,email=email,session_id=session_id)   
   return redirect('login')

#dashboard
@app.route("/dashboard",methods=['GET','POST'])
def dashboard():
   if 'logged_in' in session:
      conn = mysql.connect
      cursor = conn.cursor()
      email = email = session.get('logged_in') # Replace with the actual email value you want to search for
      query = "SELECT * FROM emotion WHERE email = %s"
      cursor.execute(query, (email,))
      results = cursor.fetchall()
      
      return render_template('dashboard.html',results=results)
   return redirect('login')

@app.route("/api-key")
def get_api_key():
    api_key = os.environ.get("API_KEY")
    return api_key



@app.route("/generate_pdf", methods=['GET', 'POST'])
def generate_pdf():
    if 'logged_in' in session:
        result = request.form.get("res")
        id = request.args.get('id')
        conn = mysql.connect
        cursor = conn.cursor()
       
        
        
        email = session.get('logged_in')
            # Replace with the actual email value you want to search for
        query = "SELECT * FROM emotion WHERE id=%s AND email=%s"
        cursor.execute(query, (id, email))
        results = cursor.fetchone()
        
        
        
        
        
        response = make_response()
        response.headers['Content-Type'] = 'application/pdf'
        response.headers['Content-Disposition'] = 'attachment; filename=output.pdf'
        buffer = BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=landscape(letter))
        
        # Add decorated heading to PDF
        styles = {
            'heading': ParagraphStyle(
                'heading',
                fontName='Helvetica-Bold',
                fontSize=25,
                textColor=colors.red,
                spaceAfter=0.25*inch,
                alignment=TA_CENTER,
                leftIndent=0.25*inch,
                border=1,
                borderColor=colors.blue,
                borderPadding=0.1*inch,
                
            ),
             'heading1': ParagraphStyle(
                'heading',
                fontName='Helvetica-Bold',
                fontSize=20,
                textColor=colors.red,
                spaceAfter=0.25*inch,
                
                leftIndent=0*inch,
                border=1,
                borderColor=colors.blue,
                borderPadding=0.1*inch,
                
            )
        }
        elements = []
        elements.append(Paragraph('Frontotemporal Dementia Report ', styles['heading']))
        
        elements.append(Spacer(1, 0.5*inch))
        name = "Moin"  # Replace with the actual name value
        email = session.get('logged_in')  # Replace with the actual name value
        date = datetime.datetime.now().strftime('%B, %d, %Y')
        time = datetime.datetime.now().strftime('%I:%M %p')
        name_style = ParagraphStyle(
        'name',
        fontName='Helvetica',
        fontSize=12,
        textColor=colors.black,
        leftIndent=0.25*inch
        )
        email_style = ParagraphStyle(
       'email',
        fontName='Helvetica',
        fontSize=10,
        textColor=colors.black,
        
        leftIndent=0.25*inch
        
        )
        date_style = ParagraphStyle(
        'date',
        fontName='Helvetica',
        fontSize=12,
        textColor=colors.black,
        alignment=TA_RIGHT,
        rightIndent=0.25*inch
        )
        time_style = ParagraphStyle(
        'time',
        fontName='Helvetica',
        fontSize=10,
        textColor=colors.black,
        alignment=TA_RIGHT,
        rightIndent=0.25*inch
        )    
        elements.append(Paragraph(f'Name: {name}', name_style))
        elements.append(Paragraph(f'Email: {email}', email_style))
        elements.append(Paragraph(f'Date: {date}', date_style))
        elements.append(Paragraph(f'Time: {time}', time_style))
        
        # Add data to table
        
        
        elements.append(Spacer(1, 0.6*inch))
       
        elements.append(Paragraph('Tests related to Emotion', styles['heading1']))
        
        
        elements.append(Paragraph(f'''Emotion Recognition Test<br/>
      Percentage Scored : {results[5]}<br/>                         
      Completion Time (min :sec): {results[6]} <br/>  
      Summary: Emotion recognisation test was given by the patient to test the patient's ability to recognise the emotions of the patient. 
      The emotions of happy,sad ,anger.contempt,neutral,surprise,fear,and disgust were tested.
      The user identification capacity is {results[5]} % and the time span was {results[6]} minutes.                  
                             
                                  
                                  ''', name_style))
        elements.append(Spacer(1, 0.4*inch))
        elements.append(Paragraph(f'''Emoji Identification Test :<br/>
           Percentage Scored : {results[3]}<br/>                         
      Completion Time (min :sec): {results[4]} <br/>  
      Summary: Emoji Identification test was given by the patient to test the patient's ability to recognise the emojis . 
      The emojis related  smiley,frowny,emotion are tested.The user identification capacity is {results[3]} % and the time span was {results[4]} minutes.                                           
                                    
                                    
                                    
                                   ''', name_style))
        elements.append(Spacer(1, 0.6*inch))
        data = []
        
        data.append(results)
        table = Table(data)
        table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
    ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
    ('FONTSIZE', (0, 0), (-1, 0), 14),
    ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
    ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
    ('GRID', (0, 0), (-1, -1), 1, colors.black),
    ('BACKGROUND', (1, 1), (1, 1), colors.lightgrey),
        ]))

       # Add table to PDF template
        elements.append(table)
        doc.build(elements)
        response.data = buffer.getvalue()

        return response
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
