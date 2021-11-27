import json
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.forms.models import model_to_dict
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.http.response import JsonResponse
from .models import IdolMember, MemberComment, IdolGroupInfo, IdolMemberInfo, IdolGroup

LOGIN_PATH = "/"


@login_required(login_url=LOGIN_PATH)
@require_http_methods(["GET", "POST"])
def mmbrCmtGetPost(request, member_id):
    idolMbr = get_object_or_404(IdolMember, pk=member_id)

    if request.method == "POST":
        req_data = json.loads(request.body.decode())
        content = req_data["content"]
        mbrCmt = MemberComment(content=content, user=request.user, memberId=idolMbr)
        mbrCmt.save()
        return JsonResponse(model_to_dict(mbrCmt), safe=False)

    comments = [MemberComment.objects.filter(memberId=idolMbr).values()]
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

    if scope == "member":
        instance = get_object_or_404(IdolMember, id=instance_id)
        info_instance = get_object_or_404(IdolMemberInfo, member_id=instance_id)
    else:
        instance = get_object_or_404(IdolGroup, id=instance_id)
        info_instance = get_object_or_404(IdolGroupInfo, group_id=instance_id)

    basicInfo = info_instance.to_basic_info()
    tweets = info_instance.info["tweets"] if "tweets" in info_instance.info else []
    youtubes = (
        info_instance.info["youtubes"] if "youtubes" in info_instance.info else []
    )

    if scope == "member":
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
