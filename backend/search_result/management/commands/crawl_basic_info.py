import requests
from django.core.management import BaseCommand
from bs4 import BeautifulSoup
from search_result.management.commands import crawl_youtube
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
    def add_arguments(self, parser):

        # Named (optional) arguments
        parser.add_argument(
            "--name",
            type=str,
            help="crawl about group name",
        )

    def handle(self, *args, **options):
        if not options["name"]:
            self.iterate()
        else:
            self.crawl_group(options["name"])

    def iterate(self):
        to_crawl = ["레드벨벳", "방탄소년단", "비투비"]
        for group in to_crawl:
            self.crawl_group(group)

    @staticmethod
    def fetch_and_set(url):
        html = BeautifulSoup(
            requests.get(url).text,
            "html.parser",
        )

        content_area = html.select_one("section._au_people_content_wrap")
        name_eng = content_area.select_one("div.title_area div.sub_title span.txt").text

        if "가수" in name_eng:
            name_eng = ""

        info_nodes = content_area.select("dl.info div.info_group")
        if len(content_area.select("div.detail_info img")):
            thumbnail_address = content_area.select_one("div.detail_info img")["src"]
        else:
            thumbnail_address = content_area.select_one("div.img_scroll div.thumb img")[
                "src"
            ]

        return name_eng, info_nodes, thumbnail_address

    def crawl_group(self, group_kor):

        print(f"Crawling {group_kor}...")

        # crawl_youtube 로직 추가
        youtube_info = crawl_youtube.crawl_yotube(group_kor)

        group_instance = IdolGroup.objects.filter(name__kor=group_kor)

        url = f"https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query={group_kor}"

        group_eng, info_nodes, thumbnail_address = self.fetch_and_set(url)

        name = {"kor": group_kor, "eng": group_eng}

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

        # crawl_youtube 로직 추가
        info["youtubes"] = youtube_info

        if len(group_instance) == 0:
            group_instance = IdolGroup.objects.create(name=name)
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
                self.crawl_member(group_instance.id, member)

        else:
            group_info = IdolGroupInfo.objects.get(group=group_instance[0])
            group_info.info["youtubes"] = youtube_info
            group_info.save()
            for member in member_urls:
                self.crawl_member(group_instance[0].id, member)

    def crawl_member(self, group_id, member_tuple):

        member_kor, url = member_tuple
        print(f"Crawling {member_kor}(member)...")

        # crawl_youtube 로직 추가
        youtube_info = crawl_youtube.crawl_yotube(member_kor)

        member_eng, info_nodes, thumbnail_address = self.fetch_and_set(url)

        instance_exists = (
            IdolMemberIncluded.objects.filter(group__id=group_id)
            .filter(member__name__kor=member_kor)
            .exists()
        )

        if instance_exists:
            member_info = IdolMemberInfo.objects.filter(member__name__kor=member_kor)[0]
            member_info.info["youtubes"] = youtube_info
            member_info.save()
            print("Already crawled member. Terminating process..")
            return

        name = {"kor": member_kor, "eng": member_eng}
        member_instance = IdolMember.objects.create(name=name)

        IdolMemberIncluded.objects.create(group_id=group_id, member=member_instance)

        source = {}
        info = {}

        for node in info_nodes:
            key = node.select_one("dt").text
            if key == "출생":
                birth = node.select_one("dd").text
                info[key] = birth
            elif key == "사이트":
                sources = node.select("dd a")
                for s in sources:
                    source[s.text] = s["href"]
                break
            else:
                continue

        image_resource_instance = ImageResource.objects.create(
            address=thumbnail_address
        )

        info["youtubes"] = youtube_info
        IdolMemberInfo.objects.create(
            member=member_instance,
            thumbnail=image_resource_instance,
            info=info,
            source=source,
        )
