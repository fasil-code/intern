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
      'correct':'surprised',
      
                   }
                      ,
                      {
                           
    'options':['contempt','disgusted','scared','neutral'],
      'correct':'contempt',
       },
         {
              
    'options':['surprised','disgusted','fear','neutral'],  
    'correct':'fear',
         },           
         {           
    'options':['angry','happy','scared','neutral'],           
    'correct':'angry',
         },
               {           
    'options':['angry','happy','scared','neutral'],           
    'correct':'angry',
         },         
                                {
                           
    'options':['contempt','disgusted','scared','neutral'],
      'correct':'contempt',
       },      
                   
                                         {
                           
    'options':['contempt','disgusted','scared','neutral'],
      'correct':'contempt',
       },        
                                             {
                           
    'options':['contempt','disgusted','scared','neutral'],
      'correct':'contempt',
       },        
                                                     {
                           
    'options':['contempt','disgusted','scared','neutral'],
      'correct':'contempt',
       },                                        
  
               ]
          }
    def get(self):
        return self.data
          