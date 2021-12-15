import sys
import json
from django.views.decorators.http import require_http_methods
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from django.http.response import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie


from .models import (
    VideoFaceRecognition,
    VideoScene,
    VideoSceneShare,
    VideoFaceRecognitionShare,
)

from custom_util.login_required import login_required

from search_result.models import (
    IdolMember,
    MemberComment,
    GroupComment,
    IdolGroupInfo,
    IdolMemberInfo,
    IdolGroup,
    IdolMemberIncluded,
)

from ml.analyze.detectScene import detectScene
from ml.analyze.faceRecognition import faceRecognition
from ml.video.YoutubeVideo import YoutubeVideo


TYPE_YOUTUBE = 100
TYPE_FILE = 200

TYPE_SCENE = 100
TYPE_FACE_RECOG = 200

# SAVE_PATH = "/home/data/"
SAVE_PATH = "C:/Users/iks15/university/2021fall/swpp/data"


@ensure_csrf_cookie
@require_http_methods(["POST"])
def getScnCut(request):
    global TYPE_YOUTUBE, TYPE_FILE, SAVE_PATH, TYPE_SCENE, TYPE_FACE_RECOG

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
        yt = YoutubeVideo(target.strip(), save=SAVE_PATH)
        filename = yt.random_string(10)
        filePath = yt.save_video(filename)
        ds = detectScene(filePath)
        print(ds.find_scenes())
        return JsonResponse(
            ds.find_scenes(),
            safe=False,
        )
    elif video_type is TYPE_FILE:
        ds = detectScene(options["path"].strip())
        return JsonResponse(
            ds.find_scenes(),
            safe=False,
        )
    else:
        return JsonResponse(
            status=404, data={"status": "false", "message": "type error"}
        )


@ensure_csrf_cookie
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
    video_type = int(video_type)
    idols = options["idols"]
    if len(idols) == 0:
        return JsonResponse(
            status=400, data={"status": "false", "message": "idol error"}
        )
    idol_image = []
    for idol_id in idols:
        instance = get_object_or_404(IdolMember, id=idol_id)
        info_instance = get_object_or_404(IdolMemberInfo, member_id=idol_id)
        basicInfo = info_instance.to_basic_info()
        if basicInfo.thumbnail:
            idol_image.append(basicInfo.thumbnail.address)
    if len(idol_image) == 0:
        return JsonResponse(
            status=400, data={"status": "false", "message": "idol image error"}
        )
    if video_type is TYPE_YOUTUBE:
        yt = YoutubeVideo(target.strip(), save=SAVE_PATH)
        filename = yt.random_string(10)
        filePath = yt.save_video(filename)
        fr = faceRecognition(filePath, idol_image)
        return JsonResponse(
            fr.parse(),
            safe=False,
        )
    if video_type is TYPE_FILE:
        fr = faceRecognition(options.path.strip(), idol_image)
        return JsonResponse(
            fr.parse(),
            safe=False,
        )


@ensure_csrf_cookie
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
