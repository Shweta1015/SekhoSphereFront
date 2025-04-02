function showAlert(icon, title, text){
    Swal.fire({
        icon: icon,
        title: title,
        text: text
    });
}
document.addEventListener("DOMContentLoaded", function(){
    const inputs = document.querySelectorAll(".otp-container input");
    const continueButton = document.querySelector(".continue");

   //move focus logic
    inputs.forEach((input, index) => {
        input.addEventListener("input", (event) => {
            const value = event.target.value;

            //Allow only numbers(0-9)
            if(!/^[0-9]$/.test(value)){
                event.target.value = "";
                return;
            }

            //Move to the next input box if a number is entered
            if (value && index < inputs.length - 1){
                inputs[index + 1].focus();
            }
        });

        input.addEventListener("Keydown", (event) => {
            if (event.key === "Backspace"){
                if (!input.value && index > 0){
                    // Move to the previous input box when pressing backspace on an empty input
                    inputs[index - 1].focus();
                }
            }
        });
    });

    //Handle OTP verification on button click
    continueButton.addEventListener("click", function(){
        let enteredOtp = "";
        inputs.forEach(input => enteredOtp += input.value);

        if(enteredOtp.length != 6){
            Swal.fire("Error", "Please enter a 6-digit OTP.", "error");
            return;
        }

        const storedEmail = localStorage.getItem("otpEmail");
        if (!storedEmail){
            Swal.fire("Error", "No email found. Please request OTP again", "error");
            return;
        }

        //API call to verify OTP
        fetch("http://localhost:8080/api/auth/verify-otp",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: storedEmail, otp: enteredOtp})  
        })
        .then(response => response.json())
        .then(data => {
            if (data.success){
                Swal.fire("Success", "OTP Verified!", "success")
                .then(() => {
                    window.location.href = "ResetPass.html";   //Redirecting to ResetPass page
                });
            }else{
                Swal.fire("Error", "Invalid OTP. Please try again.", "error");
            }
        })
        .catch(error => {
            console.error("Error verifying OTP: ", error);
            Swal.fire("Error", "Something went wrong!", "error");
        });
    });
});