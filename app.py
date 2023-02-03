from flask import Flask,jsonify,render_template,request
from flask import Flask,render_template,url_for,flash,redirect
from forms import RegistrationForm,LoginForm
app = Flask(__name__)
import random
import geonamescache
import os
# for emotion data
app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
gc=geonamescache.GeonamesCache()
countries = gc.get_countries()
from flask import render_template





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


@app.route("/register", methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        flash(f'Account created for {form.username.data}!', 'success')
        return redirect(url_for('home'))
    return render_template('register.html', title='Register', form=form)


@app.route("/login",methods=['GET','POST'])
def login():
    form=LoginForm()
    if form.validate_on_submit():
        if(form.email.data=='zargerfasil123@gmail.com' and form.password.data=='asdf'):
            flash('You have been logged in!', 'success')
            return redirect(url_for('home'))
        else:
            flash('Login Unsuccessful. Please check username and password', 'danger')
    return render_template('login.html',title='Login',form=form)


if __name__ == "__main__":
    app.run(debug = True)
    
