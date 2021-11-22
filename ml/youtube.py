import pafy


def linkToMp4(link, resoultion=None):
    video = pafy.new(link)
    videos = video.videostreams
    mp4Video = []

    for v in videos:
        if v.extension == "mp4":
            mp4Video.append(v)

    sortedMp4Video = sorted(
        mp4Video, key=lambda video: v.dimensions[0] * v.dimensions[1]
    )
    if resoultion == None:
        return sortedMp4Video[-1].url  # 가장 해상도가 좋은 비디오
    elif resoultion == "low":
        return sortedMp4Video[0].url  # 가장 해상도가 낮은 비디오
    elif resoultion == "mid":
        return sortedMp4Video[int(len(sortedMp4Video) / 2)].url
