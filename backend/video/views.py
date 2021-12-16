import json
from django.views.decorators.http import require_http_methods
from django.shortcuts import get_object_or_404
from django.http.response import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
import os
from search_result.models import (
    IdolMember,
    IdolMemberInfo,
)
from ml.analyze.detectScene import detectScene
from ml.analyze.faceRecognition import faceRecognition
from ml.video.YoutubeVideo import YoutubeVideo


TYPE_YOUTUBE = 100
TYPE_FILE = 200

TYPE_SCENE = 100
TYPE_FACE_RECOG = 200

SAVE_PATH = "/home/data/"


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
        if not filePath:
            return JsonResponse(
                status=404, data={"status": "false", "message": "can't save the file"}
            )
        ds = detectScene(filePath)
        results = ds.find_scenes()
        if os.path.exists(filePath):
            os.remove(filePath)
        return JsonResponse(
            results,
            safe=False,
        )
    elif video_type is TYPE_FILE:
        ds = detectScene(options["path"].strip())
        results = ds.find_scenes()
        if os.path.exists(options["path"].strip()):
            os.remove(options["path"].strip())
        return JsonResponse(
            results,
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
    idols = options["idol"]
    if len(idols) == 0:
        return JsonResponse(
            status=400, data={"status": "false", "message": "idol error"}
        )
    idol_image = []
    for idol_id in idols:
        instance = get_object_or_404(IdolMember, id=idol_id)
        info_instance = get_object_or_404(IdolMemberInfo, member_id=idol_id)
        basicInfo = info_instance.to_basic_info()

        if basicInfo["thumbnail"]:
            idol_image.append(basicInfo["thumbnail"])
    if len(idol_image) == 0:
        return JsonResponse(
            status=400, data={"status": "false", "message": "idol image error"}
        )
    if video_type is TYPE_YOUTUBE:
        yt = YoutubeVideo(target.strip(), save=SAVE_PATH)
        filename = yt.random_string(10)
        filePath = yt.save_video(filename)
        if not filePath:
            return JsonResponse(
                status=404, data={"status": "false", "message": "can't save the file"}
            )
        fr = faceRecognition(filePath, idol_image)
        results = fr.parse()
        if os.path.exists(filePath):
            os.remove(filePath)
        return JsonResponse(
            results,
            safe=False,
        )
    if video_type is TYPE_FILE:
        fr = faceRecognition(options.path.strip(), idol_image)
        results = fr.parse()
        if os.path.exists(options.path.strip()):
            os.remove(options.path.strip())
        return JsonResponse(
            results,
            safe=False,
        )
