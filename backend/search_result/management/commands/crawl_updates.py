from django.core.management import BaseCommand
from django.utils.timezone import now
from search_result.models import IdolMemberInfo, IdolGroupInfo
from search_result.management.functions.crawl_all import crawl_all


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
        print(f"first crawling updates of {member_name}(member)...")
        news, youtubes, twitter = crawl_all(member_name)
        member_info_instance.info["news"] = news
        member_info_instance.info["youtubes"] = youtubes
        member_info_instance.info["twitter"] = twitter
        member_info_instance.updated_at = now()
        return member_info_instance

    def update_group(self, group_info_instance):
        group_name = group_info_instance.group.name["kor"]
        print(f"first crawling updates of {group_name}(group)...")
        twitter_id = getattr(group_info_instance.source, "twitter", None)
        news, youtubes, twitter = crawl_all(group_name, twitter_id)
        group_info_instance.info["news"] = news
        group_info_instance.info["youtubes"] = youtubes
        group_info_instance.info["twitter"] = twitter
        group_info_instance.updated_at = now()
        return group_info_instance
