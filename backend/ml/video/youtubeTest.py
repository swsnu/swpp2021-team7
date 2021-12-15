import sys
sys.path.append("./YoutubeVideo")

from YoutubeVideo import YoutubeVideo;

yt =  YoutubeVideo("sQaFQqrIb_k", "/Users/youngchaeyoon/Documents/temp/")
yt.save_video("test2")