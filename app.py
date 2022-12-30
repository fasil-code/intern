from flask import Flask,jsonify,render_template
app = Flask(__name__)


#Home
@app.route("/",methods=['GET','POST'])
def home():
   return render_template('home.html')
#Emoji
@app.route("/emoji",methods=['GET','POST'])
def emoji():
   return render_template('Emoji/emoji.html')

#Emoji Recog
@app.route("/emojrecog",methods=['GET','POST'])
def emojrecog():
   
   return render_template('EmojRecog/EmojRecog.html')
#Ace
@app.route("/ACE")
def ace():
   return render_template('ACE/attention2.html')
    

if __name__ == "__main__":
    app.run(debug = True)
    
    
