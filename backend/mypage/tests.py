import json

from django.test import TestCase, Client
from django.contrib.auth.models import User
from search_result.models import MemberComment, GroupComment, IdolMember, IdolGroup
from mypage.models import (
    ArticleGroupScrap,
    ArticleMemberScrap,
    MyIdolMember,
    MyIdolGroup,
)


SIGNIN_EMAIL = "jiho@nav.com"
SIGNIN_PASSWORD = "1234"
SIGNIN_LASTNAME = "jiho"
SIGNIN_FIRSTNAME = "jiho"
SAMPLE_MEMBER = "V"
SAMPLE_GROUP = "BTS"
MEMBER_COMMENT_CONTENT = "mmbr content test"
GROUP_COMMENT_CONTENT = "grp content test"


# Create your tests here.
class MyPageTestCase(TestCase):
    client = None
    user = None
    member = None
    group = None

    def setUp(self):
        self.client = Client(enforce_csrf_checks=False)
        User.objects.create_user(
            username=SIGNIN_EMAIL,
            password=SIGNIN_PASSWORD,
            first_name=SIGNIN_FIRSTNAME,
            last_name=SIGNIN_LASTNAME,
        )
        self.user = User.objects.get(username=SIGNIN_EMAIL)
        self.client.post(
            "/api/account/signin/",
            json.dumps({"email": SIGNIN_EMAIL, "password": SIGNIN_PASSWORD}),
            content_type="application/json",
        )

        self.member = IdolMember(name=SAMPLE_MEMBER)
        self.member.save()
        self.group = IdolGroup(name=SAMPLE_GROUP)
        self.group.save()

    def test_myinfo(self):
        response = self.client.get(f"/api/mypage/myinfo/{self.user.id}/")

        self.assertEqual(response.status_code, 200)
        self.assertIn(SIGNIN_FIRSTNAME + SIGNIN_LASTNAME, response.content.decode())
        self.assertIn(SIGNIN_EMAIL, response.content.decode())

        response = self.client.get(f"/api/mypage/myinfo/{self.user.id}1/")
        self.assertEqual(response.status_code, 403)

    def test_my_cmt_get(self):
        MemberComment(
            content=MEMBER_COMMENT_CONTENT, user=self.user, idol=self.member
        ).save()
        GroupComment(
            content=GROUP_COMMENT_CONTENT, user=self.user, idol=self.group
        ).save()

        response = self.client.get(
            "/api/mypage/comments/",
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn(MEMBER_COMMENT_CONTENT, response.content.decode())
        self.assertIn(GROUP_COMMENT_CONTENT, response.content.decode())
        self.assertIn("member", response.content.decode())
        self.assertIn("group", response.content.decode())

    def test_my_idol_get(self):
        MyIdolMember(user=self.user, member=self.member).save()
        MyIdolGroup(user=self.user, group=self.group).save()

        response = self.client.get(
            "/api/mypage/idols/",
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn("member", response.content.decode())
        self.assertIn("group", response.content.decode())
        self.assertIn(SAMPLE_MEMBER, response.content.decode())
        self.assertIn(SAMPLE_GROUP, response.content.decode())

    def test_my_artcl_get(self):
        SCRAP_TITLE = "TEST TITLE"
        SCRAP_ADDRESS = "https://naversfsdf.cosnfds"
        ArticleMemberScrap(
            user=self.user, member=self.member, title=SCRAP_TITLE, address=SCRAP_ADDRESS
        ).save()
        ArticleGroupScrap(
            user=self.user, group=self.group, title=SCRAP_TITLE, address=SCRAP_ADDRESS
        ).save()

        response = self.client.get(
            "/api/mypage/articles/",
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn("member", response.content.decode())
        self.assertIn("group", response.content.decode())
        self.assertIn(SCRAP_TITLE, response.content.decode())
        self.assertIn(SCRAP_ADDRESS, response.content.decode())
        self.assertIn(SAMPLE_GROUP, response.content.decode())
        self.assertIn(SAMPLE_MEMBER, response.content.decode())

    def test_mmbr_artcle_delete(self):
        SCRAP_TITLE = "TEST TITLE"
        SCRAP_ADDRESS = "https://naversfsdf.cosnfds"
        mmbr_article_scrp = ArticleMemberScrap(
            user=self.user, member=self.member, title=SCRAP_TITLE, address=SCRAP_ADDRESS
        )
        mmbr_article_scrp.save()

        response = self.client.delete(
            f"/api/mypage/articles/member/{mmbr_article_scrp.id}/"
        )
        self.assertEqual(response.status_code, 200)

    def test_grp_artcle_delete(self):
        SCRAP_TITLE = "TEST TITLE"
        SCRAP_ADDRESS = "https://naversfsdf.cosnfds"
        grp_article_scrp = ArticleGroupScrap(
            user=self.user, group=self.group, title=SCRAP_TITLE, address=SCRAP_ADDRESS
        )
        grp_article_scrp.save()

        response = self.client.delete(
            f"/api/mypage/articles/group/{grp_article_scrp.id}/"
        )
        self.assertEqual(response.status_code, 200)

    def test_grp_idol_delete(self):
        my_grp_idol = MyIdolGroup(user=self.user, group=self.group)
        my_grp_idol.save()

        response = self.client.delete(f"/api/mypage/idols/group/{my_grp_idol.id}/")
        self.assertEqual(response.status_code, 200)

    def test_mmbr_idol_delete(self):
        my_mmbr_idol = MyIdolMember(user=self.user, member=self.member)
        my_mmbr_idol.save()

        response = self.client.delete(f"/api/mypage/idols/member/{my_mmbr_idol.id}/")
        self.assertEqual(response.status_code, 200)
