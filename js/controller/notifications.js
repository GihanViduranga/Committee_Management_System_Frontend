const token = localStorage.getItem("authToken");

$(document).ready(function () {
    $.ajax({
        url: "http://localhost:8080/api/v1/member/memberCount",
        method: "GET",
        cache: false,
        headers: { 'Authorization': `Bearer ${token}` },
        success: function (response) {
            if (response && response.data !== undefined) {
                $("#memberCount").text(response.data);
            } else {
                console.error("Unexpected response format:", response);
                $("#memberCount").text("Error");
            }
        },
        error: function (xhr, status, error) {
            console.error("Error fetching member count. Status:", xhr.status);
            console.error("Error details:", error);
            console.error("Response text:", xhr.responseText);
            $("#memberCount").text("Error");

            // Handle specific error codes
            if (xhr.status === 403) {
                console.log("Authentication issue - check if you need to include auth headers");
            }
        }
    });

    $.ajax({
        url: "http://localhost:8080/api/v1/meeting/getMeetingCount",
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token // Token eka header eke pass karanawa
        },
        success: function (response) {
            if (response && response.data !== undefined) {
                $("#meetingCount").text(response.data);
            } else {
                console.error("Unexpected response format:", response);
                $("#meetingCount").text("Error");
            }
        },
        error: function (xhr, status, error) {
            console.error("Error fetching member count. Status:", xhr.status);
            console.error("Error details:", error);
            console.error("Response text:", xhr.responseText);
            $("#meetingCount").text("Error");

            // Handle specific error codes
            if (xhr.status === 403) {
                console.log("Authentication issue - check if you need to include auth headers");
            }
        }
    });


    $.ajax({
        url: "http://localhost:8080/api/v1/User/userCount",
        method: "GET",
        cache: false,
        headers: { 'Authorization': `Bearer ${token}` },
        success: function (response) {
            if (response && response.data !== undefined) {
                $("#userCount").text(response.data);
            } else {
                console.error("Unexpected response format:", response);
                $("#userCount").text("Error");
            }
        },
        error: function (xhr, status, error) {
            console.error("Error fetching member count. Status:", xhr.status);
            console.error("Error details:", error);
            console.error("Response text:", xhr.responseText);
            $("#userCount").text("Error");

            // Handle specific error codes
            if (xhr.status === 403) {
                console.log("Authentication issue - check if you need to include auth headers");
            }
        }
    });

    $.ajax({
        url: "http://localhost:8080/api/v1/User/activeUserCount",
        method: "GET",
        cache: false,
        headers: { 'Authorization': `Bearer ${token}` },
        success: function (response) {
            if (response && response.data !== undefined) {
                $("#userActiveCount").text(response.data);
            } else {
                console.error("Unexpected response format:", response);
                $("#userActiveCount").text("Error");
            }
        },
        error: function (xhr, status, error) {
            console.error("Error fetching member count. Status:", xhr.status);
            console.error("Error details:", error);
            console.error("Response text:", xhr.responseText);
            $("#userActiveCount").text("Error");

            // Handle specific error codes
            if (xhr.status === 403) {
                console.log("Authentication issue - check if you need to include auth headers");
            }
        }
    });
});
