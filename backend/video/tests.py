from django.test import TestCase, Client, tag
from django.http import response
import json

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

    def test_getScnCut(self):
        # Check (KeyError, JSonDecodeError) returns 400 response
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
                    "option": {
                        "path" : "test.mp4"
                    },
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
        self.assertEqual(response.status_code, 404)

        # is type is TYPE_FILE
        response = client.post(
            "/api/video/recognition/",
            json.dumps(
                {
                    "target": "https://www.youtube.com/watch?v=WMweEpGlu_U",
                    "option": "{}",
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
                    "option": "{}",
                    "type": 200,
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 404)

    def test_getReFaceRecog(self):
        # Check re-recognition return status 200
        response = client.post(
            "/api/video/re-recognition/",
            json.dumps({"user_name": "chris", "pass_word": "chris"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 404)

    def test_postShare(self):
        # Check (KeyError, JSonDecodeError) returns 400 response
        response = client.post(
            "/api/video/share/",
            json.dumps(
                {"result_id": 0, "result_description": "test", "result_type": 0}
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 404)

        # if type is SCENE
        response = client.post(
            "/api/video/share/",
            json.dumps(
                {"result_id": 0, "result_description": "test", "result_type": 100}
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 404)

        # if type is Recog
        response = client.post(
            "/api/video/share/",
            json.dumps(
                {"result_id": 0, "result_description": "test", "result_type": 200}
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 404)
