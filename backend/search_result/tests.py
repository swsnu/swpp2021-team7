import json
from unittest.mock import patch

from datetime import timedelta
from django.contrib.auth.models import User
from django.utils.timezone import now
from django.test import TestCase, Client

from .management.functions.crawl_all import CrawlUtil
from .models import (
    IdolMember,
    IdolGroup,
    IdolGroupInfo,
    IdolMemberInfo,
    IdolMemberIncluded,
    MemberComment,
    GroupComment, IdolRequest,
)
from mypage.models import (
    MyIdolMember,
    MyIdolGroup,
    ArticleMemberScrap,
    ArticleGroupScrap,
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
            updated_at=now(),
            group=cls.group,
            info={
                "데뷔": cls.group_debut,
                "tweets": cls.tweets,
                "youtubes": cls.youtubes,
            },
        )
        cls.member = IdolMember.objects.create(name=cls.member_name)
        cls.member_info = IdolMemberInfo.objects.create(
            updated_at=now(),
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
            content="test", user=cls.user, idol=cls.member
        )
        cls.group_comment = GroupComment.objects.create(
            content="test", user=cls.user, idol=cls.group
        )
        cls.client = Client()


class CommentTestCase(IdolTestCase):
    def setUp(self) -> None:
        self.client.force_login(self.user)

    def test_mmbr_cmt_get_post(self):
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

    def test_grp_cmt_get_post(self):
        # when
        resp = self.client.get(f"/api/search-result/comment/group/{self.group.id}/")

        # then
        res_data = json.loads(resp.content)
        assert resp.status_code == 200
        assert len(res_data) == 1
        assert res_data[0]["content"] == self.group_comment.content

        # when
        resp = self.client.post(
            f"/api/search-result/comment/group/{self.group.id}/",
            json.dumps({"content": "test"}),
            content_type="application/json",
        )

        # then
        res_data = json.loads(resp.content)
        assert resp.status_code == 200
        assert res_data["content"] == "test"

    def test_mmbr_cmt_put_delete(self):
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
        assert MemberComment.objects.filter(id=self.member_comment.id).exists() is False

    def test_grp_cmt_put_delete(self):
        # when
        resp = self.client.put(
            f"/api/search-result/group/comment/{self.group_comment.id}/",
            json.dumps({"content": "test update"}),
            content_type="application/json",
        )

        # then
        res_data = json.loads(resp.content)
        assert resp.status_code == 200
        assert res_data["content"] == "test update"

        # when
        resp = self.client.delete(
            f"/api/search-result/group/comment/{self.group_comment.id}/"
        )

        # then
        assert resp.status_code == 200
        assert GroupComment.objects.filter(id=self.group_comment.id).exists() is False


