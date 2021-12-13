from scenedetect import VideoManager
from scenedetect import SceneManager

from scenedetect.detectors import ContentDetector

class detectScene:
    def __init__(self, video=""):
        self.video = video
    def setVideo(self, video=""):
        self.video = video
    def find_scenes(self, threshold=30.0):
        video_path =  self.video
        if(len(video_path) == 0):
            print("wrong video path")
            return
        video_manager = VideoManager([video_path])
        scene_manager = SceneManager()
        scene_manager.add_detector(
            ContentDetector(threshold=threshold))

        # Improve processing speed by downscaling before processing.
        video_manager.set_downscale_factor()

        # Start the video manager and perform the scene detection.
        video_manager.start()
        scene_manager.detect_scenes(frame_source=video_manager)

        # Each returned scene is a tuple of the (start, end) timecode.
        return scene_manager.get_scene_list()