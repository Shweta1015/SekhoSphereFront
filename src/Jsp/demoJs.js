const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
})

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
})

// Function to show SweetAlert2 messages
function showAlert(icon, title, text) {
    Swal.fire({
        icon: icon,
        title: title,
        text: text
    });
}

// Event listener for Login Form
document.querySelector("login-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.target);
    const userData = {
        email: formData.get("umail"),
        password: formData.get("upass"),
    };

    if (!userData.email || !userData.password) {
        showAlert('error', 'Error', 'Please fill all the fields');
        return;
    }

    try {
        // Send login request to backend
        const response = await fetch("http://localhost:8080/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Login Response:', result);

        // Store authentication token in local storage
        localStorage.setItem('authToken', result.token);

        showAlert('success', 'Success', 'Login successful!');

        // Redirect to homepage
        setTimeout(() => {
            window.location.href = "index.html";
        }, 2000);
    } catch (error) {
        console.error("Error during login:", error);
        showAlert('error', 'Error', error.message || 'Something went wrong');
    }
});

// Event listener for Signup Form
document.querySelector(".register form").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.target);
    const userData = {
        name: formData.get("nameRegister"),
        email: formData.get("emailRegister"),
        password: formData.get("passRegister"),
    };

    if (!userData.name || !userData.email || !userData.password) {
        showAlert('error', 'Error', 'Please fill all the fields');
        return;
    }

    try {
        // Send signup request to backend
        const response = await fetch("http://localhost:8080/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        const result = await response.json();
        console.log("Signup Response:", result);

        if (response.ok) {
            showAlert('success', 'Success', 'Account created successfully!');

            // Redirect to login form
            setTimeout(() => {
                document.querySelector(".toggle-box .login-btn").click();
            }, 2000);
        } else {
            throw new Error(result.message || "Something went wrong");
        }
    } catch (error) {
        console.error("Error during signup:", error);
        showAlert('error', 'Error', error.message || 'Something went wrong');
    }
});

