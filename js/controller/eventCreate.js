document.addEventListener('DOMContentLoaded', function (e){
    loadAdmins();
    loadEventTypes();
});

function loadAdmins() {
    const token = localStorage.getItem("authToken");
    $.ajax({
        url: "http://localhost:8080/api/v1/event/getAllAdminEmails",
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

            const selectUsers = $("#adminName");
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
                $('#adminID').val(userId);
                localStorage.setItem('selectedUserId', userId);
            });
        },
        error: function(xhr, status, error) {
            console.error("Error loading admins:", error);
            alert("Failed to load admins. Please try again.");
        }
    });
}

function loadEventTypes() {
    const token = localStorage.getItem("authToken");
    $.ajax({
        url: "http://localhost:8080/api/v1/event/getAllEventTypes",
        method: "GET",
        dataType: "json",
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function(response) {
            console.log("Event Types API Response:", response);

            // Check the structure of the response to debug
            console.log("Response structure:", Object.keys(response));

            // Adapt this condition to match your actual response structure
            // Your ResponseDTO might use different field names
            if (!response) {
                console.error("Empty response received");
                return;
            }

            // Try different possible response structures
            let eventTypes = null;

            if (response.content) {
                // If response has a content field directly
                eventTypes = response.content;
            } else if (response.data) {
                // If response uses 'data' like your admin function
                eventTypes = response.data;
            } else if (Array.isArray(response)) {
                // If response is directly an array
                eventTypes = response;
            } else {
                console.error("Could not find event types data in the response");
                return;
            }

            if (!Array.isArray(eventTypes)) {
                console.error("Event types data is not an array");
                return;
            }

            const eventTypeSelect = $("#eventType");
            if (eventTypeSelect.length === 0) {
                console.error("Event type dropdown not found");
                return;
            }

            eventTypeSelect.empty().append('<option value="">Select Type</option>');

            eventTypes.forEach(eventType => {
                // Log each event type to see its structure
                console.log("Event type item:", eventType);

                eventTypeSelect.append(`
                    <option value="${eventType.eventType}" data-id="${eventType.eventTypeId}">
                        ${eventType.eventType}
                    </option>
                `);
            });

            eventTypeSelect.off('change').on('change', function() {
                const eventTypeId = $(this).find('option:selected').data('id') || '';
                console.log("Selected Event Type ID:", eventTypeId);
                $('#eventTypeID').val(eventTypeId);
            });
        },
        error: function(xhr, status, error) {
            console.error("Error loading event types:", error);
            console.error("Status:", xhr.status);
            console.error("Response:", xhr.responseText);
            alert("Failed to load event types. Please try again.");
        }
    });
}
// Initialize facilities functionality when the document is ready
document.addEventListener('DOMContentLoaded', function (e) {
    loadFacilities();
    setupFacilityHandlers();
});

// Facilities cart to store selected facilities
const facilitiesCart = [];

// Function to load facilities from the backend
function loadFacilities() {
    const token = localStorage.getItem("authToken");
    $.ajax({
        url: "http://localhost:8080/api/v1/event/getAllEventFacilities",
        method: "GET",
        dataType: "json",
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function(response) {
            console.log("Facilities API Response:", response);

            // Try different possible response structures
            let facilities = null;

            if (response.content) {
                facilities = response.content;
            } else if (response.data) {
                facilities = response.data;
            } else if (Array.isArray(response)) {
                facilities = response;
            } else {
                console.error("Could not find facilities data in the response");
                return;
            }

            if (!Array.isArray(facilities)) {
                console.error("Facilities data is not an array");
                return;
            }

            const facilitySelect = $("#facilitySelect");
            if (facilitySelect.length === 0) {
                console.error("Facility select dropdown not found");
                return;
            }

            facilitySelect.empty().append('<option value="" disabled selected>Select Facility</option>');

            facilities.forEach(facility => {
                facilitySelect.append(`
                    <option value="${facility.eventFacilityId}" 
                            data-name="${facility.facilityName}" 
                            data-qty="${facility.qty}"
                            data-description="${facility.description || ''}">
                        ${facility.facilityName}
                    </option>
                `);
            });
        },
        error: function(xhr, status, error) {
            console.error("Error loading facilities:", error);
            console.error("Status:", xhr.status);
            console.error("Response:", xhr.responseText);
            alert("Failed to load facilities. Please try again.");
        }
    });
}

