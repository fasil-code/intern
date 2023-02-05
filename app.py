from flask import Flask,jsonify,render_template,request
from flask import Flask,render_template,url_for,flash,redirect
from forms import RegistrationForm,LoginForm,ResetRequestForm,ResetPassword

app = Flask(__name__)
import random
import geonamescache
import os
import bcrypt
import math
import random
import smtplib
from flask_mysqldb import MySQL
app = Flask(__name__)
mysql = MySQL(app)
import mysql.connector

gc=geonamescache.GeonamesCache()
countries = gc.get_countries()
from flask import render_template


app = Flask(__name__)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '7006022139'


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
def hash_password(password):
    # Generate a salt
    password = password.encode("utf-8")
    hash = bcrypt.hashpw(password, bcrypt.gensalt())
    stored_password = hash.decode("utf-8")
    return stored_password

# Verify a password against the hashed password in the database
def verify_password(password, hashed_password):
    if bcrypt.checkpw(password.encode("utf-8"), hashed_password.encode("utf-8")):
       return True
    return False

@app.route("/register", methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        username=form.username.data
        email=form.email.data
        password=form.password.data
        hashed_password = hash_password(password)
         # Connect to the database
        conn = mysql.connect
        cursor = conn.cursor()
        # Check if the email already exists
        cursor.execute("SELECT * FROM user WHERE email=%s", (email,))
        result = cursor.fetchone()
        
        # If email already exists, show error message
        if result:
            flash('Email already exists, please use a different email address.', 'danger')
            return redirect(url_for('register'))
        # Insert form data into the user table
        cursor.execute("INSERT INTO user (username, email, password) VALUES (%s, %s, %s)", (username, email, hashed_password))
        conn.commit()
        
        # Close the cursor and connection
        cursor.close()
        conn.close()
        flash(f'Account created for {username}!', 'success')
        return redirect(url_for('home'))
    return render_template('register.html', title='Register', form=form)



@app.route("/login",methods=['GET','POST'])
def login():
    form=LoginForm()
    if form.validate_on_submit():
        email = form.email.data
        password = str(form.password.data)
        
        # Connect to the database
        conn = mysql.connect
        cursor = conn.cursor()
        
        # Get the hashed password from the database
        cursor.execute("SELECT email FROM user WHERE email=%s", (email,))
        result = cursor.fetchone()
        
        # If there is no matching record, show error message
        if not result:
            flash('Login Unsuccessful. Please check email and password.', 'danger')
            return redirect(url_for('login'))
        cursor.execute("SELECT password FROM user WHERE email=%s", (email,))
        result = cursor.fetchone()
        hashed_password=str(result[0])
        # Verify the entered password with the hashed password
        if verify_password(password, hashed_password):
            flash('You have been logged in!', 'success')
            return redirect(url_for('home'))
        else:
            flash('Login Unsuccessful. Please check email and password.', 'danger')
            return redirect(url_for('login'))
    return render_template('login.html', title='Login', form=form)
         
otp_sent = ""   
def send_otp(email):
    digits="0123456789"
    OTP=""
    for i in range(6):    
       OTP+=digits[math.floor(random.random()*10)]
    global otp_sent
    otp_sent = OTP   
    otp = OTP + " is your OTP"
    msg= otp
    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.starttls()
    s.login("zargerfasil123@gmail.com", "wnkkbihlwomebczv")
    emailid = email
    s.sendmail('ftd',emailid,msg)
email_sent = "" 
@app.route('/reset_password',methods=['GET','POST'])
def reset_password():
    form=ResetRequestForm()
   
    
    if form.validate_on_submit():
        email = form.email.data
        global email_sent
        email_sent=email
        # Connect to the database
        conn = mysql.connect
        cursor = conn.cursor()
        
        # Check if the email exists in the user table
        cursor.execute("SELECT * FROM user WHERE email=%s", (email,))
        result = cursor.fetchone()
        
        # If there is no matching email, show error message
        if not result:
            flash('No account with this email found.', 'danger')
            return redirect(url_for('reset_password'))
        
        # If email exists, show success message and reset password process
        send_otp(email)
        flash('Password reset instructions have been sent to your email', 'success')
        return redirect(url_for('set_password'))
    return render_template('reset_request.html',title='Reset Request',form=form)



@app.route('/set_password',methods=['GET','POST'])
def set_password():
    form=ResetPassword()
    if form.validate_on_submit():
        # get the entered OTP value
        entered_otp = form.otp.data
        password = form.password.data
        
        # compare the entered OTP with the stored OTP
        if entered_otp != otp_sent:
            flash('Incorrect OTP. Please try again.', 'danger')
            return redirect(url_for('set_password'))
        email=email_sent 
        # If OTP is correct, update the password in the database
        conn = mysql.connect
        cursor = conn.cursor()
        hashed_password=hash_password(password)
        cursor.execute("UPDATE user SET password=%s WHERE email=%s", (hashed_password, email))
        conn.commit()
        
        flash('Password has been reset successfully.', 'success')
        return redirect(url_for('login'))
    return render_template('reset.html',title='Reset Request',form=form)
 
        
        # move data from lang1 to app.py



#1  Home
@app.route("/",methods=['GET','POST'])
def home():
   return render_template('home.html')
@app.route("/api-key")
def get_api_key():
    api_key = os.environ.get("API_KEY")
    return api_key
#2 Emoji
@app.route("/emoji",methods=['GET','POST'])
def emoji():
   return render_template('Emoji/emoji.html')

#3 Emoji Recog

 

 
@app.route("/emojrecog",methods=['GET','POST'])
def emojrecog():
   
  
   
   return render_template('EmojRecog/EmojRecog.html')
#4 Ace
@app.route("/layout",methods=['GET','POST'])
def layout():
   name = request.args.get('name')
   
   return render_template('layout.html',url=name)
#5 Ace2)
@app.route("/ace1")
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

@app.route("/send_data", methods=['GET','POST'])
def send_data():
   marks= request.form.get("marks")
   return "Score received: " + marks 
  # return render_template('send_data.html',marks=marks)

@app.route("/navbar", methods=['GET','POST'])
def navbar():
   
   return render_template('send_data.html')
    
    
@app.route("/ace2")
def ace2():
   return render_template('ACE/attention/attention2.html') 
@app.route("/ace3",methods=['GET','POST']) 
def ace3():
   return render_template('ACE/attention/attention3.html') 
@app.route("/ace4") 
def ace4():
   return render_template('ACE/attention/attention4.html')  
@app.route("/ace5") 
def ace5():
   return render_template('ACE/memory/memory1.html')    

@app.route("/ace6") 
def ace6():
   return render_template('ACE/language/language2.html') 
@app.route("/ace7",methods=['GET','POST']) 
def ace7():
   return render_template('ACE/language/language3.html') 
@app.route("/ace8",methods=['GET','POST']) 
def ace8():
   return render_template('ACE/language/language4.html') 
@app.route("/ace9",methods=['GET','POST']) 
def ace9():
   return render_template('ACE/memory/memory2.html',url="ace11") 
@app.route("/ace10") 
def ace10():
   return render_template('ACE/memory/memory3.html',url="/") 
@app.route("/ace11",methods=['GET','POST']) 
def ace11():
   return render_template('ACE/memory/memory4.html') 
@app.route("/ace12",methods=['GET','POST']) 
def ace12():
   return render_template('ACE/fluency/fluency2.html')
@app.route("/ace13",methods=['GET','POST'])  
def ace13():
   return render_template('ACE/fluency/fluency1.html') 
@app.route("/lang",methods=['GET','POST'])
def language1():

   return render_template('ACE/language/language1.html',url="layout")
# visuo-spatial  tests
@app.route("/vs1",methods=['GET','POST'])
def vs1():

   return render_template('ACE/visuospatial/vs1.html',url="vs2")

@app.route("/vs2",methods=['GET','POST'])
def vs2():

   return render_template('ACE/visuospatial/vs2.html',url="ace10")

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
    
