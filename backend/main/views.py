from django.db.models.expressions import F
from django.http.response import HttpResponseNotFound, JsonResponse
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_http_methods
from django.db.models import Count
from search_result.models import IdolGroup, IdolMember
from .models import SearchLog


LOGIN_PATH = "/"
DEFAULT_PAGE_SIZE = 10


@login_required(login_url=LOGIN_PATH)
@require_http_methods(["GET"])
def ranking_info_get(request):
    page = int(request.GET.get("page", 1)) - 1  # page는 1부터 시작한다
    size = int(request.GET.get("size", DEFAULT_PAGE_SIZE))

    start_index = page * size
    last_index = (page + 1) * size
    total_result_len = (
        SearchLog.objects.all().values("query").annotate(total=Count("query")).count()
    )
    searchLogs = (
        SearchLog.objects.all()
        .values("query")
        .annotate(total=Count("query"), isMember=F("isMember"))
        .order_by("-total")
    )

    lastIndex = min(last_index, total_result_len)

    last_page = min(
        int((total_result_len / size)) + (0 if total_result_len % size == 0 else 1),
        (int((page / size)) + 1) * 10,
    )

    searchLogs = searchLogs[start_index:lastIndex]

    idol_infos = []
    idol_type = None
    for srchLog in searchLogs:
        model = None
        if srchLog["isMember"]:
            idol_type = "member"
            model = IdolMember
        else:
            idol_type = "group"
            model = IdolGroup

        idol_info = model.objects.filter(
            name__kor=srchLog["query"]
        ) | model.objects.filter(name__eng=srchLog["query"])
        if not idol_info.exists():
            return HttpResponseNotFound()
        idol_info = idol_info.values(
            "id", "name", f"idol{idol_type}info__thumbnail__address"
        ).first()
        idol_info["address"] = idol_info.pop(f"idol{idol_type}info__thumbnail__address")
        idol_info["type"] = idol_type
        idol_infos.append(idol_info)

    return JsonResponse({"lastPage": last_page, "idolInfos": idol_infos})
