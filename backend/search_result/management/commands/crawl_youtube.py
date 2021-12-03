from googleapiclient.discovery import build

youtube_url = "https://www.youtube.com/results?search_query=kpop{}"


def build_youtube_search():
    DEVELOPER_KEY = ""
    YOUTUBE_API_SERVICE_NAME = "youtube"
    YOUTUBE_API_VERSION = "v3"
    return build(
        YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=DEVELOPER_KEY
    )


def get_search_response(youtube, query):
    search_response = (
        youtube.search()
        .list(
            q=youtube_url.format(query),
            order="relevance",
            part="snippet",
            maxResults=10,
        )
        .execute()
    )
    return search_response


def info_to_dict(videoId, title, description, thumnail):
    result = {
        "videoId": videoId,
        "title": title,
        "description": description,
        "thumnail": thumnail,
    }
    return result


def get_video_info(search_response):
    result_json = []
    for item in search_response["items"]:
        if item["id"]["kind"] == "youtube#video":
            result_json.append(
                info_to_dict(
                    item["id"]["videoId"],
                    item["snippet"]["title"],
                    item["snippet"]["description"],
                    item["snippet"]["thumbnails"]["medium"]["url"],
                )
            )
    return result_json


def crawl_yotube(query):
    return get_video_info(get_search_response(build_youtube_search(), query))


if __name__ == "__main__":
    print("test crawl yotube")
    test_query = "레드벨벳"
    print(f"-----{test_query}의 결과-----")
    print(crawl_yotube(test_query))
