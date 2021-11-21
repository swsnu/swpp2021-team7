from scenedetect import VideoManager
from scenedetect import SceneManager

# For content-aware scene detection:
from scenedetect.detectors import ContentDetector

SHOW_PROGRESS = True
FRAME_SKIP = 0
THRESHOLD = 30.0

def find_scenes(video_path, threshold=THRESHOLD):
    # Create our video & scene managers, then add the detector.
    video_manager = VideoManager([video_path])
    scene_manager = SceneManager()
    scene_manager.add_detector(
        ContentDetector(threshold=threshold))

    # Improve processing speed by downscaling before processing.
    video_manager.set_downscale_factor()

    # Start the video manager and perform the scene detection.
    video_manager.start()
    scene_manager.detect_scenes(frame_source=video_manager, frame_skip=FRAME_SKIP, show_progress=SHOW_PROGRESS)

    # Each returned scene is a tuple of the (start, end) timecode.
    scenesFrame = scene_manager.get_scene_list()
    return [scene[0].get_timecode() for scene in scenesFrame]