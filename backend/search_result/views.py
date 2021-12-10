import json
from datetime import timedelta
from django.contrib.auth.decorators import login_required
from django.utils.timezone import now
from django.views.decorators.http import require_http_methods
from django.forms.models import model_to_dict
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.http.response import JsonResponse
from django.db.models import Q
from main.models import SearchLog
from django.views.decorators.csrf import ensure_csrf_cookie

from .management.functions.crawl_all import crawl_all
from .models import (
    IdolMember,
    MemberComment,
    IdolGroupInfo,
    IdolMemberInfo,
    IdolGroup,
    IdolMemberIncluded,
)

LOGIN_PATH = "/"


@login_required(login_url=LOGIN_PATH)
@require_http_methods(["GET", "POST"])
def mmbrCmtGetPost(request, member_id):
    idolMbr = get_object_or_404(IdolMember, pk=member_id)

    if request.method == "POST":
        req_data = json.loads(request.body.decode())
        content = req_data["content"]
        mbrCmt = MemberComment(content=content, user=request.user, member=idolMbr)
        mbrCmt.save()
        return JsonResponse(model_to_dict(mbrCmt), safe=False)

    comments = list(MemberComment.objects.filter(member=idolMbr).values())
    return JsonResponse(comments, safe=False)


@login_required(login_url=LOGIN_PATH)
@require_http_methods(["PUT", "DELETE"])
def mmbrCmtPutDelete(request, comment_id):
    mbrCmt = get_object_or_404(MemberComment, pk=comment_id)

    if request.method == "PUT":
        req_data = json.loads(request.body.decode())
        content = req_data["content"]
        mbrCmt.content = content
        mbrCmt.save()
        return JsonResponse(model_to_dict(mbrCmt), safe=False)

    mbrCmt.delete()
    return HttpResponse(status=200)


@login_required(login_url=LOGIN_PATH)
@require_http_methods(["GET", "POST"])
def grpCmtGetPost():
    pass


@login_required(login_url=LOGIN_PATH)
@require_http_methods(["PUT", "DELETE"])
def grpCmtPutDelete():
    pass


@require_http_methods(["GET"])
def search_result(request, scope, instance_id):

    is_member = scope == "member"

    if is_member:
        instance = get_object_or_404(IdolMember, id=instance_id)
        info_instance = get_object_or_404(IdolMemberInfo, member_id=instance_id)
    else:
        instance = get_object_or_404(IdolGroup, id=instance_id)
        info_instance = get_object_or_404(IdolGroupInfo, group_id=instance_id)

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

        twitter_id = getattr(info_instance.source, "twitter", None)
        try:
            print(
                f"More than 3 days passed after last update.. crawling {name} starts.."
            )
            news, youtubes, twitter = crawl_all(name, twitter_id)
            info_instance.apply_updates(news, youtubes, twitter, save=True)
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
            "basicInfo": basicInfo,
            "tweets": tweets,
            "youtubes": youtubes,
            "comments": comments,
        },
        status=200,
    )

@require_http_methods((["GET"]))
@ensure_csrf_cookie
def search_by_keyword(request, keyword):
    group_instance = IdolGroup.objects.filter(Q(name__kor__icontains=keyword)|Q(name__eng__icontains=keyword))
    member_instance = IdolMember.objects.filter(Q(name__kor__icontains=keyword)|Q(name__eng__icontains=keyword))

    results = []
    for group in group_instance:
        group_info = get_object_or_404(IdolGroupInfo, group_id=group.id)
        results.append({'id': group.id, 'name': group.name, 'isGroup': True, 'thumbnail':group_info.info['youtubes'][0]['thumnail']})
    for member in member_instance:
        member_info = get_object_or_404(IdolMemberInfo, member_id=member.id)
        results.append({'id': member.id, 'name': member.name, 'isGroup': False, 'thumbnail':member_info.info['youtubes'][0]['thumnail']})
    
    # for result in results:
    #     print(result['id'], result['name'], result['isGroup']) 
    
    result = json.dumps(results)
    # print(json.dumps(results))

    return JsonResponse(results, status=200, safe=False)
