document.getElementById("register").addEventListener('click', function(event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const birthday = document.getElementById("dateOfBirth").value;
    const email = document.getElementById("email").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const address = document.getElementById("address").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("REpassword").value;
    const role = "NEW_USER";
    const imageFile = document.getElementById("image-upload").files[0];

    if (!fullName || !birthday || !email || !password || !confirmPassword || !phoneNumber || !address) {
        alert("All fields are required");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    // Create FormData object to handle file upload
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('birthday', birthday);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('address', address);
    formData.append('password', password);
    formData.append('role', role);

    if (imageFile) {
        formData.append('image', imageFile);
    }

    fetch("http://localhost:8080/api/v1/User/registerUser", {
        method: 'POST',
        body: formData
        // Don't set Content-Type header when using FormData,
        // the browser will set it automatically with the correct boundary
    })
        .then(response => response.json())
        .then(data => {
            console.log("Response Data:", data);
            if (data.code === 201 || data.success) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Registration successful!",
                    showConfirmButton: false,
                    timer: 1500
                });
                Swal.fire({
                    title: "Do you want to be a Member?",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Yes",
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        Swal.fire("Saved!", "", "success");
                        window.location.href = "memberDashboard.html";
                    } else if (result.isDenied) {
                        Swal.fire("Changes are saved but Not a Member", "", "info");
                        window.location.href = "login.html";
                    }
                });

            } else {
                alert(data.message || "Registration failed.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred during registration.");
        });
});


