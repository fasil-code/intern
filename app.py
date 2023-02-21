
from flask import Flask,jsonify, make_response,render_template,request,session
from flask import Flask,render_template,url_for,flash,redirect
import random
import geonamescache
import os
import bcrypt
import math
import random
import uuid
import datetime
from reportlab.lib.colors import HexColor
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

app.config['MYSQL_PASSWORD'] = 'alchemist'
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
      emoji_game INT,
      time_emoji_game VARCHAR(255),
      ert INT,
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
         ptt_score INT,
         
         WrongClicks INT,
         CorrectClicks INT,
         
         
         session_id VARCHAR(255)
      )'''
   ) 
   cursor.execute(
      '''CREATE TABLE IF NOT EXISTS tmt (
         id INT AUTO_INCREMENT PRIMARY KEY,
         email VARCHAR(255) NOT NULL,
         Date VARCHAR(255),
         tmt_score INT,
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
         cursor.execute(f"UPDATE tmt SET tmt_score = %s WHERE session_id = %s AND email = %s", (score, sesion_key, email))
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

      report_id=results[7]



      query = "SELECT * FROM ace WHERE id=%s AND email=%s"
      cursor.execute(query, (id, email))
      results1 = cursor.fetchone()

      query = "SELECT * FROM ptt WHERE id=%s AND email=%s"
      cursor.execute(query, (id, email))
      result_ptt = cursor.fetchone()

      query = "SELECT * FROM tmt WHERE id=%s AND email=%s"
      cursor.execute(query, (id, email))
      result_tmt = cursor.fetchone()

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
               spaceAfter=0.1*inch,
               alignment=TA_CENTER,
               leftIndent=0.25*inch,    
         ),
         'heading1': ParagraphStyle(
            'heading',
            fontName='Helvetica-Bold',
            fontSize=20,
            textColor=colors.black,
            spaceAfter=0.25*inch,
            leftIndent=0.5*inch,
            border=1,
            borderColor=colors.black,
            borderPadding=0.1*inch,     
         ),
         'para':ParagraphStyle(
            'para',
            textColor=colors.gray,
            fontSize=13,
            leading=14,
            leftIndent=0.5*inch,
            rightIndent=0.5*inch,
            spaceBefore=0,
            border=2,
            borderWidth=1,
            borderColor=colors._CMYK_white,
            
            borderRadius=1,
            backColor=colors.whitesmoke,
            borderPadding=(10,10,10),  
         ),
         'header': ParagraphStyle(
            'header',
            fontName='Helvetica-Bold',
            fontSize=18,
            textColor=colors.red
         )     
      }
      elements = []
      elements.append(Paragraph('Frontotemporal Dementia Report ', styles['heading']))
      
      elements.append(Spacer(1, 0.5*inch))
        # Replace with the actual name value
      email = session.get('logged_in')  # Replace with the actual name value
      name = session.get('name')
      date = datetime.datetime.now().strftime('%B, %d, %Y')
     
      time = datetime.datetime.now().strftime('%I:%M %p')
      name_style = ParagraphStyle(
      'name',
      fontName='Helvetica',
      fontSize=12,
      textColor=colors.black,
      leftIndent=0.25*inch,
      #backColor=colors.whitesmoke
      )
      email_style = ParagraphStyle(
         'email',
         fontName='Helvetica',
         fontSize=12,
         textColor=colors.black,
         leftIndent=0.5*inch,
         rightIndent=0.5*inch,
         spaceBefore=0,
         border=2,
         borderWidth=1,
         borderColor=colors._CMYK_white,
         borderRadius=1,    
      )
   
      date_style = ParagraphStyle(
         'date',
         fontName='Helvetica',
         fontSize=12,
         textColor=colors.black,
         alignment=TA_RIGHT,
         #backColor=colors.whitesmoke,
         rightIndent=0.25*inch,
      )
      time_style = ParagraphStyle(
         'time',
         fontName='Helvetica',
         fontSize=12,
         textColor=colors.black,
         alignment=TA_RIGHT,
         rightIndent=0.25*inch,
         #backColor=colors.whitesmoke,
      )   

      elements.append(Paragraph(f'<font color="brown"> Name:</font> {name}', email_style))
      elements.append(Spacer(1, 0.1*inch))
      elements.append(Paragraph(f'<font color="brown">  Email:</font> {email}', email_style))
      elements.append(Spacer(1, 0.1*inch))
      elements.append(Paragraph(f'<font color="brown"> Report Id:</font> <font color="blue">{report_id}</font> ', email_style))
      elements.append(Paragraph(f'<font color="brown">Date:</font>  {date}', date_style))
      elements.append(Spacer(1, 0.1*inch))
      elements.append(Paragraph(f'<font color="brown">  Time:</font> {time}', time_style))
      
      # Add data to table
      elements.append(Spacer(1, 0.5*inch))
      elements.append(Paragraph(' <font color="maroon">Tests related to Emotion</font>', styles['heading1']))
      elements.append(Spacer(1, 0.2*inch))
      elements.append(Paragraph(f''' <font color="blue" fontSize=16> (a) Emotion Recognition Test</font> <br/>
      <br/>
      Percentage Scored : <font color="black" fontSize=14 >{results[5]} %</font><br/>                         
      Completion Time (min :sec):<font color="black" fontSize=14 > {results[6]}</font>  <br/>  
      <br/>
      Summary: Emotion recognisation test was given by the patient to test the patient's ability to recognise the emotions of the patient.
      The emotions of  happy,sad,anger. contempt,neutral,surprise,fear,and disgust were tested.
      The user identification capacity is <font color="black" fontSize=14 >{results[5]} %</font>  and the time span was <font color="black" fontSize=14 >{results[6]} minutes</font> .                                
      ''', style=styles['para']))
      elements.append(Spacer(1, 0.4*inch))
      elements.append(Paragraph(f''' <font color="blue" fontSize=16  >(b) Emoji Identification Test</font> :<br/> <br/>
      Percentage Scored : <font color="black" fontSize=14 >{results[3]}</font> <br/>                         
      Completion Time (min :sec): <font color="black" fontSize=14 >{results[4]}</font>  <br/>  
      <br/>
      Summary: Emoji Identification test was given by the patient to test the patient's ability to recognise the emojis . 
      The emojis related  smiley,frowny,emotion are tested.The user identification capacity is <font color="black" fontSize=14 >{results[3]} </font> % and the time span was <font color="black" fontSize=14 >{results[4]}  minutes. </font>                                          
      ''', styles['para']))
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


      # Define the style for the table
      table_style = TableStyle([
         ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
         ('FONTSIZE', (0, 0), (-1, 0), 14),
         ('BACKGROUND', (0, 0), (-1, 0), 'lightgrey'),
         ('TEXTCOLOR', (0, 0), (-1, 0), 'black'),
         ('ALIGN', (0, 0), (-1, 0), 'CENTER'),
         ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
         ('FONTSIZE', (0, 1), (-1, -1), 12),
         ('ALIGN', (0, 1), (-1, -1), 'CENTER'),
      ])

      elements.append(Spacer(1, 0.5*inch))

      elements.append(Paragraph(' <font color="maroon">ACE-III</font>', styles['heading1'])) 
      
      elements.append(Spacer(1, 0.2*inch))
      elements.append(Paragraph(f''' <font color="blue" fontSize=16>Total Marks :90</font> <br/>
      <br/>
        
      <font color="black" fontSize=14 >Marks Secured : {results1[3]+results1[4]+results1[5]+results1[6]+results1[7]+results1[8]+results1[9]+results1[10]+results1[11]+results1[12]+results1[13]+results1[14]+results1[15]+results1[16]+results1[17]+results1[18]} </font><br/>                                        
                                  
      ''', style=styles['para']))
      elements.append(Spacer(1, 0.4*inch))
      elements.append(Paragraph(f''' <font color="blue" fontSize=16> (a) Attention Test</font> <br/>
      <br/>

      <font color="black" fontSize=14 >Total Marks: 19 </font><br/>   
      <font color="black" fontSize=14 > Marks Secured: {results1[3]+results1[4]+results1[5]}</font><br/>                      
     
      <br/>
      <font color="black" fontSize=14 > Q1: This question asks for information about the date and season, specifically the day, date, month, year, season and address </font><br/>
      
      <br/>
      <font color="black" fontSize=14 >Total Marks: 11 </font><br/>   
      <font color="black" fontSize=14 >Marks Secured : {results1[3]} </font><br/>                      
     
      <br/>
      <font color="black" fontSize=14 >Q2: The question asks the subject to repeat three words and then instructs them to try to remember the words for later recall. </font><br/>
      
      <br/>
      
      <font color="black" fontSize=14 >Total Marks: 3 </font><br/>   
      <font color="black" fontSize=14 >Marks Secured :{results1[4]} </font><br/>
      <br/>
      <font color="black" fontSize=14 >  Q3: The question asks the subject to subtract 7 from 100 and then continue subtracting 7 from each new number five times. </font><br/>
      
     <br/>
      
      <font color="black" fontSize=14 >Total Marks: 5 </font><br/>   
      <font color="black" fontSize=14 >Marks Secured :{results1[5]} </font><br/>
      <br/>
                  
                                  ''', style=styles['para']))
      elements.append(Spacer(1, 0.4*inch))
      elements.append(Paragraph(f''' <font color="blue" fontSize=16  >(b)Memory Test</font> :<br/> <br/>
         <font color="black" fontSize=14 >Total Marks: 26</font><br/>   
         <font color="black" fontSize=14 >Marks Secured: {results1[8]+results1[9]+results1[10]+results1[11]} </font><br/>                      
     
      <br/>

      <font color="black" fontSize=14>Q1: This question asks the subject to to repeat three words, that were displayed earlier in attention test </font><br/>
     <br/> 
      <font color="black" fontSize=14 >Total Marks: 3 </font><br/>   
      <font color="black" fontSize=14 >Marks Secured :{results1[8]} </font><br/>
      <br/>

      <font color="black" fontSize=14>Q2: This question asks the subject to repeat name and address three times, so the subject will have a chance to learn.</font><br/>
     <br/> 
      <font color="black" fontSize=14 >Total Marks: 7 </font><br/>   
      <font color="black" fontSize=14 >Marks Secured :{results1[9]} </font><br/>
      <br/>

      <font color="black" fontSize=14> Q3: In this test, the subject is asked a series of general knowledge questions to assess their overall knowledge and cognitive ability</font><br/>
     <br/> 
      <font color="black" fontSize=14 >Total Marks: 4 </font><br/>   
      <font color="black" fontSize=14 >Marks Secured :{results1[10]} </font><br/>
      <br/>
     
      <font color="black" fontSize=14>Q4: The question asks the subject to  repeat the name and address that were presented to them earlier during a memory test</font><br/>
     <br/> 
      <font color="black" fontSize=14 >Total Marks: 12 </font><br/>   
      <font color="black" fontSize=14 >Marks Secured :{results1[11]} </font><br/>
      <br/>
     
     
                                 
                                  ''', style=styles['para']))
      elements.append(Spacer(1, 0.4*inch))
      elements.append(Paragraph(f''' <font color="blue" fontSize=16> (c) Fluency Test</font> <br/>
   <br/>
      <font color="black" fontSize=14 >Total Marks :14 </font><br/>   
      <font color="black" fontSize=14 >Marks Secured : {results1[6]+results1[7]}</font><br/>                      
     
      <br/>
      <font color="black" fontSize=14>Q1: The question asks the subject to generate as many words as possible starting with a given letter, excluding names of people or places, in one minute</font><br/>
     <br/> 
      <font color="black" fontSize=14 >Total Marks: 7 </font><br/>   
      <font color="black" fontSize=14 >Marks Secured :{results1[6]} </font><br/>
      <br/>
     
      <font color="black" fontSize=14>Q2: The question asks the subject to generate as many names of animals as possible  starting with any letter</font><br/>
     <br/> 
      <font color="black" fontSize=14 >Total Marks: 7 </font><br/>   
      <font color="black" fontSize=14 >Marks Secured :{results1[7]} </font><br/>
      <br/>
      
                                  
                                  ''', style=styles['para']))
      elements.append(Spacer(1, 0.4*inch))
      elements.append(Paragraph(f''' <font color="blue" fontSize=16> (d) Language Test</font> <br/>
      <br/>
      <font color="black" fontSize=14 >Total Marks: 23  </font><br/>   
      <font color="black" fontSize=14 >Marks Secured : {results1[12]+results1[13]+results1[14]+results1[15]+results1[16]} </font><br/>                      
     
      <br/>

      <font color="black" fontSize=14>Q1: The question asks the subject to name the pictures displayed on screen</font><br/>
      <br/> 
      <font color="black" fontSize=14 >Total Marks: 12 </font><br/>   
      <font color="black" fontSize=14 >Marks Secured :{results1[12]} </font><br/>
      <br/>
      
      <font color="black" fontSize=14>Q2: The question asks the subject about some information related to pictures displayed on screen</font><br/>
      <br/> 
      <font color="black" fontSize=14 >Total Marks: 4 </font><br/>   
      <font color="black" fontSize=14 >Marks Secured :{results1[13]} </font><br/>
      <br/>

      <font color="black" fontSize=14> Q3: The question asks the subject to write at least two complete sentences without using abbreviations. The scoring criteria are based on the subject's ability to produce at least two complete sentences about a single topic and to demonstrate correct grammar and spelling</font><br/>
      <br/> 
      <font color="black" fontSize=14 >Total Marks: 2 </font><br/>   
      <font color="black" fontSize=14 >Marks Secured :{results1[14]} </font><br/>
      <br/>
    
      <font color="black" fontSize=14>Q4: The question asks the subject to repeat words like : 'caterpillar'; 'eccentricity; 'unintelligible'; 'statistician'</font><br/>
      <br/> 
      <font color="black" fontSize=14 >Total Marks: 3 </font><br/>   
      <font color="black" fontSize=14 >Marks Secured :{results1[15]} </font><br/>
      <br/>
      
      <font color="black" fontSize=14>Q5: The question asks the subject to repeat idioms like : "All that glitters is not gold"</font><br/>
      <br/> 
      <font color="black" fontSize=14 >Total Marks: 2 </font><br/>   
      <font color="black" fontSize=14 >Marks Secured :{results1[16]} </font><br/>
      <br/>
    
                                  
                                  ''', style=styles['para']))
      elements.append(Spacer(1, 0.4*inch))
      elements.append(Paragraph(f''' <font color="blue" fontSize=16  >(e) Visuosptial Test</font> :<br/> <br/>
         <font color="black" fontSize=14 >Total Marks: 8 </font><br/>   
         <font color="black" fontSize=14 >Marks Secured : {results1[17]+results1[18]}</font><br/>                      
     
      <br/>
      <font color="black" fontSize=14>Q1: The question ask the subject to count the number of dots displayed on screen</font><br/>
      <br/> 
      <font color="black" fontSize=14 >Total Marks: 4 </font><br/>   
      <font color="black" fontSize=14 >Marks Secured :{results1[17]} </font><br/>
      <br/>
     
      <font color="black" fontSize=14>Q2: The question ask the subject to identify the fragmented letters</font><br/>
      <br/> 
      <font color="black" fontSize=14 >Total Marks: 4 </font><br/>   
      <font color="black" fontSize=14 >Marks Secured :{results1[18]} </font><br/>
      <br/>
      
     <br/>
      
                                  ''', style=styles['para']))
      # elements.append(Spacer(1, 0.4*inch))

      # elements.append(Paragraph(f''' <font color="blue" fontSize=16  >(f) Pulse Tracking Test</font> :<br/> <br/>
      #    <font color="black" fontSize=14 >Total Marks: 5 </font><br/>
      #    <font color="black" fontSize=14 >Marks Secured: {result_ptt[4]}</font><br/>
      #    <br/>
      #    <font color="black" fontSize=14>Wrong Clicks: {result_ptt[6]}</font><br/>
      #    <br/>
      #    <font color="black" fontSize=14>Correct Clicks: {result_ptt[7]}</font><br/>
      #    <font color="black" fontSize=14>All the wrong clicks and correct ones have been noted along with their timestamps and have been stored as BLOBs. <br/>
      #    Use pickle module to deserialize the BLOB data in Python</font><br/>
      #    ''', style=styles['para']))
      # elements.append(Spacer(1, 0.4*inch))
      # elements.append(Paragraph(f''' <font color="blue" fontSize=16  >(g) Trail Making Test</font> :<br/> <br/>
      #    <font color="black" fontSize=14 >Total Marks: 5 </font><br/>
      #    <font color="black" fontSize=14 >Marks Secured : {result_tmt[4]}</font><br/>
      #    <br/>
      #    <font color="black" fontSize=14>The count of wrong clicks has been noted down</font><br/>
      #    ''', style=styles['para']))
      # elements.append(Spacer(1, 0.4*inch))
      # Create the table and add it to the elements list
      
      doc.build(elements)
      response.data = buffer.getvalue()
      return response
      return redirect('login')

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
   return render_template('ACE/attention/attention3.html',url="ace4") 
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
        cursor.close()
        conn.close() 
        return render_template('ACE/ace_results.html',result_ace=result_ace,url="/tests")
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
