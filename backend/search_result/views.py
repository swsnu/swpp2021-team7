import json
from datetime import timedelta
from django.utils.timezone import now
from django.views.decorators.http import require_http_methods
from django.forms.models import model_to_dict
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.http.response import JsonResponse
from django.db.models import Q
from main.models import SearchLog

from .management.functions.crawl_all import crawl_all
from .models import (
    IdolMember,
    MemberComment,
    GroupComment,
    IdolGroupInfo,
    IdolMemberInfo,
    IdolGroup,
    IdolMemberIncluded,
)
from custom_util.login_required import login_required

from mypage.models import MyIdolMember, MyIdolGroup

LOGIN_PATH = "/"


@login_required
@require_http_methods(["GET", "POST"])
def idolCmtGetPost(request, scope, idol_id):
    if scope == "member":
        idol_model = IdolMember
        cmt_model = MemberComment
    else:
        idol_model = IdolGroup
        cmt_model = GroupComment

    idol = get_object_or_404(idol_model, pk=idol_id)

    if request.method == "POST":
        req_data = json.loads(request.body.decode())
        content = req_data["content"]
        idol_cmt = cmt_model(content=content, user=request.user, idol=idol)
        idol_cmt.save()
        return JsonResponse(model_to_dict(idol_cmt), safe=False)

    comments = list(
        cmt_model.objects.filter(idol=idol).values(
            "id",
            "content",
            "user__id",
            "user__last_name",
            "user__first_name",
            "idol__id",
            "created_at",
            "updated_at",
        )
    )
    for comment in comments:
        comment["author"] = comment.pop("user__last_name") + comment.pop(
            "user__first_name"
        )
        comment["created_at"] = comment.pop("created_at").date()
        comment["idol"] = comment.pop("idol__id")
        comment["isMine"] = True if request.user.id == comment["user__id"] else False
    return JsonResponse(comments, safe=False)


@login_required
@require_http_methods(["PUT", "DELETE"])
def idolCmtPutDelete(request, scope, comment_id):
    if scope == "member":
        cmt_model = MemberComment
    else:
        cmt_model = GroupComment

    mbrCmt = get_object_or_404(cmt_model, pk=comment_id)

    if request.method == "PUT":
        req_data = json.loads(request.body.decode())
        content = req_data["content"]
        mbrCmt.content = content
        mbrCmt.save()
        return JsonResponse(model_to_dict(mbrCmt), safe=False)

    mbrCmt.delete()
    return HttpResponse(status=200)


@require_http_methods(["GET"])
def search_result(request, scope, instance_id):

    user = request.user if not request.user.is_anonymous else None
    is_member = scope == "member"

    if is_member:
        instance = get_object_or_404(IdolMember, id=instance_id)
        info_instance = get_object_or_404(IdolMemberInfo, member_id=instance_id)
        liked = MyIdolMember.objects.filter(user=user, member=instance).exists()
    else:
        instance = get_object_or_404(IdolGroup, id=instance_id)
        info_instance = get_object_or_404(IdolGroupInfo, group_id=instance_id)
        liked = MyIdolGroup.objects.filter(user=user, group=instance).exists()

    # 검색로그 쌓기
    SearchLog.objects.create(
        query=instance.name["kor"],
        isMember=True if scope == "member" else False,
        user=(None if request.user.is_anonymous else request.user),
    )

    if now() - info_instance.updated_at > timedelta(days=3):
        name = instance.name["kor"]
        if is_member:
            group_name = IdolMemberIncluded.objects.filter(member=instance)[
                0
            ].group.name["kor"]
            name = group_name + " " + name

        try:
            print(
                f"More than 3 days passed after last update.. crawling {name} starts.."
            )
            news, youtubes, tweets = crawl_all(name)
            info_instance.apply_updates(news, youtubes, tweets, save=True)
            info_instance.refresh_from_db()
        except:
            print("an error occured while crawling")

    basicInfo = info_instance.to_basic_info()
    tweets = info_instance.info["tweets"] if "tweets" in info_instance.info else []
    youtubes = (
        info_instance.info["youtubes"] if "youtubes" in info_instance.info else []
    )

    if is_member:
        comments_qs = instance.membercomment_set.all()
    else:
        comments_qs = instance.groupcomment_set.all()

    comments = [comment.to_response_format() for comment in comments_qs]

    return JsonResponse(
        {
            "liked": liked,
            "basicInfo": basicInfo,
            "tweets": tweets,
            "youtubes": youtubes,
            "comments": comments,
        },
        status=200,
    )


@require_http_methods((["GET"]))
def search_by_keyword(request, keyword):
    group_instance = IdolGroup.objects.filter(
        Q(name__kor__icontains=keyword) | Q(name__eng__icontains=keyword)
    )
    member_instance = IdolMember.objects.filter(
        Q(name__kor__icontains=keyword) | Q(name__eng__icontains=keyword)
    )

    results = []
    for group in group_instance:
        group_info = get_object_or_404(IdolGroupInfo, group_id=group.id)
        results.append(
            {
                "id": group.id,
                "name": group.name,
                "isGroup": True,
                "thumbnail": group_info.thumbnail.address,
            }
        )
    for member in member_instance:
        member_info = get_object_or_404(IdolMemberInfo, member_id=member.id)
        results.append(
            {
                "id": member.id,
                "name": member.name,
                "isGroup": False,
                "thumbnail": member_info.thumbnail.address,
                "hasModel": member.hasModel,
            }
        )

    # for result in results:
    #     print(result['id'], result['name'], result['isGroup'])

    result = json.dumps(results)
    # print(json.dumps(results))

    return JsonResponse(results, status=200, safe=False)
