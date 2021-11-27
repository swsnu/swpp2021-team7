import json
from django.test import TestCase, Client
from django.contrib.auth.models import User
from search_result.models import IdolGroup, IdolMember
from main.models import SearchLog

SIGNIN_EMAIL = "jiho@nav.com"
SIGNIN_PASSWORD = "1234"
SAMPLE_MEMBER = "V"
SAMPLE_GROUP = "BTS"
MEMBER_SEARCH_LOGS_LEN = 10
GROUP_SEARCH_LOGS_LEN = 11


# Create your tests here.
class MainTestCase(TestCase):
    client = None
    user = None
    member = None
    group = None

    def setUp(self):
        self.client = Client(enforce_csrf_checks=False)
        User.objects.create_user(username=SIGNIN_EMAIL, password=SIGNIN_PASSWORD)
        self.user = User.objects.get(username=SIGNIN_EMAIL)
        self.client.post(
            "/api/account/signin/",
            json.dumps({"email": SIGNIN_EMAIL, "password": SIGNIN_PASSWORD}),
            content_type="application/json",
        )

        self.member = IdolMember(name={"eng": SAMPLE_MEMBER})
        self.member.save()
        self.group = IdolGroup(name={"eng": SAMPLE_GROUP})
        self.group.save()

    def test_ranking_info_get(self):
        for _ in range(0, MEMBER_SEARCH_LOGS_LEN):
            s = SearchLog(query=SAMPLE_MEMBER, isMember=True, user=self.user)
            s.save()

        for _ in range(0, GROUP_SEARCH_LOGS_LEN):
            s = SearchLog(query=SAMPLE_GROUP, user=self.user)
            s.save()

        response = self.client.get("/api/main/ranking/?page=1&size=10")
        last_page = 1
        self.assertEqual(response.status_code, 200)
        self.assertIn(SAMPLE_GROUP, response.content.decode())
        self.assertIn(SAMPLE_MEMBER, response.content.decode())
        self.assertIn(str(last_page), response.content.decode())

        response = self.client.get("/api/main/ranking/?page=2&size=1")
        last_page = 2
        self.assertEqual(response.status_code, 200)
        self.assertIn(SAMPLE_MEMBER, response.content.decode())
        self.assertIn(str(last_page), response.content.decode())

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
