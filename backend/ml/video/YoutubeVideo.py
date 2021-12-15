from pytube import YouTube 
   
import random  
import string 
from .FileController import FileController
  
class YoutubeVideo:
    def __init__(self, video="", save="", name="temp"):
        self.video = video
        self.save = save
    def random_string(self, length=10): # define the function and pass the length as argument  
    # Print the string in Lowercase  
        result = ''.join((random.choice(string.ascii_lowercase) for x in range(length))) # run loop until the define length  
        return result
    def save_video(self, name):
        video_id = self.video
        fs = FileController()
        if not fs.checkPath(self.save):
            return False
        if(len(video_id) == 0):
            return False
        link="https://www.youtube.com/watch?v="+video_id
        
        try: 
            yt = YouTube(link) 
        except ValueError: 
            print("Connection Error") #to handle exception 
            return False
        
        mp4files = yt.streams.filter(progressive=True,file_extension='mp4') 
        
        try: 
            mp4files.download(self.save+name + ".mp4") 
        except ValueError: 
            print("Some Error!") 
            return False
        print('Task Completed!') 
        return self.save + name + ".mp4"