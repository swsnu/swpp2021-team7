from django.test import TestCase, Client

# from unittest.mock import patch
from .models import SearchLog
from search_result.models import IdolMember, IdolGroup
from django.contrib.auth.models import User
import json

# Create your tests here.
class MainTestCase(TestCase):
    def test_get_ranking(self):
        client = Client(enforce_csrf_checks=False)

        response = client.get("/api/main/ranking/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["lastPage"], 1)
        self.assertEqual(response.json()["idolInfos"], [])

        user = User.objects.create_user(username="Me")
        IdolMember.objects.create(name="Seulgi")
        SearchLog.objects.create(query="Red Velvet", isMember=False, user=user)

        response = client.get("/api/main/ranking/")
        self.assertEqual(response.status_code, 404)

        SearchLog.objects.create(query="Seulgi", isMember=True, user=user)
        # self.assertEqual(response.status_code, 200)
        # self.assertEqual(json.dumps(response)["lastPage"], 1)
        # self.assertEqual(json.dumps(response)["idolInfos"], [])
