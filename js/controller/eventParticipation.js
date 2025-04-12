document.addEventListener('DOMContentLoaded', function (e) {
    loadEventParticipations();
    loadEvents();
    loadMembersToEventParticipation();
});

function loadEventParticipations() {
    const token = localStorage.getItem("authToken");
    if (!token) {
        console.error("No auth token found");
        alert("Please login again");
        window.location.href = "/login.html";
        return;
    }

    $.ajax({
        url: 'http://localhost:8080/api/v1/participation/getAllParticipation',
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function (response) {
            console.log("API Response:", response);

            if (!response) {
                console.error("Empty response received");
                $("#eventParticipationTableBody").html(
                    '<tr><td colspan="3" class="text-center">No data available</td></tr>'
                );
                return;
            }

            let participations = [];
            if (Array.isArray(response)) {
                participations = response;
            } else if (response.data && Array.isArray(response.data)) {
                participations = response.data;
            } else if (response.content && Array.isArray(response.content)) {
                participations = response.content;
            } else {
                console.error("Unrecognized response format", response);
                $("#eventParticipationTableBody").html(
                    '<tr><td colspan="3" class="text-center text-danger">Invalid data format</td></tr>'
                );
                return;
            }

            const tableBody = $("#eventParticipationTableBody");
            if (tableBody.length === 0) {
                console.error("Table body not found - check your HTML ID");
                return;
            }

            tableBody.empty();

            if (participations.length === 0) {
                tableBody.append(
                    '<tr><td colspan="3" class="text-center">No participations found</td></tr>'
                );
                return;
            }

            participations.forEach(participation => {
                const id = participation.participation_id || participation.id || 'N/A';
                const userId = (participation.user && participation.user.user_id) ||
                    participation.userId ||
                    participation.user_id ||
                    'N/A';
                const date = participation.date ||
                    participation.createdAt ||
                    participation.participation_date ||
                    'N/A';

                tableBody.append(`
                    <tr>
                        <td>${id}</td>
                        <td>${userId}</td>
                        <td>${new Date(date).toLocaleString()}</td>
                    </tr>
                `);
            });
        },
        error: function(xhr, status, error) {
            console.error("Error loading event participations:", error, xhr.responseText);

            let errorMsg = "Failed to load participations";
            if (xhr.status === 401) {
                errorMsg = "Session expired. Please login again";
                window.location.href = "/login.html";
            } else if (xhr.responseJSON && xhr.responseJSON.message) {
                errorMsg = xhr.responseJSON.message;
            }

            $("#eventParticipationTableBody").html(
                `<tr><td colspan="3" class="text-center text-danger">${errorMsg}</td></tr>`
            );
        }
    });
}

