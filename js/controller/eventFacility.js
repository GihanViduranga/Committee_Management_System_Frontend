$("#SaveFacility").off("click").on("click", function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    // Get form values
    const facilityName = $("#facilityName").val();
    const description = $("#FacilityDescriptions").val();
    const qty = $("#qty").val();

    // Validation
    if (!facilityName || !qty) {
        alert("Please fill in all required fields");
        return;
    }

    // Prepare payload
    const payload = {
        facilityName: facilityName,
        description: description,
        qty: qty
    };

    // Check authentication
    const token = localStorage.getItem("authToken");
    if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
    }

    // Get button reference
    const $saveButton = $("#SaveFacility");
    $saveButton.prop("disabled", true).text("Saving...");

    // AJAX call
    $.ajax({
        url: 'http://localhost:8080/api/v1/event_facility/save',
        type: 'POST',
        contentType: 'application/json',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        data: JSON.stringify(payload),
        success: function(data, textStatus, xhr) {
            // Check the response code from your backend
            if (data.code === "00") {
                alert(data.message || "Facility saved successfully!");
                $("#facilityName").val("");
                $("#FacilityDescriptions").val("");
                $("#qty").val("");
            } else {
                alert(data.message || "Failed to save facility");
            }
        },
        error: function(xhr, textStatus, errorThrown) {
            try {
                const errorData = JSON.parse(xhr.responseText);
                alert(errorData.message || 'Request failed');
            } catch (e) {
                alert(xhr.statusText || 'An error occurred');
            }
        },
        complete: function() {
            $saveButton.prop("disabled", false).text("Save");
        }
    });
});

function getAllEventFacilities() {
    const tableBody = $('#facilityTableBody');

    // Clear the table and show loading
    tableBody.empty();
    tableBody.append(`<tr><td colspan="5" class="text-center">Loading...</td></tr>`);

    const token = localStorage.getItem("authToken");
    if (!token) {
        alert("You are not authenticated. Please log in.");
        tableBody.html(`<tr><td colspan="5" class="text-center text-danger">Authentication error</td></tr>`);
        return;
    }

    $.ajax({
        url: 'http://localhost:8080/api/v1/event_facility/getAll',
        type: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function(response) {
            console.log("Full response:", response);
            tableBody.empty(); // Clear loading row

            const facilities = response.content || response.data; // Handle different response formats

            if (!facilities || facilities.length === 0) {
                tableBody.html(`<tr><td colspan="5" class="text-center">No facilities found</td></tr>`);
                return;
            }

            facilities.forEach(function(facility) {
                const row = `
                    <tr data-id="${facility.eventFacilityId}">
                        <td>${facility.eventFacilityId}</td>
                        <td>${facility.facilityName}</td>
                        <td>${facility.description || '-'}</td>
                        <td>${facility.qty}</td>
                        <td>
                            <button class="btn btn-warning btn-sm edit-facility">Edit</button>
                            <button class="btn btn-danger btn-sm delete-facility">Delete</button>
                        </td>
                    </tr>
                `;
                tableBody.append(row);
            });
        },
        error: function(xhr, status, error) {
            console.error("Error loading facilities:", xhr, status, error);
            tableBody.html(`<tr><td colspan="5" class="text-center text-danger">Error loading data: ${error}</td></tr>`);
        }
    });
}

// Use event delegation for dynamically added elements
$(document).on("click", ".edit-facility", function() {
    const row = $(this).closest("tr");
    const id = row.data("id");
    const facilityName = row.find("td:eq(1)").text();
    const description = row.find("td:eq(2)").text();
    const qty = row.find("td:eq(3)").text();

    $("#facilityName").val(facilityName);
    $("#FacilityDescriptions").val(description);
    $("#qty").val(qty);

    $("#SaveFacility").text("Update").data("mode", "update").data("id", id);
});

$(document).on("click", ".delete-facility", function() {
    const id = $(this).closest("tr").data("id");
    if (confirm("Are you sure you want to delete this facility?")) {
        deleteFacility(id);
    }
});

// Function to delete a facility
function deleteFacility(id) {
    console.log("Deleting facility ID:", id);
    const token = localStorage.getItem("authToken");

    if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
    }

    $.ajax({
        url: `http://localhost:8080/api/v1/event_facility/delete/${id}`,
        type: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function(response) {
            console.log("Delete response:", response);
            alert(response.message || "Facility deleted successfully");
            getAllEventFacilities(); // Reload the table
        },
        error: function(xhr, status, error) {
            console.error("Error deleting facility:", xhr, status, error);
            alert("You Can't delete this facility because this facility added to Event" /*+ (xhr.responseJSON?.message || error)*/);
        }
    });
}

// Function to edit a facility
$(document).on("click", ".edit-facility", function() {
    const row = $(this).closest("tr");
    const id = row.data("id");
    const facilityName = row.find("td:eq(1)").text();
    const description = row.find("td:eq(2)").text();
    const qty = row.find("td:eq(3)").text();

    $("#facilityName").val(facilityName);
    $("#FacilityDescriptions").val(description);
    $("#qty").val(qty);

    // Set the ID for updating
    $("#UpdateFacility").data("id", id);

    // Show the Update button and hide the Submit button
    $("#SaveFacility").hide();
    $("#UpdateFacility").show();
});

// Function to update a facility
$("#UpdateFacility").on("click", function () {
    const id = $(this).data("id");
    if (!id) {
        alert("No facility selected for update.");
        return;
    }

    // Get updated values from form
    const facilityName = $("#facilityName").val();
    const description = $("#FacilityDescriptions").val();
    const qty = $("#qty").val();

    const token = localStorage.getItem("authToken");
    if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
    }

    $.ajax({
        url: `http://localhost:8080/api/v1/event_facility/update`,
        type: "PUT",
        contentType: "application/json",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        data: JSON.stringify({
            eventFacilityId: id,
            facilityName: facilityName,
            description: description,
            qty: qty
        }),
        success: function (response) {
            console.log("Update response:", response);
            alert("Facility updated successfully");

            // Reset form and buttons
            $("#facilityName").val("");
            $("#FacilityDescriptions").val("");
            $("#qty").val("");

            // Show submit button again and hide update
            $("#UpdateFacility").hide();
            $("#SaveFacility").show();

            // Reload the facilities table
            getAllEventFacilities();
        },
        error: function (xhr, status, error) {
            console.error("Error updating facility:", xhr, status, error);
            alert("Error updating facility: " + error);
        }
    });
});

// Load facilities on page load
$(document).ready(getAllEventFacilities);