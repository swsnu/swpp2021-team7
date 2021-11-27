from pytube import YouTube
import requests
import uuid
from file_handler import TransferManager
import file_transfer

_URL = "/var/www/html/resource/tmp/youtube/"
S3_NAME = "swpp-server"

def youtubeDownload(linkUrl, on_download_progress, on_download_complete, option={}):
    
    global _URL
    # youtube file download 
    # return : ( success, result data )

    r = requests.get(linkUrl.trim())
    if "Video unavailable" in r.text:
        return False, None
    video_id = str(uuid.uuid4())
    yt = YouTube(linkUrl,
        on_download_progress=on_download_progress,
        on_download_complete=download_complete(video_id,callback=on_download_complete))
    yt = yt.get('mp4', '720p')
    yt.download(_URL+video_id)

def download_completed(path="",callback=download_complete):
    # to S3 bucket
    transfer_manager = TransferManager(local_url=_URL, bucket_url=S3_NAME)
    is_valid = transfer_manager.collect_user_info()
    if not is_valid:
        download_complete(False)
        return
    
    transfer_manager.task(
        file_transfer.upload_with_high_threshold,
        file_transfer.download_with_high_threshold)
    
    download_complete(True)
    
