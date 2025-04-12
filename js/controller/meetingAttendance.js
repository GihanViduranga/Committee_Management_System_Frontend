document.addEventListener('DOMContentLoaded', function (e) {
    loadAttendance();
    loadMeetings();
    loadMembersToAttendance();
});
function loadAttendance() {
    const token = localStorage.getItem("authToken");
    if (!token) {
        console.error("No auth token found");
        return;
    }

    $.ajax({
        url: 'http://localhost:8080/api/v1/attendance/getAllAttendance',
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function (response) {
            console.log("API Response:", response);
            if (!response || !response.data) {
                console.error("Invalid response format");
                return;
            }

            const tableBody = $("#meetingAttendTableBody");
            if (tableBody.length === 0) {
                console.error("Table body not found - check your HTML ID");
                return;
            }

            tableBody.empty();

            response.data.forEach(attendance => {
                tableBody.append(`
                    <tr>
                        <td>${attendance.meetingAttendanceId}</td>
                        <td>${attendance.user.userId}</td>
                        <td>${attendance.dateTime}</td>
                    </tr>
                `);
            });
        }
    });
}
$(document).on('click', '#saveAttendance', function() {
    // Get form values
    const meetingId = $('#meetingID').val().trim();
    const memberId = $('#memberID').val().trim();

    // Validate required fields
    if (!meetingId || !memberId) {
        alert('Please fill all required fields');
        return;
    }

    // Convert values to integers to ensure proper format
    const meetingIdInt = parseInt(meetingId, 10);
    const memberIdInt = parseInt(memberId, 10);

    // Check if conversion was successful
    if (isNaN(meetingIdInt) || isNaN(memberIdInt)) {
        alert('Invalid meeting or member ID format');
        return;
    }

    // Create DTO structure matching your backend expectations
    // Using the simpler structure from the error handling code I provided earlier
    const attendanceDTO = {
        meetingId: meetingIdInt,
        userId: memberIdInt
    };

    console.log('Sending data:', JSON.stringify(attendanceDTO));

    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('Authentication token missing. Please login again.');
        return;
    }

    // Disable button to prevent multiple submissions
    $('#saveAttendance').prop('disabled', true).text('Saving...');

    $.ajax({
        url: 'http://localhost:8080/api/v1/attendance/mark', // Changed to match backend endpoint
        method: 'POST',
        contentType: 'application/json',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        data: JSON.stringify(attendanceDTO),
        success: function(response) {
            console.log('API Response:', response);
            alert('Attendance saved successfully!');

            // Reset form
            $('#meetingsTitle').val('').trigger('change');
            $('#memberSelect').val('').trigger('change');
            $('#meetingID').val('');
            $('#memberID').val('');

            // Reload data if you have a table
            if (typeof loadAttendance === 'function') {
                loadAttendance();
            }
        },
        error: function(xhr, status, error) {
            console.error('API Error:', xhr.responseText);

            let errorMessage = 'Failed to save attendance';
            try {
                const errorResponse = JSON.parse(xhr.responseText);
                errorMessage += ': ' + (errorResponse.message || error);
            } catch (e) {
                errorMessage += ': ' + error;
            }

            alert(errorMessage);
        },
        complete: function() {
            // Re-enable the button
            $('#saveAttendance').prop('disabled', false).text('Save Attendance');
        }
    });
});

function loadMeetings() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('No auth token found');
        return;
    }

    $.ajax({
        url: 'http://localhost:8080/api/v1/attendance/loadAllMeetings',
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function(response) {
            console.log('Full API Response:', response);

            // Check if response exists
            if (!response) {
                console.error('Empty response received');
                return;
            }

            // Log the structure to understand what you're getting
            console.log('Response code:', response.code);
            console.log('Response content:', response.content);
            console.log('Response message:', response.message);

            // More flexible response handling
            let meetings = [];

            // Check different possible response structures
            if (response.content) {
                meetings = response.content;
            } else if (Array.isArray(response)) {
                meetings = response; // in case the API returns the array directly
            } else if (response.data) {
                meetings = response.data; // alternative common response structure
            }

            if (!meetings || meetings.length === 0) {
                console.error('No meetings found in response');
                return;
            }

            const select = $('#meetingsTitle');
            select.empty();
            select.append('<option value="">Select Meetings Title</option>');

            meetings.forEach(meeting => {
                // More defensive property access
                const meetingId = meeting.meetingId || meeting.id || '';
                const title = meeting.title || meeting.meetingTitle || 'Untitled Meeting';

                if (meetingId) {
                    select.append(`<option value="${meetingId}">${title}</option>`);
                }
            });

            // Add change event handler
            select.on('change', function() {
                const selectedMeetingId = $(this).val();
                const selectedMeetingTitle = $(this).find('option:selected').text();
                $('#meetingID').val(selectedMeetingId);
                console.log(`Selected Meeting ID: ${selectedMeetingId}, Title: ${selectedMeetingTitle}`);
            });
        },
        error: function(xhr, status, error) {
            console.error('Error loading meetings:', error);
            console.log('XHR response:', xhr.responseText);
            alert('Failed to load meetings. Please check console for details.');
        }
    });
}
function loadMembersToAttendance() {
    const token = localStorage.getItem('authToken'); // Match the same token key as in loadMeetings
    if (!token) {
        console.error('No auth token found');
        return;
    }

    $.ajax({
        url: 'http://localhost:8080/api/v1/attendance/loadAllMembers',
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function(response) {
            console.log('Full API Response:', response);

            // Check if response exists
            if (!response) {
                console.error('Empty response received');
                return;
            }

            // Log the structure to understand what you're getting
            console.log('Response code:', response.code);
            console.log('Response content:', response.content);
            console.log('Response message:', response.message);

            // More flexible response handling
            let members = [];

            // Check different possible response structures
            if (response.content) {
                members = response.content;
            } else if (Array.isArray(response)) {
                members = response; // in case the API returns the array directly
            } else if (response.data) {
                members = response.data; // alternative common response structure
            }

            if (!members || members.length === 0) {
                console.error('No members found in response');
                return;
            }

            const select = $('#memberSelect');
            select.empty();
            select.append('<option value="">Select Member</option>');

            members.forEach(member => {
                // More defensive property access
                const userId = member.userId || member.id || '';
                const email = member.email || 'No Email';
                const name = member.name || member.fullName || 'Unknown Member';

                // Display name and email if both available, otherwise just what's available
                const displayText = name !== 'Unknown Member' && email !== 'No Email'
                    ? `${name} (${email})`
                    : (name !== 'Unknown Member' ? name : email);

                if (userId) {
                    select.append(`<option value="${userId}" data-email="${email}">${displayText}</option>`);
                }
            });

            // Add change event handler
            select.on('change', function() {
                const selectedMemberId = $(this).val();
                $('#memberID').val(selectedMemberId);
                console.log(`Selected Member ID: ${selectedMemberId}`);
            });
        },
        error: function(xhr, status, error) {
            console.error('Error loading members:', error);
            console.log('XHR response:', xhr.responseText);
            alert('Failed to load members. Please check console for details.');

            // If unauthorized (401), redirect to login
            if (xhr.status === 401) {
                window.location.href = '/login.html';
            }
        }
    });
}