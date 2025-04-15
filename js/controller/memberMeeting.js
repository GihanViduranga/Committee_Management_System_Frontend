// Function to fetch meetings data and populate the table
function fetchAndDisplayMeetings() {
    // Get the authentication token from localStorage
    const token = localStorage.getItem('authToken');
    console.log("Token:", token ? "Found" : "Not found");

    // Check if token exists
    if (!token) {
        console.error('Authentication token not found in localStorage');
        $("#meetingTable").html(`
            <tr>
                <td colspan="5" class="text-center">Authentication token not found. Please login again.</td>
            </tr>
        `);
        return;
    }

    // Show a loading indicator
    $("#meetingTable").html(`
        <tr>
            <td colspan="5" class="text-center">Loading meetings data...</td>
        </tr>
    `);

    // Make AJAX request to get meetings data
    $.ajax({
        url: "http://localhost:8080/api/v1/meeting/getAllMeetingsToMember",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: function(response) {
            // Log the exact response for debugging
            console.log("Raw API Response:", response);
            console.log("Response type:", typeof response);

            if (typeof response === 'string') {
                try {
                    response = JSON.parse(response);
                    console.log("Parsed JSON response:", response);
                } catch (e) {
                    console.error("Failed to parse JSON response:", e);
                }
            }

            // Clear existing table rows
            $("#meetingTable").empty();

            // Check for embedded data structures - sometimes APIs nest data in objects
            let meetingsData = response;

            // Common response patterns to check
            if (response && response.data && Array.isArray(response.data)) {
                console.log("Found data array in response.data");
                meetingsData = response.data;
            } else if (response && response.meetings && Array.isArray(response.meetings)) {
                console.log("Found data array in response.meetings");
                meetingsData = response.meetings;
            } else if (response && response.content && Array.isArray(response.content)) {
                console.log("Found data array in response.content");
                meetingsData = response.content;
            } else if (response && response.results && Array.isArray(response.results)) {
                console.log("Found data array in response.results");
                meetingsData = response.results;
            }

            console.log("Processed data to display:", meetingsData);

            // Check if we have data to display
            if (Array.isArray(meetingsData) && meetingsData.length > 0) {
                console.log(`Processing ${meetingsData.length} meetings`);

                // Log the first item to check its structure
                console.log("First meeting object:", meetingsData[0]);

                // Iterate through meetings and add rows to the table
                meetingsData.forEach(function(meeting, index) {
                    console.log(`Processing meeting ${index}:`, meeting);

                    const row = `
                        <tr>
                            <td>${meeting.meetingId || meeting.id || 'N/A'}</td>
                            <td>${meeting.meetingTitle || 'N/A'}</td>
                            <td>${formatDate(meeting.meetingDate) || 'N/A'}</td>
                            <td>${meeting.meetingTime || 'N/A'}</td>
                            <td>${meeting.description || 'N/A'}</td>
                        </tr>
                    `;
                    $("#meetingTable").append(row);
                });
                console.log(`Added ${meetingsData.length} rows to the table`);
            } else {
                // If no meetings or invalid response
                console.log("No meetings found in the response");
                $("#meetingTable").html(`
                    <tr>
                        <td colspan="5" class="text-center">No meetings found</td>
                    </tr>
                `);
            }
        },
        error: function(xhr, status, error) {
            console.error("Error fetching meetings:", error);
            console.error("Status:", status);
            console.error("Response:", xhr.responseText);

            // Display error message in table
            $("#meetingTable").html(`
                <tr>
                    <td colspan="5" class="text-center">Failed to load meetings. ${xhr.status}: ${xhr.statusText}</td>
                </tr>
            `);

            // Handle token expiration or authentication issues
            if (xhr.status === 401 || xhr.status === 403) {
                alert("Your session has expired. Please login again.");
            }
        }
    });
}

// Helper function to format date
function formatDate(dateString) {
    if (!dateString) return 'N/A';

    try {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    } catch (e) {
        console.error("Error formatting date:", e);
        return dateString;
    }
}

// Call the function when the page loads
$(document).ready(function() {
    console.log("Document ready, fetching meetings...");
    fetchAndDisplayMeetings();
});