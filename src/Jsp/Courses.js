const urlParams = new URLSearchParams(window.location.search);
const subject = urlParams.get("subject");
const level = urlParams.get("level"); // if you want to use it later

const formattedSubject = subject ? subject.replaceAll('_', ' ') : "Unknown Subject";
document.getElementById("playlist-title").innerText = `${formattedSubject} Playlists`;
console.log("subject =", subject);
console.log("level =", level);

// Only fetch if subject is valid
if (subject) {
  fetch(`/api/youtube/playlists?subject=${subject}`)
    .then(res => res.json())
    .then(data => {
      const items = data.items || [];
      const videosDiv = document.getElementById("videos");

      if (items.length === 0) {
        videosDiv.innerHTML = "<p>No playlists found.</p>";
        return;
      }

      items.forEach(item => {
        const title = item.snippet.title;
        const thumbnail = item.snippet.thumbnails.medium.url;
        const playlistId = item.id.playlistId;
        const link = `https://www.youtube.com/playlist?list=${playlistId}`;

        const card = `
          <div class="playlist-card">
            <a href="${link}" target="_blank">
              <img src="${thumbnail}" alt="${title}" />
              <p>${title}</p>
            </a>
          </div>
        `;
        videosDiv.innerHTML += card;
      });
    })
    .catch(err => {
      console.error("Error:", err);
      document.getElementById("videos").innerHTML = "<p>Failed to load playlists.</p>";
    });
} else {
  document.getElementById("videos").innerHTML = "<p>No subject selected. Please return and choose a subject.</p>";
}