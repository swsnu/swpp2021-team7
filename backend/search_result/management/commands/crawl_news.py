import requests
from bs4 import BeautifulSoup
from django.core.management import BaseCommand
from search_result.models import IdolMemberInfo, IdolGroupInfo


class Command(BaseCommand):
    def add_arguments(self, parser):

        parser.add_argument(
            "--is_member",
            type=bool,
        )

        parser.add_argument(
            "--id",
            type=int,
        )

    def handle(self, *args, **kwargs):
        # 인스턴스 있는 경우에만 긁는 것
        is_member = kwargs["is_member"]
        id = kwargs["id"]

        instance = (
            IdolMemberInfo.objects.filter(member_id=id)
            if is_member
            else IdolGroupInfo.objects.filter(group_id=id)
        )
        if not len(instance):
            print("There is no member/group you look for. Teminating process..")
            return

        instance = instance[0]
        name_kor = instance.member.name["kor"]

        url = f"https://search.naver.com/search.naver?where=news&query={name_kor}"

        html = BeautifulSoup(
            requests.get(url).text,
            "html.parser",
        )

        top3 = html.select("a.news_tit")[:3]

        news_list = [{"title": news.text, "url": news["href"]} for news in top3]

        instance.info["news"] = news_list
        instance.save()
