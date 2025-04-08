const API_KEY = "AIzaSyCzEYxOWd-I4QzHwODO3pbwIC7Q92YO2uc"; 
const PLAYLIST_ID = localStorage.getItem("selectedPlaylist");
const VIDEO_CONTAINER = document.getElementById("video-container");

async function fetchVideos() {
    if (!PLAYLIST_ID) {
        VIDEO_CONTAINER.innerHTML = "<p>No playlist selected!</p>";
        return;
    }

    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${PLAYLIST_ID}&key=${API_KEY}`
        );

        const data = await response.json();

        if (data.items) {
            displayVideos(data.items);
        } else {
            VIDEO_CONTAINER.innerHTML = "<p>No videos found in this playlist.</p>";
        }
    } catch (error) {
        console.error("Error fetching videos:", error);
    }
}

function displayVideos(videos) {
    VIDEO_CONTAINER.innerHTML = ""; 

    videos.forEach((video) => {
        const videoId = video.snippet.resourceId.videoId;
        const title = video.snippet.title;
        const thumbnail = video.snippet.thumbnails.high.url;

        const videoCard = `
            <div class="video-card">
                <img src="${thumbnail}" alt="${title}" onclick="playVideo('${videoId}')"/>
                <h3>${title}</h3>
            </div>
        `;

        VIDEO_CONTAINER.innerHTML += videoCard;
    });
}

function playVideo(videoId) {
    const player = document.getElementById("video-player");
    player.src = `https://www.youtube.com/embed/${videoId}`;
}

fetchVideos();
