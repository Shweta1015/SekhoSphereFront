
// Function to show SweetAlert2 messages
function showAlert(icon, title, text) {
    Swal.fire({
        icon: icon,
        title: title,
        text: text
    });
}

document.getElementById("signup-form").addEventListener("submit", async function(event){
    event.preventDefault();

    // get the form data
    const formData = new FormData(event.target);
    const userData = {
        name: formData.get("uname"),
        email: formData.get("umail"),
        password: formData.get("upass"),
        phone: formData.get("unum")
    };

    // log the user data to ensure it is correct
    console.log("User Data:", userData);

    // validate form data before sending
    if (!userData.name || !userData.email || !userData.password || !userData.phone){
        alert("Please fill all the fields.");
        return;
    }

    try{
        // log the start of the fetch request
        console.log("Sending data to backend...");

        // send data to the back-end using fetch API
        const response = await fetch("http://localhost:8080/api/users/register",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        // log the response status
        console.log("Response status:", response.status);

        const result = await response.json();
        
        // log the result from the response
        console.log("Response result:", result);

        // check if registration was successful 
        if (response.ok){
            // Handle success (show confirmation message)
            showAlert('success', 'Account created successfully', 'success');
            document.getElementById("status").value = "success";

            // redirect to login page after signup
            setTimeout(() => {
                window.location.href = "signin.html";
            }, 2000);
        }else{
            // handle error
            showAlert('Error', result.message || "Something went wrong", 'error');
        }
    }catch (error){
        console.log("Error during sign-up: ", error);  // log the error
        showAlert('Error','Oops...', "Something went wrong", 'error');
    }
});
