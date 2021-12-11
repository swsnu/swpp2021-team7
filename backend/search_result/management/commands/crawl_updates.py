from django.core.management import BaseCommand
from django.utils.timezone import now
from search_result.models import IdolMemberInfo, IdolGroupInfo
from search_result.management.functions.crawl_all import CrawlUtil

from search_result.models import IdolMemberIncluded


class Command(BaseCommand):
    def handle(self, *args, **options):
        member_qs = [
            self.update_member(member)
            for member in IdolMemberInfo.objects.filter(updated_at=None)
        ]
        group_qs = [
            self.update_group(group)
            for group in IdolGroupInfo.objects.filter(updated_at=None)
        ]
        IdolMemberInfo.objects.bulk_update(member_qs, ["info", "updated_at"])
        IdolGroupInfo.objects.bulk_update(group_qs, ["info", "updated_at"])

    def update_member(self, member_info_instance):
        member_name = member_info_instance.member.name["kor"]
        group_name = IdolMemberIncluded.objects.filter(
            member=member_info_instance.member
        )[0].group.name["kor"]
        name = group_name + " " + member_name
        print(f"first crawling updates of {name}(member)...")
        news, youtubes, tweets = CrawlUtil.crawl_all(name)
        member_info_instance.apply_updates(news, youtubes, tweets)
        return member_info_instance

    def update_group(self, group_info_instance):
        group_name = group_info_instance.group.name["kor"]
        print(f"first crawling updates of {group_name}(group)...")
        news, youtubes, tweets = CrawlUtil.crawl_all(group_name)
        group_info_instance.apply_updates(news, youtubes, tweets)
        return group_info_instance
