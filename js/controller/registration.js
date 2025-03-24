document.getElementById("register").addEventListener('click',function (event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const birthday = document.getElementById("dateOfBirth").value;
    const email = document.getElementById("email").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const address = document.getElementById("address").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("REpassword").value;
    const role = "NEW_USER"

    if (!fullName || !birthday || !email || !password || !confirmPassword || !phoneNumber || !address){
        alert("All fields are required");
        return;
    }

    const user = {fullName , birthday , email , phoneNumber , address , password , role};

    fetch("http://localhost:8080/api/v1/User/registerUser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(data => {
            console.log("Response Data:", data);  // Debugging
            if (data.code === 201 || data.success) {  // Adjust based on API response
                alert("Registration successful!");
                window.location.href = "login.html";
            } else {
                alert(data.message || "Registration failed.");
            }
        })

})