/*$(document).on('click', '#saveParticipation', function() {
    // Get form values
    const eventId = $('#User').val().trim();
    const memberId = $('#memberIDs').val().trim();

    // Validate required fields
    if (!eventId || !memberId) {
        alert('Please fill all required fields');
        return;
    }

    // Convert values to integers to ensure proper format
    const eventIdInt = parseInt(eventId, 10);
    const memberIdInt = parseInt(memberId, 10);

    // Check if conversion was successful
    if (isNaN(eventIdInt) || isNaN(memberIdInt)) {
        alert('Invalid event or member ID format');
        return;
    }

    // Create DTO structure matching your backend expectations
    const participationDTO = {
        eventId: eventIdInt,
        userId: memberIdInt
    };

    console.log('Sending data:', JSON.stringify(participationDTO));

    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('Authentication token missing. Please login again.');
        return;
    }

    // Disable button to prevent multiple submissions
    $('#saveParticipation').prop('disabled', true).text('Saving...');

    $.ajax({
        url: 'http://localhost:8080/api/v1/participation/save',
        method: 'POST',
        contentType: 'application/json',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        data: JSON.stringify(participationDTO),
        success: function(response) {
            console.log('API Response:', response);
            alert('Participation saved successfully!');

            // Reset form
            $('#eventTitles').val('').trigger('change');
            $('#memberSelects').val('').trigger('change');
            $('#User').val('');
            $('#memberIDs').val('');

            // Reload data
            loadEventParticipations();
        },
        error: function(xhr, status, error) {
            console.error('API Error:', xhr.responseText);

            let errorMessage = 'Failed to save participation';
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
            $('#saveParticipation').prop('disabled', false).text('Save Participation');
        }
    });
});*/
$(document).on('click', '#saveParticipation', function() {
    // Get form values from the select elements
    const eventId = $('#eventTitles').val().trim();
    const memberId = $('#memberSelects').val().trim();

    // Get current date in ISO format (YYYY-MM-DD)
    const currentDate = new Date().toISOString().split('T')[0];

    // Validate required fields
    if (!eventId || !memberId) {
        alert('Please fill all required fields');
        return;
    }

    // Convert values to integers to ensure proper format
    const eventIdInt = parseInt(eventId, 10);
    const memberIdInt = parseInt(memberId, 10);

    // Check if conversion was successful
    if (isNaN(eventIdInt) || isNaN(memberIdInt)) {
        alert('Invalid event or member ID format');
        return;
    }

    // Create JSON data structure matching your backend expectations
    const participationDTO = {
        event_id: eventIdInt,
        user_id: memberIdInt,
        date: currentDate
    };

    console.log('Sending data:', JSON.stringify(participationDTO));

    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('Authentication token missing. Please login again.');
        return;
    }

    // Disable button to prevent multiple submissions
    $('#saveParticipation').prop('disabled', true).text('Saving...');

    $.ajax({
        url: 'http://localhost:8080/api/v1/participation/save',
        method: 'POST',
        contentType: 'application/json',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        data: JSON.stringify(participationDTO),
        success: function(response) {
            console.log('API Response:', response);
            alert('Participation saved successfully!');

            // Reset form
            $('#eventTitles').val('').trigger('change');
            $('#memberSelects').val('').trigger('change');
            $('#User').val('');
            $('#memberIDs').val('');

            // Reload data
            loadEventParticipations();
        },
        error: function(xhr, status, error) {
            console.error('API Error:', xhr.responseText);

            let errorMessage = 'Failed to save participation';
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
            $('#saveParticipation').prop('disabled', false).text('Save Participation');
        }
    });
});

function loadEvents() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('No auth token found');
        return;
    }

    $.ajax({
        url: 'http://localhost:8080/api/v1/participation/loadAllEvents',
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

            // More flexible response handling
            let events = [];

            // Check different possible response structures
            if (response.content) {
                events = response.content;
            } else if (Array.isArray(response)) {
                events = response;
            } else if (response.data) {
                events = response.data;
            }

            if (!events || events.length === 0) {
                console.error('No events found in response');
                return;
            }

            const select = $('#eventTitles');
            select.empty();
            select.append('<option value="">Select Event Title</option>');

            events.forEach(event => {
                const eventId = event.eventId || event.id || '';
                const title = event.title || event.eventTitle || 'Untitled Event';

                if (eventId) {
                    select.append(`<option value="${eventId}">${title}</option>`);
                }
            });

            // Add change event handler
            select.on('change', function() {
                const selectedEventId = $(this).val();
                $('#User').val(selectedEventId);
                console.log(`Selected Event ID: ${selectedEventId}`);
            });
        },
        error: function(xhr, status, error) {
            console.error('Error loading events:', error);
            console.log('XHR response:', xhr.responseText);
            alert('Failed to load events. Please check console for details.');
        }
    });
}

function loadMembersToEventParticipation() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('No auth token found');
        return;
    }

    $.ajax({
        url: 'http://localhost:8080/api/v1/participation/loadAllMembers',
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

            // More flexible response handling
            let members = [];

            // Check different possible response structures
            if (response.content) {
                members = response.content;
            } else if (Array.isArray(response)) {
                members = response;
            } else if (response.data) {
                members = response.data;
            }

            if (!members || members.length === 0) {
                console.error('No members found in response');
                return;
            }

            const select = $('#memberSelects');
            select.empty();
            select.append('<option value="">Select Member</option>');

            members.forEach(member => {
                const userId = member.userId || member.id || '';
                const email = member.email || 'No Email';
                const name = member.name || member.fullName || 'Unknown Member';

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
                $('#memberIDs').val(selectedMemberId);
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