from flask import Flask,jsonify,render_template,request
app = Flask(__name__)
import random
# for emotion data
from index import emotiondata



#1  Home
@app.route("/",methods=['GET','POST'])
def home():
   return render_template('home.html')
#2 Emoji
@app.route("/emoji",methods=['GET','POST'])
def emoji():
   return render_template('Emoji/emoji.html')

#3 Emoji Recog

 
@app.route("/result",methods=['GET','POST'])
def result():
    return "<p>Hello, World!</p>"
 
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
   if  count>10:
       return render_template('EmojRecog/result.html')
   else :
       type=data['questions'][count]['correct']
       path=type+'/subject'+random_number+'.jpg'
       return render_template('EmojRecog/EmojRecog.html',data=data,count=count,path=path,random_number=random_number)
#4 Ace
@app.route("/ace")
def ace():
   return render_template('ACE/attention2.html')
    
@app.route("/ace2")
def ace2():
   return render_template('ACE/attention3.html')  

    
@app.route("/language",methods=['GET','POST'])
def lang():

   return render_template('language.html')

@app.route('/results', methods=['GET','POST'])
def submit():
 
  return render_template('results.html')

if __name__ == "__main__":
    app.run(debug = True)
    
    
