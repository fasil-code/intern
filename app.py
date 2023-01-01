from flask import Flask,jsonify,render_template
app = Flask(__name__)

# for emotion data
from index import emotiondata
global count
count=0

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
   global count
   count=0
  
   data=obj.get()
   type=data['questions'][count]['correct']
   path=type+'/subject03.jpg'
 
   
   return render_template('EmojRecog/EmojRecog.html',data=data,count=count,path=path)
#4 Ace
@app.route("/ace")
def ace():
   return render_template('ACE/attention2.html')
@app.route("/ace2")
def ace2():
   return render_template('ACE/attention3.html')  

if __name__ == "__main__":
    app.run(debug = True)
    
    
