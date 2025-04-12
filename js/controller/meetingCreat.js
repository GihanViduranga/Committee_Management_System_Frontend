$(document).ready(function() {
    const token = localStorage.getItem("authToken");
    if (!token) {
        console.error("No auth token found");
        // Consider redirecting to login page if no token
        return;
    }

    // Function to load meetings
    function loadMeetings() {
        console.log("Loading meetings...");
        $.ajax({
            url: "http://localhost:8080/api/v1/meeting/getAllMeetings",
            method: "GET",
            dataType: "json",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            success: function(response) {
                console.log("API Response:", response);

                if (!response || !response.data) {
                    console.error("Invalid response format");
                    return;
                }

                const tableBody = $("#meetingTableBody");
                if (tableBody.length === 0) {
                    console.error("Table body not found - check your HTML ID");
                    return;
                }

                tableBody.empty();

                response.data.forEach(meeting => {
                    tableBody.append(`
                        <tr data-id="${meeting.meetingId}">
                            <td>${meeting.meetingId}</td>
                            <td>${meeting.meetingTitle}</td>
                            <td>${meeting.meetingDate}</td>
                            <td>${meeting.meetingTime}</td>
                            <td>${meeting.description}</td>
                            <td>
                                <button class="btn btn-warning btn-sm edit-btns">Edit</button>
                                <button class="btn btn-danger btn-sm delete-btns">Delete</button>
                            </td>
                        </tr>
                    `);
                });
            },
            error: function(xhr, status, error) {
                console.error("Error loading meetings:", status, error);
                alert("Error loading meetings. Check console for details.");
            }
        });
    }

    // Initial load
    loadMeetings();
    loadAdmins();

    function loadAdmins() {
        const token = localStorage.getItem("authToken");
        $.ajax({
            url: "http://localhost:8080/api/v1/meeting/getAllAdminEmails",
            method: "GET",
            dataType: "json",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            success: function(response) {
                console.log("API Response:", response);

                if (!response || !response.data) {
                    console.error("Invalid response format");
                    return;
                }

                const selectUsers = $("#userEmail");
                if (selectUsers.length === 0) {
                    console.error("Select users dropdown not found");
                    return;
                }

                selectUsers.empty().append('<option value="">Select Admin Email</option>');

                response.data.forEach(user => {
                    selectUsers.append(`
                    <option value="${user.email}" data-user-id="${user.userId}">
                        ${user.email}
                    </option>
                `);
                });

                selectUsers.off('change').on('change', function() {
                    const userId = $(this).find('option:selected').data('user-id') || '';
                    console.log("Selected Admin ID:", userId);
                    $('#userIds').val(userId);
                    localStorage.setItem('selectedUserId', userId);
                });
            },
            error: function(xhr, status, error) {
                console.error("Error loading admins:", error);
                alert("Failed to load admins. Please try again.");
            }
        });
    }
    // Add Meeting handler
    $('#addMeeting').on("click", function(e) {
        e.preventDefault();

        const userId = $("#userIds").val().trim();
        const meetingTitle = $("#meetingTitle").val().trim();
        const meetingDate = $("#meetingDate").val().trim();
        const meetingTime = $("#meetingTime").val().trim();
        const description = $("#descriptions").val().trim();

        if (!meetingTitle || !meetingDate || !meetingTime) {
            alert("Please fill in all required fields (Title, Date, Time)");
            return;
        }

        const payload = {
            meetingTitle,
            meetingDate,
            meetingTime,
            description,
            userId
        };

        console.log("Saving meeting:", payload);

        $.ajax({
            url: 'http://localhost:8080/api/v1/meeting/createMeeting',
            type: 'POST',
            contentType: 'application/json',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: JSON.stringify(payload),
            success: function(response) {
                console.log("Save response:", response);

                if (response.code === "00") {
                    $("#meetingTitle, #meetingDate, #meetingTime, #descriptions").val("");
                    loadMeetings();
                    alert(response.message || "Meeting saved successfully!");
                } else {
                    alert(response.message || "Error saving meeting");
                }
            },
            error: function(xhr) {
                console.error("Save error:", xhr.responseText);
                alert("Failed to save meeting. " + (xhr.responseJSON?.message || "Check console for details."));
            }
        });
    });

    // Edit button handler
    $(document).on("click", ".edit-btns", function() {
        let row = $(this).closest("tr");
        let meetingId = row.data("id");
        let meetingTitle = row.find("td:eq(1)").text();
        let meetingDate = row.find("td:eq(2)").text();
        let meetingTime = row.find("td:eq(3)").text();
        let description = row.find("td:eq(4)").text();

        $("#meetingTitle").val(meetingTitle);
        $("#meetingDate").val(meetingDate);
        $("#meetingTime").val(meetingTime);
        $("#descriptions").val(description);

        $("#updateMeeting").data("id", meetingId).show();
        $("#addMeeting").hide();
    });

    // Delete button handler
    $(document).on("click", ".delete-btns", function() {
        let row = $(this).closest("tr");
        let meetingId = row.data("id");

        if (confirm("Are you sure you want to delete this meeting?")) {
            $.ajax({
                url: `http://localhost:8080/api/v1/meeting/delete/${meetingId}`,
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                success: function() {
                    alert("Meeting deleted successfully.");
                    loadMeetings();
                },
                error: function(xhr) {
                    console.error("Delete error:", xhr.responseText);
                    alert("Failed to delete meeting.");
                }
            });
        }
    });

    // Update button handler
    $("#updateMeeting").on("click", function(e) {
        e.preventDefault();

        let id = $(this).data("id");
        const meetingTitle = $("#meetingTitle").val().trim();
        const meetingDate = $("#meetingDate").val().trim();
        const meetingTime = $("#meetingTime").val().trim();
        const description = $("#descriptions").val().trim();

        if (!meetingTitle || !meetingDate || !meetingTime) {
            alert("Please fill in all required fields (Title, Date, Time)");
            return;
        }

        $.ajax({
            url: "http://localhost:8080/api/v1/meeting/update",
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify({
                meetingId: id,
                meetingTitle,
                meetingDate,
                meetingTime,
                description
            }),
            headers: {
                'Authorization': `Bearer ${token}`
            },
            success: function(response) {
                alert("Meeting updated successfully.");
                $("#meetingTitle, #meetingDate, #meetingTime, #descriptions").val("");
                $("#updateMeeting").hide().removeData("id");
                $("#addMeeting").show();
                loadMeetings();
            },
            error: function(xhr) {
                console.error("Update error:", xhr.responseText);
                alert("Failed to update meeting. " + (xhr.responseJSON?.message || "Check console for details."));
            }
        });
    });

    $('#refreshTable').off('click').on('click', function (){
        loadMeetings();
    });
});