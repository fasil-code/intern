from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField ,IntegerField,SelectField
from wtforms.validators import DataRequired, Length, email, EqualTo

class RegistrationForm(FlaskForm):
    username = StringField('Username',
                           validators=[DataRequired(), Length(min=2, max=20)])
    email = StringField('Email',
                        validators=[DataRequired(), email()])
    age=IntegerField('Age',
                        validators=[DataRequired()])
    gender=SelectField('Gender', choices = [('Select one option','Select one option'),('Male', 'Male'),('Female', 'Female'),('Other','Other')]) 
                        
    region= SelectField('Region', choices = [('Select one option','Select one option'),('Rural', 'Rural'),('Urban', 'Urban')]) 
    city=StringField('City',
                       validators=[DataRequired()])  
    state=StringField('State',
                       validators=[DataRequired()])  
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm Password',
                                     validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Sign Up')

class LoginForm(FlaskForm):
    email = StringField('Email',
                        validators=[DataRequired(), email()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember = BooleanField('Remember Me')
    submit = SubmitField('Login')
  

class ResetRequestForm(FlaskForm):
    email = StringField('Email',
                        validators=[DataRequired(), email()])
   
    submit = SubmitField('Reset Pssword') 
 
class ResetPassword(FlaskForm):
    otp= StringField('OTP',
    validators=[DataRequired(), Length(min=2, max=20)])
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm Password',
                                     validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Reset Password') 
       