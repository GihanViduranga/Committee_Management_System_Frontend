function getUserToUpdate() {
    const token = localStorage.getItem("authToken");
    if (!token) {
        alert("You are not authenticated. Please log in.");
        window.location.href = "index.html";
        return;
    }

    let email;
    try {
        const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));
        email = payload.email || payload.sub;

        if (!email) throw new Error();
    } catch {
        alert("Authentication error. Please log in again.");
        window.location.href = "index.html";
        return;
    }

    $.ajax({
        url: `http://localhost:8080/api/v1/User/getUserByEmail/${email}`,
        type: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
        success: function (res) {
            const userData = res.data || res;
            if (!userData) return alert("Failed to load user data.");
            populateFormFields(userData);
        },
        error: function (xhr) {
            let errorMessage = "Failed to load user data";
            try {
                errorMessage += ": " + (JSON.parse(xhr.responseText).message || xhr.statusText);
            } catch {
                errorMessage += ": " + xhr.statusText;
            }
            alert(errorMessage);
        }
    });
}

function populateFormFields(userData) {
    $("#userId").val(userData.userId);
    $("#fullName").val(userData.fullName);
    $("#email").val(userData.email);
    $("#phoneNumber").val(userData.phoneNumber || '');
    $("#address").val(userData.address || '');
    $("#password").val('');
    if (userData.birthday) {
        const formatted = new Date(userData.birthday).toISOString().split('T')[0];
        $("#birthday").val(formatted);
    }

    if ($("#role").length) {
        $("#role").val(userData.role).prop('disabled', true);
    }

    if ($("#isActive").length) {
        $("#isActive").prop('checked', userData.isActive);
    }

    const imageUrl = userData.image
        ? (userData.image.startsWith("http") ? userData.image : `http://localhost:8080/${userData.image.replace(/\\/g, "/")}`)
        : "assets/img/default-profile.png";

    $("#imagePreview").attr('src', imageUrl);
    $("#imagePreviewContainer").css('display', 'block');
    $("#imagePreview").show();
}

function updateUser() {
    const token = localStorage.getItem("authToken");
    if (!token) {
        alert("You are not authenticated. Please log in.");
        window.location.href = "index.html";
        return;
    }

    const userData = {
        userId: $("#userId").val(),
        fullName: $("#fullName").val(),
        email: $("#email").val(),
        phoneNumber: $("#phoneNumber").val(),
        address: $("#address").val(),
        birthday: $("#birthday").val(),
        isActive: $("#isActive").val(true)
    };

    const password = $("#password").val();
    if (!userData.fullName || !userData.email) {
        alert("Full name and email are required.");
        return;
    }

    if (password && password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }

    if (password) {
        bcrypt.hash(password, 10, function (err, hashedPassword) {
            if (err) return alert("Password hashing error.");
            userData.password = hashedPassword;
            sendUpdateRequest(userData, token);
        });
    } else {
        sendUpdateRequest(userData, token);
    }
}

function sendUpdateRequest(userData, token) {
    $.ajax({
        url: "http://localhost:8080/api/v1/User/update",
        type: "PUT",
        data: JSON.stringify(userData),
        contentType: "application/json",
        headers: { 'Authorization': `Bearer ${token}` },
        success: function (res) {
            alert("User updated successfully!");
            if (userData.password && confirm("Password changed. Log in again?")) {
                localStorage.removeItem("authToken");
                window.location.href = "index.html";
            }
        },
        error: function (xhr) {
            alert("Failed to update user: " + (xhr.responseJSON?.message || xhr.statusText));
        }
    });
}

function setupImagePreview() {
    document.getElementById('image')?.addEventListener('change', function (e) {
        const file = e.target.files[0];
        const previewContainer = document.getElementById('imagePreviewContainer');
        const previewImage = document.getElementById('imagePreview');

        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                previewImage.src = event.target.result;
                previewContainer.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            previewContainer.style.display = 'none';
        }
    });
}

// ======================== Page Init ========================
$(document).ready(function () {
    getUserToUpdate();
    setupImagePreview();

    $("#updateBtn").click(function (e) {
        e.preventDefault();
        updateUser();
    });
});