// Set up event handlers for the facilities functionality
function setupFacilityHandlers() {
    // Facility selection change handler
    $("#facilitySelect").on('change', function() {
        const selectedOption = $(this).find('option:selected');
        const facilityId = selectedOption.val();
        const facilityName = selectedOption.data('name');
        const availableQty = selectedOption.data('qty');
        const description = selectedOption.data('description') || '';

        console.log("Selected Facility:", facilityId, facilityName, availableQty, description);

        // Update form fields
        $('#facilityID').val(facilityId);
        $('#facilityDes').val(description);
        $('#facilityQtys').val(availableQty);

        // Limit the quantity input to the available quantity
        $('#facilityQty').attr('max', availableQty);

        // Reset quantity to 1 or the max available if less than 1
        const qtyToSet = Math.min(1, availableQty);
        $('#facilityQty').val(qtyToSet);
    });

    // Add facility button click handler
    $("#addFacilityBtn").on('click', function() {
        const facilityId = $('#facilityID').val();
        if (!facilityId) {
            alert("Please select a facility first");
            return;
        }

        const facilityQty = parseInt($('#facilityQty').val(), 10);
        const availableQty = parseInt($('#facilityQtys').val(), 10);

        if (isNaN(facilityQty) || facilityQty <= 0) {
            alert("Please enter a valid quantity");
            return;
        }

        if (facilityQty > availableQty) {
            alert(`Only ${availableQty} units available`);
            return;
        }

        // Check if this facility is already in the cart
        const existingFacilityIndex = facilitiesCart.findIndex(item => item.facilityId == facilityId);

        if (existingFacilityIndex >= 0) {
            // Update quantity if the facility already exists in the cart
            const currentQty = facilitiesCart[existingFacilityIndex].qty;
            const newQty = currentQty + facilityQty;

            if (newQty > availableQty) {
                alert(`Cannot add ${facilityQty} more units. Only ${availableQty - currentQty} units available.`);
                return;
            }

            facilitiesCart[existingFacilityIndex].qty = newQty;
        } else {
            // Add new facility to the cart
            const selectedOption = $("#facilitySelect").find('option:selected');
            const facilityName = selectedOption.data('name');
            const description = selectedOption.data('description') || '';

            facilitiesCart.push({
                facilityId,
                facilityName,
                qty: facilityQty,
                description
            });
        }

        // Update the display
        updateFacilitiesCart();

        // Reset selection
        $("#facilitySelect").val('');
        $('#facilityID').val('');
        $('#facilityDes').val('');
        $('#facilityQtys').val('');
        $('#facilityQty').val('1');
    });

    // Event delegation for remove buttons (for buttons added dynamically)
    $("#facilitiesCart").on('click', '.remove-facility', function() {
        const index = $(this).data('index');
        facilitiesCart.splice(index, 1);
        updateFacilitiesCart();
    });
}

// Update the facilities cart display
function updateFacilitiesCart() {
    const cartElem = $("#facilitiesCart");
    cartElem.empty();

    let totalQty = 0;

    facilitiesCart.forEach((item, index) => {
        totalQty += item.qty;

        cartElem.append(`
            <tr>
                <td>${item.facilityId}</td>
                <td>${item.facilityName}</td>
                <td>${item.qty}</td>
                <td>${item.description}</td>
                <td>
                    <button type="button" class="btn btn-danger btn-sm remove-facility" data-index="${index}">
                        Remove
                    </button>
                </td>
            </tr>
        `);
    });

    // Update total quantity
    $("#facilitiesTotalQTY").text(totalQty);

    // Store cart data in localStorage or a hidden input for form submission
    localStorage.setItem('facilitiesCart', JSON.stringify(facilitiesCart));
}

// Function to get the facilities cart data for submission
function getFacilitiesCartData() {
    return facilitiesCart;
}

