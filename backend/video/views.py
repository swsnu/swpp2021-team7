import json
import sys
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.http.response import JsonResponse

sys.path.append("C:/Users/iks15/university/2021fall/swpp/code/swpp2021-team7/ml")

import detectScene
import youtube


LOGIN_PATH = "/"


@login_required(login_url=LOGIN_PATH)
@require_http_methods(["POST"])
def getScnCut(request):
    req_data = json.loads(request.body.decode())
    videoUrl = req_data["videoUrl"]
    return JsonResponse(
        detectScene.find_scenes(youtube.linkToMp4(videoUrl, resoultion="low")),
        safe=False,
    )
