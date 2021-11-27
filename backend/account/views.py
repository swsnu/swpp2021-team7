from json.decoder import JSONDecodeError
import json
from django.http import HttpResponse, HttpResponseNotAllowed
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http.response import HttpResponseBadRequest
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_http_methods


@ensure_csrf_cookie
def token(request):
    if request.method == "GET":
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(["GET"])


@require_http_methods(["POST"])
def signup(request):
    try:
        req_data = json.loads(request.body.decode())
        email = req_data["email"]
        password = req_data["password"]
        first_name = req_data["first_name"]
        last_name = req_data["last_name"]
    except (KeyError, JSONDecodeError):
        return HttpResponseBadRequest()

    User.objects.create_user(username=email, password=password, first_name=first_name, last_name=last_name)
    return HttpResponse(status=201)


@require_http_methods(["POST"])
def signin(request):
    req_data = json.loads(request.body.decode())
    email = req_data["email"]
    password = req_data["password"]
    user = authenticate(request, username=email, password=password)
    if user is not None:
        login(request, user)
        return HttpResponse(status=204)
    return HttpResponse(status=401)


@require_http_methods(['GET'])
def signout(request):
    if request.user.is_authenticated:
        logout(request)
        return HttpResponse(status=204)
    else:
        return HttpResponse('Unauthorized', status=401)

