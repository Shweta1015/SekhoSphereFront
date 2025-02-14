//SweetAlert function
function showAlert(icon, title, text){
    Swal.fire({
        icon: icon,
        title: title,
        text: text
    });
}

document.getElementById("Signin-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    //Get form data
    const formData = new FormData(event.target);
    const userData = {
        email: formData.get("umail"),
        password: formData.get("upass"),
    };

    if (!userData.email || !userData.password){
        showAlert('error','Error','Please fill all the fields');
        return;
    }

    try{
        //Send data to backend using fetch
        const response = await fetch("http://localhost:8080/api/users/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        //check response status before parsing
        if (!response.ok){
            let errorText;
            try{
                const errorData = await response.json();
                errorText = errorData.message;
            }catch{
                errorText = `HTTP error! Status: ${response.status}`;
            }
        
            throw new Error(errorText);
        }

        //Parse response
        const result = await response.json();
        console.log('Login Response: ',result);
        

        //Handle response
        showAlert('success', 'Success', 'Login successful!');
        localStorage.setItem('authToken', result.token);

        //redirect to index page after Login
        setTimeout(() => {
            window.location.href = "index.html";
        }, 2000);
        
    } catch (error){
        console.log("Error during sign-in: ",error);
        showAlert('error', 'Error', error.message ||'Something went wrong');
        
    }
});