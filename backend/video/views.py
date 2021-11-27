import sys
import json
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse
from django.http.response import JsonResponse
from .models import (
    VideoFaceRecognition,
    VideoScene,
    VideoSceneShare,
    VideoFaceRecognitionShare,
)

sys.path.append("/Desktop/dev/swpp2021-team7/ml")
from ml import detectScene
from ml import youtube


LOGIN_PATH = "/"

TYPE_YOUTUBE = 100
TYPE_FILE = 200

TYPE_SCENE = 100
TYPE_FACE_RECOG = 200


@login_required(login_url=LOGIN_PATH)
@require_http_methods(["POST"])
def getScnCut(request):
    global TYPE_YOUTUBE, TYPE_FILE

    req_data = json.loads(request.body.decode())
    # video url / cut options / type
    # type : YOUTUBE / video files
    target = req_data["target"]
    options = req_data["option"]
    video_type = req_data["type"]
    # if type is not correct ( not youtube or file )
    if video_type not in [TYPE_YOUTUBE, TYPE_FILE]:
        return JsonResponse(
            status=400, data={"status": "false", "message": "type error"}
        )
    video_type = int(video_type)

    if video_type is TYPE_YOUTUBE:
        return JsonResponse(
            detectScene.find_scenes(youtube.linkToMp4(target.trim(), resoultion="low")),
            safe=False,
        )
    elif video_type is TYPE_FILE:
        return HttpResponse(status=200)
    else:
        return JsonResponse(
            status=404, data={"status": "false", "message": "type error"}
        )


@login_required(login_url=LOGIN_PATH)
@require_http_methods(["POST"])
def getFaceRecog(request):
    req_data = json.loads(request.body.decode())
    # face recognition by youtube url and idol data and options
    # video url / cut options / type
    # type : YOUTUBE / video files
    target = req_data["target"]
    options = req_data["option"]
    video_type = req_data["type"]
    # if type is not correct ( not youtube or file )
    if video_type not in [TYPE_YOUTUBE, TYPE_FILE]:
        return JsonResponse(
            status=400, data={"status": "false", "message": "type error"}
        )
    if video_type is TYPE_YOUTUBE:
        return HttpResponse(status=200)
    if video_type is TYPE_FILE:
        return HttpResponse(status=200)


@login_required(login_url=LOGIN_PATH)
@require_http_methods(["POST"])
def getReFaceRecog(request):
    return HttpResponse(status=200)


@login_required(login_url=LOGIN_PATH)
@require_http_methods(["POST"])
def postShare(request):

    req_data = json.loads(request.body.decode())
    # video result sharing
    # video result id
    result_id = int(req_data["result_id"])
    description = req_data["result_description"]
    video_type = int(req_data["result_type"])
    des = json.dumps({"description": description})
    # if type is not correct ( not youtube or file )
    if video_type not in [TYPE_SCENE, TYPE_FACE_RECOG]:
        return JsonResponse(
            status=400, data={"status": "false", "message": "type error"}
        )
    if video_type is TYPE_SCENE:
        ss = VideoSceneShare(result_id=result_id, description=des)
        ss.save()
    elif video_type is TYPE_FACE_RECOG:
        fr = VideoFaceRecognitionShare(result_id=result_id, description=des)
        fr.save()
    return HttpResponse(status=200)
