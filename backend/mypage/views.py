from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.http.response import JsonResponse
from main.models import ArticleGroupScrap, ArticleMemberScrap, MemberComment, GroupComment, MyIdolMember, MyIdolGroup

LOGIN_PATH = "/"
TYPE = "type"
TYPE_MEMBER = 'member'
TYPE_GROUP = 'group'


@login_required(login_url=LOGIN_PATH)
@require_http_methods(["GET"])
def myCmtGet(request):
    mmbrCmt = [MemberComment.objects.filter(user=request.user).values()]
    grpCmt = [GroupComment.objects.filter(user=request.user).values()]
    for cmt in mmbrCmt:
        cmt[TYPE] = TYPE_MEMBER
        
    for cmt in grpCmt:
        cmt[TYPE] = TYPE_GROUP
        
    myComment = mmbrCmt + grpCmt
    return JsonResponse(myComment, safe=False)
    

@login_required(login_url=LOGIN_PATH)
@require_http_methods(["GET"])
def myIdolGet(request):
    myMmbr = [MyIdolMember.objects.filter(user=request.user)]
    myGrp = [MyIdolGroup.objects.filter(user=request.user)]
    for myIdol in myMmbr:
        myIdol[TYPE] = TYPE_MEMBER
        
    for myIdol in myGrp:
        myIdol[TYPE] = TYPE_GROUP
        
    myIdol = myMmbr + myGrp
    return JsonResponse(myIdol, safe=False)
    
    
@login_required(login_url=LOGIN_PATH)    
@require_http_methods(["GET"])
def myArtclGet(request):
    mmbrArtcl = [ArticleMemberScrap.objects.filter(user=request.user)]
    grpArtcl = [ArticleGroupScrap.objects.filter(user=request.user)]
    for artcle in mmbrArtcl:
        artcle[TYPE] = TYPE_MEMBER
        
    for artcle in grpArtcl:
        artcle[TYPE] = TYPE_GROUP
        
    myArticle = mmbrArtcl + grpArtcl
    return JsonResponse(myArticle, safe=False)


@login_required(login_url=LOGIN_PATH)
@require_http_methods(["DELETE"])
def mmbrArtcleDelete(request, article_id):
    myMmbrArtcl = get_object_or_404(ArticleMemberScrap, pk=article_id)
    myMmbrArtcl.delete()
    return HttpResponse(status=200)

@login_required(login_url=LOGIN_PATH)
@require_http_methods(["DELETE"])
def grpArtcleDelete(request, article_id):
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
