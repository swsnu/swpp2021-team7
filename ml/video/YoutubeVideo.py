from pytube import YouTube 
   
import random  
import string 
  
class YoutubeVideo:
    def __init__(self, video="", save="", name="temp"):
        self.video = video
        self.save = save
    def randomString(self, length=10): # define the function and pass the length as argument  
    # Print the string in Lowercase  
        result = ''.join((random.choice(string.ascii_lowercase) for x in range(length))) # run loop until the define length  
        return result
    def saveVideo(self, name):
        video_id = self.video
        if(len(video_id) == 0):
            return False
        link="https://www.youtube.com/watch?v="+video_id
        
        try: 
            yt = YouTube(link) 
        except: 
            print("Connection Error") #to handle exception 
            return False
        
        mp4files = yt.filter('mp4') 
        
        yt.set_filename(name)  
        
        d_video = yt.get(mp4files[-1].extension,mp4files[-1].resolution) 
        try: 
            d_video.download(self.save) 
        except: 
            print("Some Error!") 
            return False
        print('Task Completed!') 
        return self.save + name + ".mp4"