from flask import Flask,jsonify,render_template,request
app = Flask(__name__)
import random
import geonamescache
# for emotion data
from index import emotiondata
gc=geonamescache.GeonamesCache()
countries = gc.get_countries()
from flask import render_template





#1  Home
@app.route("/",methods=['GET','POST'])
def home():
   
   return render_template('home.html')
#2 Emoji
@app.route("/emoji",methods=['GET','POST'])
def emoji():
   return render_template('Emoji/emoji.html')

#3 Emoji Recog

 

 
@app.route("/emojrecog",methods=['GET','POST'])
def emojrecog():
   obj=emotiondata()
   if "count" in request.args:
     count=int(request.args['count'])
   else:
      count=0
   random_number = random.randint(1, 15)
   data=obj.get()
   random_number=str(random_number)
   if 9>=int(random_number):
      random_number="0"+str(random_number)
   if  count>=10:
       return render_template('EmojRecog/result.html')
   else :
       type=data['questions'][count]['correct']
       path=type+'/subject'+random_number+'.jpg'
       return render_template('EmojRecog/EmojRecog.html',data=data,count=count,path=path,random_number=random_number)
#4 Ace
@app.route("/layout",methods=['GET','POST'])
def layout():
   name = request.args.get('name')
   
   return render_template('ACE/attention/layout.html',url=name)
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
@app.route("/ace7") 
def ace7():
   return render_template('ACE/language/language3.html') 
   
@app.route("/lang",methods=['GET','POST'])
def lang():

   return render_template('ACE/language/language1.html')

@app.route('/results', methods=['GET','POST'])
def submit():
 
  return render_template('results.html')

#5 Pulse Tracking Test (PTT)
@app.route("/ptt",methods=['GET','POST'])
def ptt():
   return render_template('PTT/ptt.html')

#6 Trail Making Test (TMT I & II)
@app.route("/tmt",methods=['GET','POST'])
def tmt():
    return render_template('TMT/TMT.html')


if __name__ == "__main__":
    app.run(debug = True)
    
