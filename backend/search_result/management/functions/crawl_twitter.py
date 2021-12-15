import requests

bearer_token = "AAAAAAAAAAAAAAAAAAAAAHomWwEAAAAAGlTtG%2B%2FWrYYgccADme%2FrgmhFEpI%3DE4oOhZaDJmrPwSPHF19AyZgTYkQeqydW0NMYs0uyau7BGq0szT"
search_url = "https://api.twitter.com/2/tweets/search/recent"


def bearer_oauth(r):
    r.headers["Authorization"] = f"Bearer {bearer_token}"
    r.headers["User-Agent"] = "v2RecentSearchPython"
    return r


def crawl_twitter(name):
    params = {
        "query": f"{name} has:images -is:retweet",
        "tweet.fields": "attachments,created_at",
        "expansions": "author_id,attachments.media_keys",
        "user.fields": "profile_image_url",
        "media.fields": "url",
        "max_results": 100,
    }

    response = requests.get(search_url, auth=bearer_oauth, params=params).json()

    tweets = [tweet for tweet in response["data"] if not is_seller(tweet)]
    if len(tweets) > 3:
        tweets = tweets[:3]
    elif len(tweets) == 0:
        tweets = response["data"][:3]

    users = response["includes"]["users"]
    attachments = response["includes"]["media"]

    final_tweets = [to_response_format(tweet, users, attachments) for tweet in tweets]
    return final_tweets


def is_seller(tweet):
    seller_words = ["양도", "팝니다", "분철", "판매", "포카", "거래", "급처"]
    for word in seller_words:
        if word in tweet["text"]:
            return True
    return False


def to_response_format(tweet, users, attachments):
    author_object = [user for user in users if user["id"] == tweet["author_id"]][0]
    author = author_object["name"]
    avatar = author_object["profile_image_url"]
    content = tweet["text"]
    created_at = tweet["created_at"]
    image = [
        attachment["url"] if "url" in attachment else ""
        for attachment in attachments
        if attachment["media_key"] == tweet["attachments"]["media_keys"][0]
    ][0]

    return {
        "author": author,
        "avatar": avatar,
        "content": content,
        "created_at": created_at,
        "image": image,
    }
