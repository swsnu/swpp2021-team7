from .crawl_news import crawl_news
from .crawl_youtube import crawl_youtube
from .crawl_twitter import crawl_twitter


def crawl_all(name):
    news = crawl_news(name)
    youtubes = crawl_youtube(name)
    tweets = crawl_twitter(name)

    return news, youtubes, tweets
