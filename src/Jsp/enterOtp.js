document.addEventListener("DOMContentLoaded", function(){
    const inputs = document.querySelectorAll(".otp-container input");

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
});