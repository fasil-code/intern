
from flask import Flask,jsonify, make_response,render_template,request,session
from flask import Flask,render_template,url_for,flash,redirect
import json
import datetime
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER,TA_RIGHT,TA_LEFT
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from io import BytesIO
from io import BytesIO
from reportlab.lib.pagesizes import letter, landscape,A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Table, TableStyle
from reportlab.lib import colors
from flask import make_response
from flask import make_response
from flask_session import Session
from flask_mysqldb import MySQL
app = Flask(__name__)
mysql = MySQL(app)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'


app.config['MYSQL_PASSWORD'] = 'Zargar@123'
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

def generate_route_pdf():
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

      report_id=results[10]



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
      response.headers['Content-Disposition'] = 'attachment; filename=ftd.pdf'
      buffer = BytesIO()
      doc = SimpleDocTemplate(buffer, pagesize=A4)   
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
    
# Add the table to the report
      

# Build the PDF report
     



      elements.append(Paragraph(f'<font color="brown"> Name:</font> {name}', email_style))
      elements.append(Spacer(1, 0.1*inch))
      elements.append(Paragraph(f'<font color="brown">  Email:</font> {email}', email_style))
      elements.append(Spacer(1, 0.1*inch))
      elements.append(Paragraph(f'<font color="brown"> Report Id:</font> <font color="blue">{report_id}</font> ', email_style))
      elements.append(Spacer(1, 0.2*inch))
      elements.append(Paragraph(f'<font color="brown">Date:</font>  {date}', date_style))
      elements.append(Spacer(1, 0.1*inch))
      elements.append(Paragraph(f'<font color="brown">  Time:</font> {time}', time_style))
      
      
      elements.append(Spacer(1, 0.5*inch))
      
      elements.append(Paragraph(' <font color="maroon">Tests related to Emotion</font>', styles['heading1']))
      elements.append(Spacer(1, 0.2*inch))
      elements.append(Paragraph(f''' <font color="blue" fontSize=16> (a) Emotion Recognition Test</font> <br/>
      <br/>
      Total Correct responses detected: <font color="red" fontSize=14 >{results[5]}/10 </font><br/>                         
      Response Time (min :sec):<font color="red" fontSize=14 > {results[6]}</font>  <br/>  
      <br/>
      Summary: Emotion recognisation test was given by the patient to test the patient's ability to recognise the emotions of the patient.
      The emotions of  happy,sad,anger. contempt,neutral,surprise,fear,and disgust were tested.
      The user identification capacity is <font color="black" fontSize=14 >{results[5]} </font>  and the time span was <font color="black" fontSize=14 >{results[6]} minutes</font> .                                
      ''', style=styles['para']))
      elements.append(Spacer(1, 1.1*inch))
      elements.append(Paragraph(f''' <font color="blue" fontSize=16  >(b) Emoji Identification Test</font> :<br/> <br/>
      Total Correct responses : <font color="red" fontSize=14 >{results[3]}/10</font> <br/>                         
       Response time Time (min :sec): <font color="red" fontSize=14 >{results[4]}</font>  <br/>  
      <br/>
      Summary: Emoji Identification test was given by the patient to test the patient's ability to recognise the emojis . 
      The emojis related  smiley,frowny,emotion are tested.The user identification capacity is <font color="black" fontSize=14 >{results[3]} </font>  and the time span was <font color="black" fontSize=14 >{results[4]}  minutes. </font>                                          
      ''', styles['para']))
      elements.append(Spacer(1, 1.2*inch))
      result_correct=[]
      
      try:
        result_correct = json.loads(results[7])
      except TypeError:
       result_correct = []
      try:
        result_choosen=json.loads(results[8])
      except TypeError:
       result_choosen = []
      try:
        result_time=json.loads(results[9])
      except TypeError:
       result_time ={}
      
      
            
      col_width=[2*inch,2*inch]
      elements.append(Spacer(1, 0.6*inch))
      headings=["Correct Responses","Choosen Responses"]
      data=[]
      for i in  range(len(result_correct)):
               data.append([result_correct[i],result_choosen[i]])


      table = Table([headings]+data,colWidths=col_width)
      table.setStyle(TableStyle([
         ('BACKGROUND', (0,0), (-1,0), colors.black),
         ('TEXTCOLOR',(0,0),(-1,0),colors.white),
         ('ALIGN',(0,0),(-1,-1),'CENTER'),
         ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
         ('FONTSIZE', (0,0), (-1,0), 14),
         ('BOTTOMPADDING', (0,0), (-1,0), 12),
         ('BACKGROUND',(0,1),(-1,-1),colors.beige),
         ('TEXTCOLOR',(0,1),(-1,-1),colors.black),
         ('FONTNAME', (0,1), (-1,-1), 'Helvetica'),
         ('FONTSIZE', (0,1), (-1,-1), 12),
         ('BOTTOMPADDING', (0,1), (-1,-1), 6),
      ]))
      if len(result_correct)>0:
          elements.append(table)
            
          elements.append(Spacer(1, 1.6*inch))
      headings=["Emotion Type","Response Time"]
      data=[]
      for emotion, count in result_time.items():
               data.append([emotion,count])
            


      table = Table([headings]+data)
      table.setStyle(TableStyle([
         ('BACKGROUND', (0,0), (-1,0), colors.black),
         ('TEXTCOLOR',(0,0),(-1,0),colors.white),
         ('ALIGN',(0,0),(-1,-1),'CENTER'),
         ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
         ('FONTSIZE', (0,0), (-1,0), 14),
         ('BOTTOMPADDING', (0,0), (-1,0), 12),
         ('BACKGROUND',(0,1),(-1,-1),colors.beige),
         ('TEXTCOLOR',(0,1),(-1,-1),colors.black),
         ('FONTNAME', (0,1), (-1,-1), 'Helvetica'),
         ('FONTSIZE', (0,1), (-1,-1), 12),
         ('BOTTOMPADDING', (0,1), (-1,-1), 6),
      ]))   
            
            
            

      # Add the table to the report
      if(len(result_time)>0):
         elements.append(table)
         elements.append(Spacer(1, 1.5*inch))




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
      <font color="black" fontSize=14 >Total Marks: 10 </font><br/>   
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
    
      <font color="black" fontSize=14>Q4: The question asks the subject to repeat words</font><br/>
      <br/> 
      <font color="black" fontSize=14 >Total Marks: 3 </font><br/>   
      <font color="black" fontSize=14 >Marks Secured :{results1[15]} </font><br/>
      <br/>
      
      <font color="black" fontSize=14>Q5: The question asks the subject to repeat idioms </font><br/>
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
      elements.append(Spacer(1, 1.2*inch))
      elements.append(Paragraph(f''' <font color="blue" fontSize=16> (f) Pulse Tracking Test</font> <br/>
      <br/>
      Total Pulses Synced Properly: <font color="black" fontSize=14 > {result_ptt[3]} </font> out of <font color="black" fontSize=14 > 5 </font> <br/>                          
      Correct Clicks: <font color="black" fontSize=14 > {result_ptt[4]} </font> <br/>
      Extra Clicks: <font color="black" fontSize=14 > {result_ptt[4]-result_ptt[3]} </font> <br/>
      Wrong Clicks: <font color="black" fontSize=14 > {result_ptt[5]} </font> <br/>
      Summary: Pulse Tracking Test gamifies the diagnosis for potential repulsive behaviour in tap. It also checks whether a person is able to sync properly with abrupt changes in the pulse. The test is divided into 5 levels.                                
      ''', style=styles['para']))
      elements.append(Spacer(1, 0.2*inch))
      
      try:
        success = json.loads(result_ptt[7])
      except TypeError:
        success = []
      try:
        gray=json.loads(result_ptt[8])
      except TypeError:
        gray = []    
      try:
         correct=json.loads(result_ptt[9])
      except TypeError:
         correct = []
      try:
         wrong=json.loads(result_ptt[10])
      except TypeError:
         wrong = []
     
      col_width=[2*inch,2*inch]
      elements.append(Spacer(1, 0.6*inch))
      headings=["Sr. No.","Successful Syncs"]
      data=[]
      for i in  range(len(success)):
         data.append([i,success[i]])


      table = Table([headings]+data,colWidths=col_width)
      table.setStyle(TableStyle([
         ('BACKGROUND', (0,0), (-1,0), colors.black),
         ('TEXTCOLOR',(0,0),(-1,0),colors.white),
         ('ALIGN',(0,0),(-1,-1),'CENTER'),
         ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
         ('FONTSIZE', (0,0), (-1,0), 14),
         ('BOTTOMPADDING', (0,0), (-1,0), 12),
         ('BACKGROUND',(0,1),(-1,-1),colors.beige),
         ('TEXTCOLOR',(0,1),(-1,-1),colors.black),
         ('FONTNAME', (0,1), (-1,-1), 'Helvetica'),
         ('FONTSIZE', (0,1), (-1,-1), 12),
         ('BOTTOMPADDING', (0,1), (-1,-1), 6),
      ]))
      if len(success)>0:
          elements.append(table)
      
      col_width=[2*inch,2*inch]
      elements.append(Spacer(1, 0.6*inch))
      headings=["Sr. No.","Gray Clicks"]
      data=[]
      for i in  range(len(gray)):
         data.append([i,gray[i]])


      table = Table([headings]+data,colWidths=col_width)
      table.setStyle(TableStyle([
         ('BACKGROUND', (0,0), (-1,0), colors.black),
         ('TEXTCOLOR',(0,0),(-1,0),colors.white),
         ('ALIGN',(0,0),(-1,-1),'CENTER'),
         ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
         ('FONTSIZE', (0,0), (-1,0), 14),
         ('BOTTOMPADDING', (0,0), (-1,0), 12),
         ('BACKGROUND',(0,1),(-1,-1),colors.beige),
         ('TEXTCOLOR',(0,1),(-1,-1),colors.black),
         ('FONTNAME', (0,1), (-1,-1), 'Helvetica'),
         ('FONTSIZE', (0,1), (-1,-1), 12),
         ('BOTTOMPADDING', (0,1), (-1,-1), 6),
      ]))
      if len(gray)>0:
          elements.append(table)
      
      col_width=[2*inch,2*inch]
      elements.append(Spacer(1, 0.6*inch))
      headings=["Sr. No.","Correct Clicks"]
      data=[]
      for i in  range(len(correct)):
         data.append([i,correct[i]])


      table = Table([headings]+data,colWidths=col_width)
      table.setStyle(TableStyle([
         ('BACKGROUND', (0,0), (-1,0), colors.black),
         ('TEXTCOLOR',(0,0),(-1,0),colors.white),
         ('ALIGN',(0,0),(-1,-1),'CENTER'),
         ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
         ('FONTSIZE', (0,0), (-1,0), 14),
         ('BOTTOMPADDING', (0,0), (-1,0), 12),
         ('BACKGROUND',(0,1),(-1,-1),colors.beige),
         ('TEXTCOLOR',(0,1),(-1,-1),colors.black),
         ('FONTNAME', (0,1), (-1,-1), 'Helvetica'),
         ('FONTSIZE', (0,1), (-1,-1), 12),
         ('BOTTOMPADDING', (0,1), (-1,-1), 6),
      ]))
      if len(correct)>0:
          elements.append(table)

      col_width=[2*inch,2*inch]
      elements.append(Spacer(1, 0.6*inch))
      headings=["Sr. No.","Wrong Clicks"]
      data=[]
      for i in  range(len(wrong)):
         data.append([i,wrong[i]])


      table = Table([headings]+data,colWidths=col_width)
      table.setStyle(TableStyle([
         ('BACKGROUND', (0,0), (-1,0), colors.black),
         ('TEXTCOLOR',(0,0),(-1,0),colors.white),
         ('ALIGN',(0,0),(-1,-1),'CENTER'),
         ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
         ('FONTSIZE', (0,0), (-1,0), 14),
         ('BOTTOMPADDING', (0,0), (-1,0), 12),
         ('BACKGROUND',(0,1),(-1,-1),colors.beige),
         ('TEXTCOLOR',(0,1),(-1,-1),colors.black),
         ('FONTNAME', (0,1), (-1,-1), 'Helvetica'),
         ('FONTSIZE', (0,1), (-1,-1), 12),
         ('BOTTOMPADDING', (0,1), (-1,-1), 6),
      ]))
      if len(wrong)>0:
          elements.append(table)

      elements.append(Spacer(1, 1.2*inch))
      elements.append(Paragraph(f''' <font color="blue" fontSize=16> (g) Trail Making Test</font> <br/>
      <br/>
      Total Time Taken to complete the test 1: <font color="black" fontSize=14 > {result_tmt[3]}</font><br/>
      Total Time Taken to complete the test 2: <font color="black" fontSize=14 > {result_tmt[4]}</font><br/>                          
      Summary: Trail Making Test tests a persons ability to count the numbers in an order and his memory. It also checks whether a person is able to do it under time. The test is divided into parts.                                
      ''', style=styles['para']))
      elements.append(Spacer(1, 0.2*inch))
      timestamp1=[]
      try:
        timestamp1 = json.loads(result_tmt[7])
      except TypeError:
        timestamp1 = []
      try:
        timestamp2=json.loads(result_tmt[8])
      except TypeError:
        timestamp2 = []    
     
      col_width=[2*inch,2*inch]
      elements.append(Spacer(1, 0.6*inch))
      headings=["Sr. No.","Part I"]
      data=[]
      for i in  range(len(timestamp1)):
         data.append([i,timestamp1[i]])


      table = Table([headings]+data,colWidths=col_width)
      table.setStyle(TableStyle([
         ('BACKGROUND', (0,0), (-1,0), colors.black),
         ('TEXTCOLOR',(0,0),(-1,0),colors.white),
         ('ALIGN',(0,0),(-1,-1),'CENTER'),
         ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
         ('FONTSIZE', (0,0), (-1,0), 14),
         ('BOTTOMPADDING', (0,0), (-1,0), 12),
         ('BACKGROUND',(0,1),(-1,-1),colors.beige),
         ('TEXTCOLOR',(0,1),(-1,-1),colors.black),
         ('FONTNAME', (0,1), (-1,-1), 'Helvetica'),
         ('FONTSIZE', (0,1), (-1,-1), 12),
         ('BOTTOMPADDING', (0,1), (-1,-1), 6),
      ]))
      if len(timestamp1)>0:
          elements.append(table)
          elements.append(Spacer(1, 0.6*inch))
      col_width=[2*inch,2*inch]
     
      headings=["Sr. No.","Part II"]
      data=[]
      for i in  range(len(timestamp2)):
         data.append([i,timestamp2[i]])


      table = Table([headings]+data,colWidths=col_width)
      table.setStyle(TableStyle([
         ('BACKGROUND', (0,0), (-1,0), colors.black),
         ('TEXTCOLOR',(0,0),(-1,0),colors.white),
         ('ALIGN',(0,0),(-1,-1),'CENTER'),
         ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
         ('FONTSIZE', (0,0), (-1,0), 14),
         ('BOTTOMPADDING', (0,0), (-1,0), 12),
         ('BACKGROUND',(0,1),(-1,-1),colors.beige),
         ('TEXTCOLOR',(0,1),(-1,-1),colors.black),
         ('FONTNAME', (0,1), (-1,-1), 'Helvetica'),
         ('FONTSIZE', (0,1), (-1,-1), 12),
         ('BOTTOMPADDING', (0,1), (-1,-1), 6),
      ]))
      if len(timestamp2)>0:
          elements.append(table)
  
      
      doc.build(elements)
      response.data = buffer.getvalue()
      return response
   return redirect('login')