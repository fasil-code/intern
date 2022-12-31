class emotiondata(object):
    def __init__(self):
          self.data={
               'questions':[
                   {
     'path':'FEAR.jpg',
    'options':['sad','happy','angry','surprised'],
      'correct':'happy',
      
                   },
                      {
     
    'options':['sad','happy','angry','neutral'],
      'correct':'sad',
      
                   }
                      ,
                      {
    'options':['happy','angry','surprised','neutral'],
      'correct':'angry',
      
                   }
                      ,
                      {
                           
    'options':['surprised','disgusted','scared','neutral'],
      'correct':'surprised',
       },
         {
              
    'options':['surprised','disgusted','scared','neutral'],  
    'correct':'disgusted',
         },           
         {           
    'options':['surprised','disgusted','scared','neutral'],           
    'correct':'scared',
         }
                     
                   
                   
                   
  
               ]
          }
    def get(self):
        return self.data
          