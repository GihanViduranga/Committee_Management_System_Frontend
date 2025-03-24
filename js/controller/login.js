/*
document.getElementById("LoginBtn").addEventListener('click', function (event){
    event.preventDefault();

    const username = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if(username === "" || password === ""){
        alert("Please enter both username and password.");
        return;
    }

    const user = {username , password};

    fetch("http://localhost:8080/api/v1/auth/authenticate", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(response => {
            if (response.code === 201 && response.data.token) {
            //let authToken = localStorage.getItem("authToken");
                const authToken = localStorage.getItem(`authToken`)
                fetch("http://localhost:8080/api/v1/admin/checkRole", {
                    method: "GET",
                    headers: {"Authorization": `Bearer ${authToken}`},
                     /!*headers: { "Authorization": `Bearer ${authToken}` },*!/
                })
                    .then(response => response.json())
                    .then(roleData => {
                        console.log(authToken);
                        if (roleData.role == "NEW_USER"){
                            window.location.href = "../../index.html";
                            console.log("role", roleData.role);
                        } else if (roleData.role == "ADMIN"){
                            window.location.href = "../../adminDashboard.html";
                            console.log("role", roleData.role);
                        } else if (roleData.role == "USER"){
                            window.location.href = "../../memberDashboard.html";
                            console.log("role", roleData.role);
                        } else {
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
                    })
            } else {
                console.error("Error fetching role:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Login failed. Please try again 1."
                });
            }
        })
        .catch(error => {
            console.error("Error fetching role:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Login failed. Please try again 2."
            });
        })
});
*/


/*console.log(authToken);
if (roleData.role == "NEW_USER"){
    window.location.href = "../../index.html";
    console.log("role", roleData.role);
} else if (roleData.role == "ADMIN"){
    window.location.href = "../../adminDashboard.html";
    console.log("role", roleData.role);
} else if (roleData.role == "USER"){
    window.location.href = "../../memberDashboard.html";
    console.log("role", roleData.role);
} else {
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
})
} else {
    console.error("Error fetching role:", error);
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login failed. Please try again 1."
    });
}
})
.catch(error => {
    console.error("Error fetching role:", error);
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login failed. Please try again 2."
    });
})*/

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
                                window.location.href = "adminDashboard.html";
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
});