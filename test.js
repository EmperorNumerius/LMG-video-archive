const fs = require('fs');
const axios = require('axios');

// Your YouTube Data API key
const apiKey = 'AIzaSyBk0zofrYo8qdvKIR_WMyO1hnuRy7f3HqI';

// Path to the JSON file
const jsonFilePath = 'videos.json';

// Function to fetch the latest video from Linus Media Group's channel
async function fetchLatestVideo() {
    try {
        const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=UCXuqSBlHAE6Xw-yeJA0Tunw&part=snippet,id&order=date&maxResults=1`
        );

        const video = response.data.items[0];
        const videoData = {
            video_id: video.id.videoId,
            title: video.snippet.title,
            description: video.snippet.description,
            published_at: video.snippet.publishedAt
        };

        // Read current data from JSON file
        let jsonData = [];
        if (fs.existsSync(jsonFilePath)) {
            const fileData = fs.readFileSync(jsonFilePath, 'utf8');
            jsonData = JSON.parse(fileData);
        }

        // Add the latest video data to the array
        jsonData.push(videoData);

        // Write updated data back to the JSON file
        fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));

        console.log('Updated JSON file with latest video data.');
    } catch (error) {
        console.error('Error fetching latest video:', error.message);
    }
}

// Call the function to fetch the latest video
fetchLatestVideo();
