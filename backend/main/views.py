from django.db.models.expressions import F
from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_http_methods
from django.db.models import Count
from search_result.models import IdolGroup, IdolMember
from .models import SearchLog


LOGIN_PATH = "/"
DEFAULT_PAGE_SIZE = 10


# @login_required(login_url=LOGIN_PATH)
@require_http_methods(["GET"])
def ranking_info_get(request):
    page = int(request.GET.get("page", 0))
    size = int(request.GET.get("size", DEFAULT_PAGE_SIZE))

    start_index = page * size
    last_index = (page + 1) * size
    last_page = 0
    search_logs = (
        SearchLog.objects.all()
        .values("query")
        .annotate(total=Count("query"), isMember=F("isMember"))
        .order_by("-total")
    )

    total_result_len = len(search_logs)
    last_index = min(last_index, total_result_len)

    last_page = int((total_result_len / size)) + 1

    searchLogs = search_logs[start_index:last_index]

    idol_infos = []
    for srchLog in searchLogs:
        model = None
        if srchLog["isMember"]:
            model = IdolMember
        else:
            model = IdolGroup

        idol_info = get_object_or_404(model, name=srchLog["query"])
        idol_infos.append(idol_info)

    return JsonResponse(
        {
            "lastPage": last_page,
            # "idolInfos" : indolInfos
        }
    )


# Create your views here.
