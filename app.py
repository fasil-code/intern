from flask import Flask,jsonify,render_template


app = Flask(__name__)

@app.route("/",methods=['GET','POST'])
def home():
   return render_template('home.html')

@app.route("/emoji",methods=['GET','POST'])
def emoji():
   return render_template('emoji.html')



if __name__ == "__main__":
    app.run(debug = True)
    
    
