from .crawl_news import crawl_news
from .crawl_youtube import crawl_youtube
from .crawl_twitter import crawl_twitter_by_id, crawl_twitter_by_name


def crawl_all(name, twitter_id=None):
    news = crawl_news(name)
    youtubes = crawl_youtube(name)
    twitter = (
        crawl_twitter_by_id(twitter_id) if twitter_id else crawl_twitter_by_name(name)
    )

    return news, youtubes, twitter
