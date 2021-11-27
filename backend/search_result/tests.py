import json
from django.test import TestCase, Client
from .models import (
    IdolMember,
    IdolGroup,
    IdolGroupInfo,
    IdolMemberInfo,
    IdolMemberIncluded,
)


class IdolTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.group_name = {"kor": "테스트그룹", "eng": "Test Group"}
        cls.member_name = {"kor": "테스트멤버", "eng": "Test Member"}
        cls.group_debut = "2016.08.08"
        cls.member_birth = "1997.02.09"
        cls.group = IdolGroup.objects.create(name=cls.group_name)
        cls.group_info = IdolGroupInfo.objects.create(
            group=cls.group, info={"데뷔": cls.group_debut}
        )
        cls.member = IdolMember.objects.create(name=cls.member_name)
        cls.member_info = IdolMemberInfo.objects.create(
            member=cls.member, info={"출생": cls.member_birth}
        )
        cls.member_included = IdolMemberIncluded.objects.create(
            group=cls.group, member=cls.member
        )
        cls.client = Client()


class SearchResultTestCase(IdolTestCase):
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
        print(basic_info)
        assert get.status_code == 200
        assert basic_info["name"] == self.member_name
        assert basic_info["birth"] == self.member_birth
        assert basic_info["groups"][0]["id"] == self.group.id

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
