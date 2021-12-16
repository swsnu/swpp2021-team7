import sys
sys.path.append("./faceRecognition")

from faceRecognition import faceRecognition;

ds =  faceRecognition("/Users/youngchaeyoon/Documents/temp/test2.mp4"
                    ,["https://www.allkpop.com/upload/2021/09/content/152150/1631757005-20210915-jungkook.jpg"])
temp = ds.parse()
print(temp)