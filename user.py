from flask import Flask,jsonify,render_template,request,session
from flask import Flask,render_template,url_for,flash,redirect
from forms import RegistrationForm,LoginForm,ResetRequestForm,ResetPassword
app = Flask(__name__)
import random
import geonamescache
import bcrypt
import math
import random
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


app = Flask(__name__)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'

# app.config['MYSQL_PASSWORD'] = 'alchemist'
app.config['MYSQL_PASSWORD'] = 'Zargar@123'
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)


app.config['MYSQL_DB'] = 'ftd'
app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
mysql = MySQL(app)

#hashing password
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



# Register a new user

def register_route():
    form = RegistrationForm()
    if form.validate_on_submit():
        username=form.username.data
        email=form.email.data
        password=form.password.data
        age=form.age.data
        region=form.region.data
        state=form.state.data
        city=form.city.data
        gender=form.gender.data
        hashed_password = hash_password(password)
         # Connect to the database
        conn = mysql.connect
        cursor = conn.cursor()
        # Check if the email already exists
        cursor.execute("SELECT * FROM user WHERE email=%s", (email,))
        result = cursor.fetchone()
        
        # If email already exists, show error message
        if result:
            flash('Email already exists, please login to continue.', 'danger')
            return redirect(url_for('register'))
        # Insert form data into the user table
        cursor.execute("INSERT INTO user (username, email, password, age, region, State, City,gender) VALUES (%s, %s, %s, %s, %s, %s, %s,%s)", (username, email, hashed_password, age, region, state, city,gender))
        conn.commit()
        
        # Close the cursor and connection
        cursor.close()
        conn.close()
        flash(f'Account created for {username}!', 'success')
        return redirect(url_for('home'))
    return render_template('register.html', title='Register', form=form)


# Login an existing user 
def login_route():
    form=LoginForm()
    if form.validate_on_submit():
        email = form.email.data
        password = str(form.password.data)
        
        # Connect to the database
        conn = mysql.connect
        cursor = conn.cursor()
        log=False
        # Get the hashed password from the database
        cursor.execute("SELECT email FROM user WHERE email=%s", (email,))
        result = cursor.fetchone()
        
        # If there is no matching record, show error message
        if not result:
            flash('Login Unsuccessful. Please check email and password.', 'danger')
            return redirect(url_for('login'))
        cursor.execute("SELECT password,username FROM user WHERE email=%s", (email,))
        result = cursor.fetchone()
        hashed_password=str(result[0])
        # Verify the entered password with the hashed password
        if verify_password(password, hashed_password):
            session['logged_in'] = email
            session['name']=result[1]
            flash('You have been logged in!', 'success')
            return redirect(url_for('home'))
        else:
            flash('Login Unsuccessful. Please check email and password.', 'danger')
            return redirect(url_for('login'))
    return render_template('login.html', title='Login', form=form)

# Global variable for otp
otp_sent = ""

# function for sending otp to email   
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

# function to reset password providing email form
def reset_password_route():
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



# function for setting new password
def set_password_route():
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
 
# logout route for expiring session 
def logout_route():
    
    # Remove the logged_in key from the session
    session.pop('logged_in', None)
    return render_template('navbar.html', logged_in=False)
# removing login history after logout

def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    return response

