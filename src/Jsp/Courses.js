const API_URL = "http://localhost:8080/api/courses";

//for menubar
document.addEventListener("DOMContentLoaded", function(){
    const menuIcon = document.querySelector(".nav__menu");
    const navLinks = document.querySelector(".nav__links");

    menuIcon.addEventListener("click", function(){
        navLinks.classList.toggle("show");
    });
});

async function fetchCourses() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const courses = await response.json();

        // Organize courses by category
        const categorizedCourses = categorizeCourses(courses);

        // Render courses dynamically
        renderCourses(categorizedCourses);
    } catch (error) {
        console.error("Error fetching courses:", error);
    }
}

// Function to categorize courses based on their category
function categorizeCourses(courses) {
    return courses.reduce((categories, course) => {
        if (!categories[course.category]) {
            categories[course.category] = [];
        }
        categories[course.category].push(course);
        return categories;
    }, {});
}

// Function to render courses dynamically in the frontend
function renderCourses(categorizedCourses) {
    const container = document.querySelector(".courses-container");
    container.innerHTML = `<h1>Available Courses</h1>`; // Reset container with header

    // Loop through each category and create sections
    for (const [category, courses] of Object.entries(categorizedCourses)) {
        const section = document.createElement("div");
        section.className = "course-section";
        section.innerHTML = `
            <h2>${category} Courses</h2>
            <div class="courses"></div>
        `;

        const coursesContainer = section.querySelector(".courses");

        // Add each course card to the section
        courses.forEach((course) => {
            const card = document.createElement("div");
            card.className = "course-card";
            card.innerHTML = `
                <h3>${course.name}</h3>
                <p>${course.description || "No description available."}</p>
                <button>Learn More</button>
            `;
            coursesContainer.appendChild(card);
        });

        container.appendChild(section);
    }
}

// redirect to plalist page on clicking enroll btn
document.querySelectorAll(".enroll-btn").forEach(button => {
    button.addEventListener("click", function() {
        const subject = this.closest(".card").querySelector("h3").innerText;
        window.location.href = `playlist.html?subject=${encodeURIComponent(subject)}`;
    });
});


// Fetch and render courses once the page is loaded
document.addEventListener("DOMContentLoaded", fetchCourses);
