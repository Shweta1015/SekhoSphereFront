document.getElementById("resetForm").addEventListener("submit", async function(event){
    event.preventDefault();

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const email = localStorage.getItem("otpEmail");  //Retrieve email stored during OTP verification

    //check if password match
    if (password !== confirmPassword){
        document.getElementById("error-message").textContent = "Passwords do not match!";
        return;
    }

    //Reset password API call
    const response = await fetch("http://localhost:8080/api/auth/reset-password",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email: email, newPassword: password})   // Send email and new password 
    });
    
    const result = await response.json();

    if (response.ok){
        Swal.fire("Success", "Password reset successfully!","success");
        window.location.href = "SignUpIn.html";
    }else{
        document.getElementById("error-message").textContent = result.message || "Failed to reset password.";   
    }
});