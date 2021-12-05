import json
from django.contrib.auth.models import User
from django.test import TestCase, Client
from .models import (
    IdolMember,
    IdolGroup,
    IdolGroupInfo,
    IdolMemberInfo,
    IdolMemberIncluded,
    MemberComment,
    GroupComment,
)


class IdolTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username="test", password="tetest")
        cls.group_name = {"kor": "테스트그룹", "eng": "Test Group"}
        cls.member_name = {"kor": "테스트멤버", "eng": "Test Member"}
        cls.tweets = [{"author": "1", "content": "1c"}]
        cls.youtubes = [{"author": "1", "url": "1c"}]
        cls.group_debut = "2016.08.08"
        cls.member_birth = "1997.02.09"
        cls.group = IdolGroup.objects.create(name=cls.group_name)
        cls.group_info = IdolGroupInfo.objects.create(
            group=cls.group,
            info={
                "데뷔": cls.group_debut,
                "tweets": cls.tweets,
                "youtubes": cls.youtubes,
            },
        )
        cls.member = IdolMember.objects.create(name=cls.member_name)
        cls.member_info = IdolMemberInfo.objects.create(
            member=cls.member,
            info={
                "출생": cls.member_birth,
                "tweets": cls.tweets,
                "youtubes": cls.youtubes,
            },
        )
        cls.member_included = IdolMemberIncluded.objects.create(
            group=cls.group, member=cls.member
        )
        cls.member_comment = MemberComment.objects.create(
            content="test", user=cls.user, member=cls.member
        )
        cls.group_comment = GroupComment.objects.create(
            content="test", user=cls.user, group=cls.group
        )
        cls.client = Client()


class SearchResultTestCase(IdolTestCase):
    def test_mmbr_cmt_get_post(self):
        self.client.post(
            "/api/account/signin/",
            json.dumps({"email": "test", "password": "tetest"}),
            content_type="application/json",
        )

        # when
        resp = self.client.put("/api/search-result/comment/member/1/")

        # then
        assert resp.status_code == 405

        # when
        resp = self.client.get(f"/api/search-result/comment/member/{self.member.id}/")

        # then
        res_data = json.loads(resp.content)
        assert resp.status_code == 200
        assert len(res_data) == 1
        assert res_data[0]["content"] == self.member_comment.content

        # when
        resp = self.client.post(
            f"/api/search-result/comment/member/{self.member.id}/",
            json.dumps({"content": "test"}),
            content_type="application/json",
        )

        res_data = json.loads(resp.content)
        assert resp.status_code == 200
        assert res_data["content"] == "test"

    def test_mmbr_cmt_put_delete(self):
        self.client.post(
            "/api/account/signin/",
            json.dumps({"email": "test", "password": "tetest"}),
            content_type="application/json",
        )

        # when
        resp = self.client.get("/api/search-result/member/comment/1/")

        # then
        assert resp.status_code == 405

        # when
        resp = self.client.put(
            f"/api/search-result/member/comment/{self.member_comment.id}/",
            json.dumps({"content": "test update"}),
            content_type="application/json",
        )

        # then
        res_data = json.loads(resp.content)
        assert resp.status_code == 200
        assert res_data["content"] == "test update"

        # when
        resp = self.client.delete(
            f"/api/search-result/member/comment/{self.member_comment.id}/"
        )

        # then
        assert resp.status_code == 200
        assert MemberComment.objects.filter(id=self.member_comment.id).exists() == False

    def test_검색결과_GET만_허용한다(self):
        # when
        get_member = self.client.delete(f"/api/search-result/member/{self.member.id}/")
        get_group = self.client.delete(f"/api/search-result/group/{self.group.id}/")

        # then
        assert get_member.status_code == 405
        assert get_group.status_code == 405

    def test_get으로_멤버정보를_불러올수있다(self):
        # when
        get = self.client.get(f"/api/search-result/member/{self.member.id}/")

        # then
        res_data = json.loads(get.content)
        basic_info = res_data["basicInfo"]["info"]
        assert get.status_code == 200
        assert basic_info["name"] == self.member_name
        assert basic_info["birth"] == self.member_birth
        assert basic_info["groups"][0]["id"] == self.group.id
        assert res_data["tweets"] == self.tweets
        assert res_data["youtubes"] == self.youtubes
        assert res_data["comments"][0]["content"] == self.member_comment.content

    def test_get으로_그룹정보를_불러올수있다(self):
        # when
        get = self.client.get(f"/api/search-result/group/{self.group.id}/")

        # then
        res_data = json.loads(get.content)
        basic_info = res_data["basicInfo"]["info"]

        assert get.status_code == 200
        assert basic_info["debut"] == self.group_debut
        assert basic_info["name"] == self.group_name
        assert basic_info["members"][0]["id"] == self.member.id
        assert res_data["tweets"] == self.tweets
        assert res_data["youtubes"] == self.youtubes
        assert res_data["comments"][0]["content"] == self.group_comment.content
