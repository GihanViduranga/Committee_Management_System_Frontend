/*
document.getElementById("LoginBtn").addEventListener("click", function (event) {
    event.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (!email || !password) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please enter both email and password."
        });
        return;
    }

    let user = { email, password };

    fetch("http://localhost:8080/api/v1/auth/authenticate", {//user wa thama check karanna oni register ayawa newei
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(response => {
            if (response.code === 201 && response.data.token) {
                localStorage.setItem("authToken", response.data.token);

                fetch("http://localhost:8080/api/v1/admin/checkRole", {
                    method: "GET",
                    headers: { "Authorization": `Bearer ${response.data.token}` }
                })
                    .then(response => response.json())
                    .then(roleData => {
                        console.log("Role:", roleData.role);
                        switch (roleData.role) {
                            case "NEW_USER":
                                window.location.href = "index.html";
                                Swal.fire("Login Success....!");
                                break;
                            case "ADMIN":
                                window.location.href = "test3.html";
                                Swal.fire("Login Success....!");
                                break;
                            case "USER":
                                window.location.href = "memberDashboard.html";
                                Swal.fire("Login Success....!");
                                break;
                            default:
                                Swal.fire({
                                    icon: "error",
                                    title: "Oops...",
                                    text: "You are not allowed"
                                });
                        }
                    })
                    .catch(error => {
                        console.error("Error fetching role:", error);
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Failed to determine user role."
                        });
                    });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Login failed. Please try again."
                });
            }
        })
        .catch(error => {
            console.error("Login error:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Login failed. Please try again."
            });
        });
});*/
document.getElementById("LoginBtn").addEventListener("click", function (event) {
    event.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (!email || !password) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please enter both email and password."
        });
        return;
    }

    let user = { email, password };

    fetch("http://localhost:8080/api/v1/auth/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(response => {
            if (response.code === 201 && response.data.token) {
                // Check if user is active first
                if (response.data.isActive === false) { // Assuming the response includes isActive flag
                    Swal.fire({
                        icon: "error",
                        title: "Account Inactive",
                        text: "Your account is not active. Please contact support."
                    });
                    return;
                }

                localStorage.setItem("authToken", response.data.token);

                fetch("http://localhost:8080/api/v1/admin/checkRole", {
                    method: "GET",
                    headers: { "Authorization": `Bearer ${response.data.token}` }
                })
                    .then(response => response.json())
                    .then(roleData => {
                        console.log("Role:", roleData.role);

                        // Check if user is active (if not already checked)
                        if (roleData.isActive === false) { // Alternative check if the role endpoint returns isActive
                            Swal.fire({
                                icon: "error",
                                title: "Account Inactive",
                                text: "Your account is not active. Please contact support.",
                            }).then(() => {
                                localStorage.removeItem("authToken"); // Clear the token if account is inactive
                                window.location.href = "index.html"; // Redirect after alert is closed
                            });
                            return;
                        }

                        switch (roleData.role) {
                            case "NEW_USER":
                                window.location.href = "index.html";
                                Swal.fire("Login Success....!");
                                break;
                            case "ADMIN":
                                window.location.href = "adminDashboard.html";
                                Swal.fire("Login Success....!");
                                break;
                            case "MEMBER" || "ADMIN":
                                window.location.href = "memberDashboard.html";
                                Swal.fire("Login Success....!");
                                break;
                            default:
                                Swal.fire({
                                    icon: "error",
                                    title: "Oops...",
                                    text: "You are not allowed"
                                });
                        }
                    })
                    .catch(error => {
                        console.error("Error fetching role:", error);
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Failed to determine user role."
                        });
                    });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.message || "Login failed. Please try again."
                });
            }
        })
        .catch(error => {
            console.error("Login error:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Login failed. Please try again."
            });
        });
});
