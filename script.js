const axios = require('axios');
const mysql = require('mysql');

// Your YouTube Data API key
const apiKey = 'YOUR_API_KEY';

// MySQL database configuration
const dbConfig = {
  host: 'localhost',
  user: 'your_user',
  password: 'your_password',
  database: 'your_database',
};

// Function to fetch the latest video
async function fetchLatestVideo() {
  try {
    // Fetch the latest video from Linus Media Group's channel
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=UCXuqSBlHAE6Xw-yeJA0Tunw&part=snippet,id&order=date&maxResults=1`
    );

    const video = response.data.items[0];
    
    // Extract relevant video information
    const videoId = video.id.videoId;
    const videoTitle = video.snippet.title;
    const videoDescription = video.snippet.description;
    const publishedAt = video.snippet.publishedAt;

    // Create a MySQL database connection
    const connection = mysql.createConnection(dbConfig);

    // Insert the video data into the database
    connection.connect();

    const insertQuery = `
      INSERT INTO videos (video_id, title, description, published_at)
      VALUES (?, ?, ?, ?)
    `;

    const values = [videoId, videoTitle, videoDescription, publishedAt];

    connection.query(insertQuery, values, (error, results) => {
      if (error) {
        console.error('Error inserting video data:', error);
      } else {
        console.log(`Latest Video: ${videoTitle} (ID: ${videoId})`);
      }

      connection.end();
    });
  } catch (error) {
    console.error('Error fetching latest video:', error.message);
  }
}

// Call the function to fetch the latest video
fetchLatestVideo();
