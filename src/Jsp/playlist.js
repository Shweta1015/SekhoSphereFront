const SECTION_SUBJECT_PLAYLISTS = {
    SSC: {
      Mathematics: [
        {
          id: "PL2V9FVP1vHxqB9jG5ALriXntbeulw7vbZ",
          title: "SSC Mathematics - Full Course",
          thumbnail:
            "https://i.ytimg.com/vi/a-AXEdvCjYc/hqdefault.jpg?sqp=-oaymwEmCKgBEF5IWvKriqkDGQgBFQAAiEIYAdgBAeIBCggYEAIYBjgBQAE=&rs=AOn4CLDFW6jpZ5QSL-nv3vbJO4cdlQ3QKQ"
        }
      ],
      Physics: [
        {
          id: "PLVLoWQFkZbhWKEdwnxAMWbVWE16zqNWAv",
          title: "SSC Physics Explained",
          thumbnail:
            "https://i.ytimg.com/vi/a-AXEdvCjYc/hqdefault.jpg"
        }
      ],
      Chemistry: [
        {
          id: "PL2V9FVP1vHxoPmrQe1J_f7LsY8xF59EKZ",
          title: "SSC Chemistry Revision",
          thumbnail:
            "https://i.ytimg.com/vi/FzU86qMAzdI/hqdefault.jpg"
        }
      ],
      Biology: [
        {
          id: "PLfP3JxW-T70EtxF1iYRsLkJOxjQoDxuQp",
          title: "Biology | Full Chapter Series",
          thumbnail:
            "https://i.ytimg.com/vi/6sEEMNzrGJY/hqdefault.jpg"
        }
      ]
    },
    HSC: {
      Mathematics: [
        {
          id: "PL9RcWoqXmzaJ95_Q8lT9sksykc_cgGtyQ",
          title: "HSC Maths Crash Course",
          thumbnail:
            "https://i.ytimg.com/vi/BJzIoFgk1YU/hqdefault.jpg"
        }
      ],
      Physics: [
        {
          id: "PLgzsL8LxA0zV-m9XWgih-6HgEKwJruC7d",
          title: "HSC Physics Lectures",
          thumbnail:
            "https://i.ytimg.com/vi/i0CcfHh_XTo/hqdefault.jpg"
        }
      ],
      Chemistry: [
        {
          id: "PLgzsL8LxA0zV9AL9WbR-H3UhVSM_G1gAV",
          title: "HSC Chemistry Explained",
          thumbnail:
            "https://i.ytimg.com/vi/ZqFrWVr9DUE/hqdefault.jpg"
        }
      ],
      Biology: [
        {
          id: "PL5Ygq9LBBdUYN2xMGtO7_MjkPBaaSflXB",
          title: "HSC Biology Full Series",
          thumbnail:
            "https://i.ytimg.com/vi/7ZLQDx4R3Ww/hqdefault.jpg"
        }
      ]
    },
    Technical: {
      Web_Development: [
        {
          id: "PLillGF-RfqbZ2ybcoD2OaabW2P7Ws8CWu",
          title: "Web Development Bootcamp",
          thumbnail:
            "https://i.ytimg.com/vi/pQN-pnXPaVg/hqdefault.jpg"
        }
      ],
      Data_Science: [
        {
          id: "PLKnIA16_RmvbV1wGdN2pVjE6ZnqUqF3L0",
          title: "Data Science with Python",
          thumbnail:
            "https://i.ytimg.com/vi/ua-CiDNNj30/hqdefault.jpg"
        }
      ],
      Cyber_Security: [
        {
          id: "PLTjRvDozrdlxEIuOBZkMAK5uiqp8rHUax",
          title: "Ethical Hacking 101",
          thumbnail:
            "https://i.ytimg.com/vi/3Kq1MIfTWCE/hqdefault.jpg"
        }
      ],
      Artificial_Intelligence: [
        {
          id: "PLzvRQMJ9HDiTnN3NvtnjT3KjF0wZlF1xA",
          title: "Intro to AI",
          thumbnail:
            "https://i.ytimg.com/vi/8ZKZKMXYn3U/hqdefault.jpg"
        }
      ],
      Mobile_App_Development: [
        {
          id: "PLlxmoA0rQ-LwfW2rVhXBAq3zDpD7OWpRR",
          title: "Android App Dev for Beginners",
          thumbnail:
            "https://i.ytimg.com/vi/fis26HvvDII/hqdefault.jpg"
        }
      ],
      UI_UX_Design: [
        {
          id: "PLgYiyoyNPrv_wGQdMwQrwSVQVJd0ZGWfP",
          title: "UI/UX Design Principles",
          thumbnail:
            "https://i.ytimg.com/vi/Ovj4hFxko7c/hqdefault.jpg"
        }
      ]
    }
  };
  
const API_KEY = "AIzaSyCzEYxOWd-I4QzHwODO3pbwIC7Q92YO2uc"; 
const PLAYLIST_CONTAINER = document.getElementById("playlistGrid");

// Get section and subject from URL
const urlParams = new URLSearchParams(window.location.search);
const level = decodeURIComponent(urlParams.get("level") || "SSC");
const subject = decodeURIComponent(urlParams.get("subject") || "Mathematics");

document.getElementById("subject-title").textContent = `${level} - ${subject} Playlists`;

// ✅ FIXED: Make sure both `section` and `subject` are passed
console.log("Level:", level);
console.log("Subject:", subject);
console.log("Available sections:", Object.keys(SECTION_SUBJECT_PLAYLISTS));
console.log("Available subjects in section:", Object.keys(SECTION_SUBJECT_PLAYLISTS[level] || {}));
console.log("Matching playlists:", SECTION_SUBJECT_PLAYLISTS[level]?.[subject]);

fetchPlaylists(level, subject);

// Fetch curated playlists based on section & subject
async function fetchPlaylists(section, subject) {
    const playlists = SECTION_SUBJECT_PLAYLISTS[section]?.[subject];
    if (playlists && playlists.length > 0){
        displayPlaylists(playlists);
    } else {
        PLAYLIST_CONTAINER.innerHTML = "<p>No curated playlists for this subject.</p>";
    }
}

// Display the playlists
function displayPlaylists(playlists) {
    PLAYLIST_CONTAINER.innerHTML = "";

    playlists.forEach((playlist) => {
        const card = `
        <div class="playlist-card">
            <img src="${playlist.thumbnail}" alt="${playlist.title}" />
            <h3>${playlist.title}</h3>
            <button onclick="selectPlaylist('${playlist.id}')">Select Playlist</button>
        </div>
        `;
        PLAYLIST_CONTAINER.innerHTML += card;
    });
}

// Store selected playlist and redirect
function selectPlaylist(playlistId) {
    localStorage.setItem("selectedPlaylist", playlistId);
    window.location.href = "Players.html";
}
