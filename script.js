document.addEventListener('DOMContentLoaded', function() {
    // Fetch all videos from the JSON file
    fetch('videos.json')
        .then(response => response.json())
        .then(data => {
            const videoList = document.getElementById('video-list');
            
            // Loop through each video and create HTML elements to display the video info
            data.forEach(video => {
                const videoItem = document.createElement('div');
                videoItem.className = 'video-item';
                
                videoItem.innerHTML = `
                    <h2>${video.title}</h2>
                    <p>${video.description}</p>
                    <p>Published on: ${new Date(video.published_at).toLocaleDateString()}</p>
                    <a href="https://www.youtube.com/watch?v=${video.video_id}" target="_blank">Watch on YouTube</a>
                `;
                
                videoList.appendChild(videoItem);
            });
        })
        .catch(error => {
            console.error('Error fetching videos:', error);
        });
});
