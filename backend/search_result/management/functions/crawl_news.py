import requests
from bs4 import BeautifulSoup


def crawl_news(name):
    url = f"https://search.naver.com/search.naver?where=news&query={name}"

    html = BeautifulSoup(
        requests.get(url).text,
        "html.parser",
    )

    top3 = html.select("a.news_tit")[:3]
    news_list = [{"title": news.text, "url": news["href"]} for news in top3]
    return news_list