// Function to save the event
function saveEvent() {
    // Get auth token
    const token = localStorage.getItem("authToken");

    // Collect all form data
    /*const eventData = {
        // Basic event details
        eventName: $("#eventTitle").val(),
        eventStartDate: $("#startDateTime").val(),
        eventEndDate: $("#endDateTime").val(),
        eventTypeId: $("#eventTypeID").val(),
        adminId: $("#adminID").val(),
        description: $("#description").val(),

        // Facilities from the cart
        facilities: getFacilitiesCartData().map(item => ({
            facilityId: item.facilityId,
            qty: item.qty
        }))
    };*/
    const eventData = {
        eventTitle: $("#eventTitle").val(), // Changed from eventName to eventTitle
        startDateTime: $("#startDateTime").val(),
        endDateTime: $("#endDateTime").val(),
        eventType_Id: $("#eventTypeID").val(), // Changed from eventTypeId to eventType_Id
        description: $("#description").val(),
        eventFacilities: getFacilitiesCartData().map(item => ({
            eventFacilityID: item.facilityId, // Changed from facilityId to eventFacilityID
            qty: item.qty
        }))
    };

    // Validate required fields
    if (!eventData.eventTitle) {
        alert("Please enter an event title");
        return false;
    }

    if (!eventData.startDateTime || !eventData.endDateTime) {
        alert("Please select event dates");
        return false;
    }

    if (!eventData.eventType_Id) {
        alert("Please select an eventType");
        return false;
    }

    if (eventData.eventFacilities.length === 0) {
        alert("Please add at least one facility");
        return false;
    }
    console.log(eventData);
    // Show loading indicator
    $("#saveEventBtn").prop("disabled", true).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Saving...');

    // Send AJAX request to save the event
    $.ajax({
        url: "http://localhost:8080/api/v1/event/save",
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(eventData),
        headers: {
            'Authorization': `Bearer ${token}`
        },
        /*success: function(response) {
            console.log("Save Event Response:", response);

            if (response.status === "SUCCESS") {
                // Show success message
                alert("Event saved successfully!");

                // Clear form fields
                clearEventForm();

                // Optionally redirect to events list
                // window.location.href = "events-list.html";
            } else {
                alert("Error saving event: " + (response.message || "Unknown error"));
            }
        },*/
        success: function(response) {
            console.log("Save Event Response:", response);

            // Check for success based on your backend's ResponseDTO structure
            if (response.code === "00" || response.message === "Event created") {  // Match your backend success code
                // Show success message
                alert("Event saved successfully!");

                // Clear form fields
                clearEventForm();
            } else {
                alert("Error saving event: " + (response.message || "Unknown error"));
            }
        },
        error: function(xhr, status, error) {
            console.error("Error saving event:", error);
            console.error("Status:", xhr.status);
            console.error("Response:", xhr.responseText);

            let errorMessage = "Failed to save event. Please try again.";

            // Try to extract more specific error message if available
            if (xhr.responseJSON && xhr.responseJSON.message) {
                errorMessage = xhr.responseJSON.message;
            }

            alert(errorMessage);
        },
        complete: function() {
            // Re-enable the save button
            $("#saveEventBtn").prop("disabled", false).html('Save Event');
        }
    });

    return false; // Prevent form submission if this is within a form
}

// Function to clear the event form
function clearEventForm() {
    // Clear basic fields
    $("#eventName").val("");
    $("#eventStartDate").val("");
    $("#eventEndDate").val("");
    $("#eventStartTime").val("");
    $("#eventEndTime").val("");
    $("#eventTypeID").val("");
    $("#eventType").val("");
    $("#adminID").val("");
    $("#adminName").val("");
    $("#eventDescription").val("");

    // Clear facilities cart
    facilitiesCart.length = 0;
    updateFacilitiesCart();

    // Clear facility selection
    $("#facilitySelect").val("");
    $("#facilityID").val("");
    $("#facilityDes").val("");
    $("#facilityQtys").val("");
    $("#facilityQty").val("1");
}

// Add event listener for the save button
$(document).ready(function() {
    // If you have a save button with id "saveEventBtn"
    $("#saveEventBtn").on("click", function() {
        saveEvent();
    });
});

