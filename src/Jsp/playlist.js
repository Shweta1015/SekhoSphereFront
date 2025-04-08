const API_KEY = "AIzaSyCzEYxOWd-I4QzHwODO3pbwIC7Q92YO2uc"; 
const PLAYLIST_CONTAINER = document.getElementById("playlistGrid");

//Fetch playlists based on URL parameter (subject)
const urlParams = new URLSearchParams(window.location.search);
const subject = urlParams.get("subject") || "Mathematics";

document.getElementById("subject-title").textContent = `${subject} Playlists`;  // Default subject if not provided

// Function to fetch YouTube playlists based on subject
async function fetchPlaylists(subject) {
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&type=playlist&q=${encodeURIComponent(subject + " tutorial")}&maxResults=10&key=${API_KEY}`
        );

        const data = await response.json();

        if (data.items && data.items.length > 0) {
            // Filter only playlists that actually have a valid playlistId
            const validPlayLists = data.items.filter(item => item.id.playlistId);

            if (validPlayLists.length > 0){
                displayPlaylists(validPlayLists);
            }else{
                PLAYLIST_CONTAINER.innerHTML = "<p>No valid playlists found for this subject.</p>";
            }
        } else{
            PLAYLIST_CONTAINER.innerHTML = "<p>No playlists found for this subject.</p>";
        }   
    } catch (error) {
        console.error("Error fetching playlists:", error);
        PLAYLIST_CONTAINER.innerHTML = "<p>Error loading playlists. Try again later.</p>";
    }
}

// Function to display fetched playlists on the page
function displayPlaylists(playlists) {
    PLAYLIST_CONTAINER.innerHTML = ""; // Clear previous results

    playlists.forEach((playlist) => {
        const playlistId = playlist.id.playlistId;
        const title = playlist.snippet.title;
        const thumbnail = playlist.snippet.thumbnails.high.url;

        const card = `
        <div class="playlist-card">
            <img src="${thumbnail}" alt="${title}" />
            <h3>${title}</h3>
            <button onclick="selectPlaylist('${playlistId}')">Select Playlist</button>
        </div>
        `;

        PLAYLIST_CONTAINER.innerHTML += card;
    });
}

// Function to store selected playlist
function selectPlaylist(playlistId) {
    localStorage.setItem("selectedPlaylist", playlistId);
    window.location.href = "Players.html"; // Redirect to the video player page
}
 

fetchPlaylists(subject);
