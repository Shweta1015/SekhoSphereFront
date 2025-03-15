document.getElementById('resetForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;

    if (!email) {
        alert("Please enter your email");
        return;
    }

    alert(`Reset link sent to ${email}`);
});
