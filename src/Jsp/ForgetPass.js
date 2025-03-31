// document.getElementById('resetForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const email = document.getElementById('email').value;

//     if (!email) {
//         alert("Please enter your email");
//         return;
//     }

//     alert(`Reset link sent to ${email}`);
// });
document.getElementById("resetForm").addEventListener("submit", async function(event){
    event.preventDefault();

    const email = document.getElementById("email").value;
    const response = await fetch("http://localhost:8080/api/auth/send-otp",{
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({"email": email})
    });
    const result = await response.json();

    if(response.ok){
        alert("OTP sent successfully! Redirecting to Enter OTP page..");
        window.location.href = "EnterOtp.html";   //Redirect to OTP input
    }else{
        alert("Failed to send OTP. Please try again.");
    }
});