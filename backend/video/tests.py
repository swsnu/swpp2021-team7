from unittest.mock import patch
from django.test import TestCase, Client, tag
from django.http import response
import json
from ml.analyze.detectScene import detectScene

from ml.video.YoutubeVideo import YoutubeVideo

# Create your tests here.
client = Client()

TYPE_YOUTUBE = 100
TYPE_FILE = 200


class VideoTestCase(TestCase):
    def test_csrf(self):
        client = Client(enforce_csrf_checks=True)

        response = client.get("/api/account/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = client.delete("/api/account/token/", HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

    def setUp(self):
        client = Client(enforce_csrf_checks=False)
        # Signup
        response = client.post(
            "/api/account/signup/",
            json.dumps(
                {
                    "email": "eunbin@jjang.com",
                    "password": "veryjjang",
                    "first_name": "Eunbin",
                    "last_name": "Kang",
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 201)

        # Signin correctly
        response = client.post(
            "/api/account/signin/",
            json.dumps({"email": "eunbin@jjang.com", "password": "veryjjang"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 204)

    @patch.object(YoutubeVideo, "random_string")
    @patch.object(YoutubeVideo, "save_video")
    @patch.object(detectScene, "find_scenes")
    def test_getScnCut(self, mock_radom_str, mock_save_video, mock_find_scene):
        # Check (KeyError, JSonDecodeError) returns 400 response
        mock_radom_str.return_value = "random_file_path"
        mock_save_video.return_value = "video_file_path"
        mock_find_scene.return_value = [1, 2, 3, 4]
        response = client.post(
            "/api/video/scene/",
            json.dumps(
                {
                    "target": "https://www.youtube.com/watch?v=WMweEpGlu_U",
                    "option": "{}",
                    "type": 0,
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)

        # if type is TYPE_FILE
        response = client.post(
            "/api/video/scene/",
            json.dumps(
                {
                    "target": "https://www.youtube.com/watch?v=WMweEpGlu_U",
                    "option": "{}",
                    "type": TYPE_YOUTUBE,
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)

        # if type is TYPE_FILE
        response = client.post(
            "/api/video/scene/",
            json.dumps(
                {
                    "target": "https://www.youtube.com/watch?v=WMweEpGlu_U",
                    "option": {"path": "test.mp4"},
                    "type": TYPE_FILE,
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)

    def test_getFaceRecog(self):
        # Wrong type

        response = client.post(
            "/api/video/recognition/",
            json.dumps(
                {
                    "target": "https://www.youtube.com/watch?v=WMweEpGlu_U",
                    "option": "{}",
                    "type": 0,
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)

        # is type is TYPE_FILE
        response = client.post(
            "/api/video/recognition/",
            json.dumps(
                {
                    "target": "https://www.youtube.com/watch?v=WMweEpGlu_U",
                    "option": {"idol": [22]},
                    "type": 100,
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 404)

        # is type is TYPE_YOUTUBE
        response = client.post(
            "/api/video/recognition/",
            json.dumps(
                {
                    "target": "https://www.youtube.com/watch?v=WMweEpGlu_U",
                    "option": {"idol": [22]},
                    "type": 200,
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 404)
