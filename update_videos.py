import requests
import json
import os

API_KEY = os.getenv('YOUTUBE_API_KEY')
CHANNEL_ID = '@SmallishBeans'

def get_videos(api_key, channel_id):
    base_url = 'https://www.googleapis.com/youtube/v3/'
    url = f'{base_url}search?key={api_key}&channelId={channel_id}&part=snippet,id&order=date&maxResults=50'

    videos = []
    while True:
        response = requests.get(url).json()
        videos.extend(response['items'])
        if 'nextPageToken' in response:
            url = f'{base_url}search?key={api_key}&channelId={channel_id}&part=snippet,id&order=date&maxResults=50&pageToken={response["nextPageToken"]}'
        else:
            break

    return videos

videos = get_videos(API_KEY, CHANNEL_ID)

with open('videos.json', 'w') as f:
    json.dump(videos, f, indent=4)
