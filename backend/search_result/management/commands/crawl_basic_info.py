import requests
from django.core.management import BaseCommand
from bs4 import BeautifulSoup

from search_result.models import (
    IdolMember,
    IdolMemberInfo,
    IdolMemberIncluded,
    IdolMemberImage,
    IdolGroup,
    IdolGroupInfo,
)
from main.models import ImageResource


class Command(BaseCommand):
    def handle(self, *args, **options):
        self.iterate()

    def iterate(self):
        to_crawl = ["레드벨벳", "방탄소년단"]
        for group in to_crawl:
            self.crawl_group(group)

    def crawl_group(self, group_kor):

        print(f"Crawling {group_kor}...")

        group_instance = IdolGroup.objects.filter(name__kor=group_kor)

        if len(group_instance):
            print("Already crawled group. Terminating process..")
            return

        url = f"https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query={group_kor}"

        html = BeautifulSoup(
            requests.get(url).text,
            "html.parser",
        )

        content_area = html.select_one("section._au_people_content_wrap")
        group_eng = content_area.select_one(
            "div.title_area div.sub_title span.txt"
        ).text

        name = {"kor": group_kor, "eng": group_eng}
        group_instance = IdolGroup.objects.create(name=name)

        info_nodes = content_area.select("dl.info div.info_group")
        info = {}
        source = {}

        member_urls = []
        for node in info_nodes:
            key = node.select_one("dt").text
            if key == "멤버":
                members = node.select("dd a")
                for member in members:
                    member_urls.append(
                        (
                            member.text,
                            "https://search.naver.com/search.naver" + member["href"],
                        )
                    )
                continue
            elif key == "사이트":
                sources = node.select("dd a")
                for s in sources:
                    source[s.text] = s["href"]
                break
            value = node.select("dd a")
            if len(value):
                value = [v.text for v in value]
                if key == "소속사":
                    value = value[0]
            else:
                value = node.select_one("dd").text

            info[key] = value

        thumbnail_address = html.select_one("div.detail_info img")["src"]

        image_resource_instance = ImageResource.objects.create(
            address=thumbnail_address
        )
        IdolGroupInfo.objects.create(
            group=group_instance,
            thumbnail=image_resource_instance,
            info=info,
            source=source,
        )

        for member in member_urls:
            self.crawl_member(member)

    def crawl_member(self, member_tuple):
        pass
