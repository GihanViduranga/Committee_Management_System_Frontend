/*
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

})*/

/*document.addEventListener('DOMContentLoaded', function() {
    // Image preview functionality
    document.getElementById('image-upload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                // Create a preview container if it doesn't exist
                let previewContainer = document.getElementById('image-preview-container');
                if (!previewContainer) {
                    previewContainer = document.createElement('div');
                    previewContainer.id = 'image-preview-container';
                    previewContainer.style.marginTop = '10px';
                    document.querySelector('label[for="image-upload"]').after(previewContainer);
                }

                previewContainer.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="${e.target.result}" alt="Preview" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover;">
                        <span>${file.name}</span>
                    </div>
                `;
            };
            reader.readAsDataURL(file);
        }
    });

    // Form submission handler
    document.getElementById('registrationForm').addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate form
        const fullName = document.getElementById('fullName').value;
        const dateOfBirth = document.getElementById('dateOfBirth').value;
        const email = document.getElementById('email').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const address = document.getElementById('address').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('REpassword').value;
        const imageFile = document.getElementById('image-upload').files[0];

        // Basic validation
        if (!fullName || !dateOfBirth || !email || !phoneNumber || !address || !password || !confirmPassword) {
            alert('All fields are required');
            return;
        }

        if (password.length < 8) {
            alert('Password must be at least 8 characters long');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // Create FormData object for the request
        const formData = new FormData();
        formData.append('fullName', fullName);
        formData.append('dateOfBirth', dateOfBirth);
        formData.append('email', email);
        formData.append('phoneNumber', phoneNumber);
        formData.append('address', address);
        formData.append('password', password);
        formData.append('role', 'NEW_USER');

        if (imageFile) {
            formData.append('image-upload', imageFile);
        }

        // Submit the form data to the server
        fetch('http://localhost:8080/api/v1/User/registerUser', {
            method: 'POST',
            body: formData
            // Don't set Content-Type header when using FormData
            // The browser will set it automatically with the correct boundary
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                if (data.code === 201 || data.success) {
                    alert('Registration successful!');
                    window.location.href = 'login.html'; // Redirect to login page
                } else {
                    alert(data.message || 'Registration failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Registration failed: ' + error.message);
            });
    });
});*/

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
                alert("Registration successful!");
                window.location.href = "login.html";
            } else {
                alert(data.message || "Registration failed.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred during registration.");
        });
});


