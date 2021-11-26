from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.http.response import JsonResponse
from search_result.models import MemberComment, GroupComment
from .models import ArticleGroupScrap, ArticleMemberScrap, MyIdolMember, MyIdolGroup

LOGIN_PATH = "/"
TYPE = "type"
TYPE_MEMBER = "member"
TYPE_GROUP = "group"


@login_required(login_url=LOGIN_PATH)
@require_http_methods(["GET"])
def my_cmt_get(request):
    mmbrCmt = list(
        MemberComment.objects.filter(user=request.user).values(
            "id", "content", "member", "member__name", "created_at"
        )
    )
    grpCmt = list(
        GroupComment.objects.filter(user=request.user).values(
            "id", "content", "group", "group__name", "created_at"
        )
    )
    for cmt in mmbrCmt:
        cmt["name"] = cmt.pop("member__name")
        cmt[TYPE] = TYPE_MEMBER

    for cmt in grpCmt:
        cmt["name"] = cmt.pop("group__name")
        cmt[TYPE] = TYPE_GROUP

    myComment = mmbrCmt + grpCmt
    return JsonResponse(myComment, safe=False)


@login_required(login_url=LOGIN_PATH)
@require_http_methods(["GET"])
def my_idol_get(request):
    myMmbr = list(
        MyIdolMember.objects.filter(user=request.user).values(
            "id", "member", "member__name"
        )
    )
    myGrp = list(
        MyIdolGroup.objects.filter(user=request.user).values(
            "id", "group", "group__name"
        )
    )
    for myIdol in myMmbr:
        myIdol["name"] = myIdol.pop("member__name")
        myIdol[TYPE] = TYPE_MEMBER

    for myIdol in myGrp:
        myIdol["name"] = myIdol.pop("group__name")
        myIdol[TYPE] = TYPE_GROUP

    myIdol = myMmbr + myGrp
    return JsonResponse(myIdol, safe=False)


@login_required(login_url=LOGIN_PATH)
@require_http_methods(["GET"])
def my_artcl_get(request):
    mmbrArtcl = list(
        ArticleMemberScrap.objects.filter(user=request.user).values(
            "id", "title", "address", "member__name"
        )
    )
    grpArtcl = list(
        ArticleGroupScrap.objects.filter(user=request.user).values(
            "id", "title", "address", "group__name"
        )
    )
    for artcle in mmbrArtcl:
        artcle["name"] = artcle.pop("member__name")
        artcle[TYPE] = TYPE_MEMBER

    for artcle in grpArtcl:
        artcle["name"] = artcle.pop("group__name")
        artcle[TYPE] = TYPE_GROUP

    myArticle = mmbrArtcl + grpArtcl
    return JsonResponse(myArticle, safe=False)


@login_required(login_url=LOGIN_PATH)
@require_http_methods(["DELETE"])
def mmbr_artcle_delete(request, article_id):
    myMmbrArtcl = get_object_or_404(ArticleMemberScrap, pk=article_id)
    myMmbrArtcl.delete()
    return HttpResponse(status=200)


@login_required(login_url=LOGIN_PATH)
@require_http_methods(["DELETE"])
def grp_artcle_delete(request, article_id):
    myGrpArtcl = get_object_or_404(ArticleGroupScrap, pk=article_id)
    myGrpArtcl.delete()
    return HttpResponse(status=200)


@login_required(login_url=LOGIN_PATH)
@require_http_methods(["DELETE"])
def mmbrIdolDelete(request, idol_id):
    myMmbrIdol = get_object_or_404(MyIdolMember, pk=idol_id)
    myMmbrIdol.delete()
    return HttpResponse(status=200)


@login_required(login_url=LOGIN_PATH)
@require_http_methods(["DELETE"])
def grpIdolDelete(request, idol_id):
    myGrpIdol = get_object_or_404(MyIdolGroup, pk=idol_id)
    myGrpIdol.delete()
    return HttpResponse(status=200)


# Create your views here.
