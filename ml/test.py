import detectScene
import youtube

TEST_URL = "https://www.youtube.com/watch?v=tuPMVKmeaJM"

print(detectScene.find_scenes(youtube.linkToMp4(TEST_URL, resoultion="mid")))
