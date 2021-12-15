from scenedetect import VideoManager
from scenedetect import SceneManager

from scenedetect.detectors import ContentDetector

"""
If local

import sys
sys.path.append("../video/FileController")
import os

class FileController:
    def  __init__(self):
        pass
    def checkPath(self, path=""):
        if os.path.exists(path) and os.path.isdir(path):
            return True
        if not os.access(path,os.W_OK):
            print(path)
            print("not access")
            return False
        try:
            os.makedirs(path)
            return True
        except OSError:
            return False
    def checkVideo(self, path=""):
        if os.path.exists(path) and os.path.isfile(path):
            return True
        else:
            return False
"""        
"""
If server
"""
from ml.video.FileController import FileController;

class detectScene:
    def __init__(self, video=""):
        self.video = video
    def setVideo(self, video=""):
        self.video = video
    def find_scenes(self, threshold=30.0):
        video_path =  self.video
        if (len(str(video_path)) == 0):
            print("wrong video path")
            return []
        fs = FileController()
        if not  fs.checkVideo(video_path):
            return []
        video_manager = VideoManager([str(video_path)])
        scene_manager = SceneManager()
        scene_manager.add_detector(
            ContentDetector(threshold=threshold))

        # Improve processing speed by downscaling before processing.
        video_manager.set_downscale_factor()

        # Start the video manager and perform the scene detection.
        video_manager.start()
        scene_manager.detect_scenes(frame_source=video_manager)

        # Each returned scene is a tuple of the (start, end) timecode.
        result = scene_manager.get_scene_list()
        return self.scene_list_parser(result)
    def scene_list_parser(self, scenes=[]):
        if len(scenes) == 0:
            return []
        result = []
        for time in scenes:
            result.append(round(time[1].get_seconds()*10) - round(time[0].get_seconds()*10))
            
        return result
