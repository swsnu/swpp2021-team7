from json.decoder import JSONDecodeError
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.forms.models import model_to_dict
from django.http import HttpResponse, HttpResponseNotAllowed
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import response
from django.http.response import HttpResponseBadRequest, JsonResponse
from main.models import *
import json

LOGIN_PATH = "/"

@login_required(login_url=LOGIN_PATH)
@require_http_methods(["GET", "POST"])
def mmbrCmtGetPost(request, member_id):
    
    idolMbr = get_object_or_404(IdolMember, pk=member_id)
    
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        content = req_data['content']
        mbrCmt = MemberComment(content=content, user=request.user, memberId=idolMbr)
        mbrCmt.save()
        return JsonResponse(model_to_dict(mbrCmt), safe=False)
    else:
        comments = [comment for comment in MemberComment.objects.filter(memberId=idolMbr).values()]
        return JsonResponse(comments, safe=False)

@login_required(login_url=LOGIN_PATH)
@require_http_methods(["PUT", "DELETE"])
def mmbrCmtPutDelete(request, comment_id):
    
    mbrCmt = get_object_or_404(MemberComment, pk=comment_id)
    
    if request.method == 'PUT':
        req_data = json.loads(request.body.decode())
        content = req_data['content']
        mbrCmt.content = content
        mbrCmt.save()
        return JsonResponse(model_to_dict(mbrCmt), safe=False)
    else:
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
# Create your views here.
