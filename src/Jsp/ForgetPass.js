
document.getElementById("resetForm").addEventListener("submit", async function(event){
    event.preventDefault();

    const email = document.getElementById("email").value;
    const response = await fetch("http://localhost:8080/api/auth/send-otp",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"email": email})
    });
    const result = await response.json();

    if(response.ok){
        localStorage.setItem("otpEmail", email);
        Swal.fire("Success", "OTP sent successfully!", "success");
        window.location.href = "EnterOtp.html";   //Redirect to OTP input
    }else{
        Swal.fire("Error","Failed to send OTP. Please try again.", "error");
    }
});