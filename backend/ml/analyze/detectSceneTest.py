import sys
sys.path.append("./detectScene")

from detectScene import detectScene;

ds =  detectScene("/Users/youngchaeyoon/Documents/temp/test2.mp4")
temp = ds.find_scenes()
print(temp)