class SearchResultTestCase(IdolTestCase):
    def setUp(self) -> None:
        self.client.force_login(self.user)

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

    @patch.object(CrawlUtil, "crawl_all")
    def test_업데이트_3일_넘었으면_또한다(self, mock_crawl):
        # given
        self.member_info.updated_at = now() - timedelta(days=5)
        self.member_info.save()
        new_news = [{"title": "제모오옥", "url": "afjlsfd.naver.com"}]
        new_tweets = [{"author": "교통정리", "content": "우리가자주걸었던"}]
        new_youtubes = [{"author": "잇섭", "url": "afjlasjdflk.youtube.com"}]
        mock_crawl.return_value = new_news, new_youtubes, new_tweets

        # when
        get = self.client.get(f"/api/search-result/member/{self.member.id}/")
        self.member_info.refresh_from_db()
        get = json.loads(get.content)

        # then
        mock_crawl.assert_called_with(
            self.group_name["kor"] + " " + self.member_name["kor"]
        )
        assert get["tweets"] == new_tweets
        assert get["youtubes"] == new_youtubes
        assert get["basicInfo"]["news"] == new_news
        assert self.member_info.info["news"] == new_news
        assert self.member_info.info["tweets"] == new_tweets
        assert self.member_info.info["youtubes"] == new_youtubes
        assert abs(self.member_info.updated_at - now()) < timedelta(seconds=30)

    def test_트윗_세개만_가져온다(self):
        # given
        self.member_info.info["tweets"] = [
            {"author": "교통정리", "content": "우리가자주걸었던"},
            {"author": "한걸음", "content": "closer내맘"},
            {"author": "내위치에선", "content": "넌숨도못쉬어"},
            {"author": "네번째", "content": "와다다다"},
        ]
        self.member_info.save()

        # when
        get = self.client.get(f"/api/search-result/member/{self.member.id}/")
        self.member_info.refresh_from_db()
        get = json.loads(get.content)

        # then
        assert len(get["tweets"]) == 3

    def test_그룹_업데이트를_잘반영한다(self):
        # given
        new_news = [{"title": "제모오옥", "url": "afjlsfd.naver.com"}]
        new_tweets = [{"author": "교통정리", "content": "우리가자주걸었던"}]
        new_youtubes = [{"author": "잇섭", "url": "afjlasjdflk.youtube.com"}]

        # when
        self.group_info.apply_updates(new_news, new_youtubes, new_tweets, save=True)
        self.group_info.refresh_from_db()

        # then
        assert self.group_info.info["news"] == new_news
        assert self.group_info.info["tweets"] == new_tweets
        assert self.group_info.info["youtubes"] == new_youtubes
        assert abs(self.group_info.updated_at - now()) < timedelta(seconds=30)

    def test_멤버_업데이트를_잘반영한다(self):
        # given
        new_news = [{"title": "제모오옥", "url": "afjlsfd.naver.com"}]
        new_tweets = [{"author": "교통정리", "content": "우리가자주걸었던"}]
        new_youtubes = [{"author": "잇섭", "url": "afjlasjdflk.youtube.com"}]

        # when
        self.member_info.apply_updates(new_news, new_youtubes, new_tweets, save=True)
        self.member_info.refresh_from_db()

        # then
        assert self.member_info.info["news"] == new_news
        assert self.member_info.info["tweets"] == new_tweets
        assert self.member_info.info["youtubes"] == new_youtubes
        assert abs(self.member_info.updated_at - now()) < timedelta(seconds=30)

    def test_키워드검색_잘된다(self):
        # given
        keyword = "테스트"

        # when
        get = self.client.get(f"/api/search-result/search/{keyword}/")
        get = json.loads(get.content)
        # then
        assert len(get) == 2
        assert get[0]["id"] == self.group.id
        assert get[1]["id"] == self.member.id

    def test_toggle_like_멤버_좋아요_없으면_생긴다(self):
        # when
        post = self.client.post(
            f"/api/search-result/member/toggle-like/{self.member.id}/"
        )

        # then
        assert post.status_code == 204
        assert MyIdolMember.objects.filter(user=self.user, member=self.member).exists()

    def test_toggle_like_그룹_좋아요_없으면_생긴다(self):
        # when
        post = self.client.post(
            f"/api/search-result/group/toggle-like/{self.group.id}/"
        )

        # then
        assert post.status_code == 204
        assert MyIdolGroup.objects.filter(user=self.user, group=self.group).exists()

    def test_toggle_like_멤버_좋아요_있으면_지운다(self):
        # given
        MyIdolMember.objects.create(user=self.user, member=self.member)

        # when
        post = self.client.post(
            f"/api/search-result/member/toggle-like/{self.member.id}/"
        )

        # then
        assert post.status_code == 204
        assert not MyIdolMember.objects.filter(
            user=self.user, member=self.member
        ).exists()

    def test_toggle_like_그룹_좋아요_있으면_지운다(self):
        # given
        MyIdolGroup.objects.create(user=self.user, group=self.group)

        # when
        post = self.client.post(
            f"/api/search-result/group/toggle-like/{self.group.id}/"
        )

        # then
        assert post.status_code == 204
        assert not MyIdolGroup.objects.filter(user=self.user, group=self.group).exists()

    def test_멤버_toggle_scrap_안했던거면_저장한다(self):
        # given
        url = "test.article.com"

        # when
        post = self.client.post(
            f"/api/search-result/member/toggle-scrap/{self.member.id}/",
            json.dumps({"url": url, "title": "test article"}),
            content_type="application/json",
        )

        # then
        assert post.status_code == 200
        assert json.loads(post.content)[-1] == url
        assert (
            ArticleMemberScrap.objects.filter(user=self.user, member=self.member)
            .last()
            .address
            == url
        )

    def test_그룹_toggle_scrap_안했던거면_저장한다(self):
        # given
        url = "test.article.com"

        # when
        post = self.client.post(
            f"/api/search-result/group/toggle-scrap/{self.group.id}/",
            json.dumps({"url": url, "title": "test article"}),
            content_type="application/json",
        )

        # then
        assert post.status_code == 200
        assert json.loads(post.content)[-1] == url
        assert (
            ArticleGroupScrap.objects.filter(user=self.user, group=self.group)
            .last()
            .address
            == url
        )

    def test_멤버_toggle_scrap_했던거면_지운다(self):
        # given
        url = "test.article.com"
        ArticleMemberScrap.objects.create(
            user=self.user, member=self.member, address=url, title="test"
        )

        # when
        post = self.client.post(
            f"/api/search-result/member/toggle-scrap/{self.member.id}/",
            json.dumps({"url": url, "title": "test"}),
            content_type="application/json",
        )

        # then
        assert post.status_code == 200
        assert json.loads(post.content) == []
        assert not ArticleMemberScrap.objects.filter(
            user=self.user, member=self.member, address=url
        ).exists()

    def test_그룹_toggle_scrap_했던거면_지운다(self):
        # given
        url = "this.is.test.com"
        ArticleGroupScrap.objects.create(
            user=self.user, group=self.group, address=url, title="test"
        )

        # when
        post = self.client.post(
            f"/api/search-result/group/toggle-scrap/{self.group.id}/",
            json.dumps({"url": url, "title": "test"}),
            content_type="application/json",
        )

        # then
        assert post.status_code == 200
        assert json.loads(post.content) == []
        assert not ArticleGroupScrap.objects.filter(
            user=self.user, group=self.group, address=url
        ).exists()

class IdolRequestTestCase(IdolTestCase):
    def test_아이돌_요청하면_요청인스턴스_생긴다(self):
        # when
        post = self.client.post(
            "/api/search-result/request-support/",
            json.dumps({"name": "test-idol"}),
            content_type="application/json"
        )

        # then
        assert post.status_code == 204
        assert IdolRequest.objects.count() == 1
        assert IdolRequest.objects.last().idol_name == "test-idol"


    def test_아이돌_15초내로_또요청하면_400준다(self):
        # given
        post_first = self.client.post(
            "/api/search-result/request-support/",
            json.dumps({"name": "test-idol"}),
            content_type="application/json"
        )


        # when
        post_again = self.client.post(
            "/api/search-result/request-support/",
            json.dumps({"name": "test-idol"}),
            content_type="application/json"
        )

        # then
        assert post_again.status_code == 400
        assert IdolRequest.objects.count() == 1

