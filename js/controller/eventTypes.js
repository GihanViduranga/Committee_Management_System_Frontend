$("#addEventType").off("click").on("click", function () {
    const token = localStorage.getItem("authToken");
    if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
    }

    // Get values from form
    const eventType = $("#eventTypeN").val();
    const description = $("#descriptionType").val();

    const payload = {
        eventType,
        description
    }

    $.ajax({
        url: 'http://localhost:8080/api/v1/event_type/save',
        type: 'POST',
        contentType: 'application/json',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        data: JSON.stringify(payload),
        success: function(data, textStatus, xhr) {

            if (data.code === "00") {
                alert(data.message || "Event type saved successfully!");
                $("#eventTypeN").val("");
                $("#descriptionType").val("");
            } else {
                alert(data.message || "Failed to save event type");
            }
        },
    });
})

$(document).ready(function () {
    loadEventTypes();


    function loadEventTypes() {
        let token = localStorage.getItem("authToken");
        $.ajax({
            url: "http://localhost:8080/api/v1/event_type/getAllEventTypes",
            method: "GET",
            dataType: "json",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            success: function (response) {
                let tableBody = $("#eventTypeTableBody");
                tableBody.empty();
                response.data.forEach(event => {
                    tableBody.append(`
                        <tr data-id="${event.eventTypeId}">
                            <td>${event.eventTypeId}</td>
                            <td>${event.eventType}</td>
                            <td>${event.description}</td>
                            <td>
                                <button class="btn btn-warning btn-sm edit-btn">Edit</button>
                                <button class="btn btn-danger btn-sm delete-btn">Delete</button>
                            </td>
                        </tr>
                    `);
                });
            },
            error: function () {
                alert("Failed to load event types.");
            }
        });
    }

    $(document).on("click", ".edit-btn", function () {
        let row = $(this).closest("tr");
        let eventTypeId = row.data("id");
        let eventType = row.find("td:eq(1)").text();
        let description = row.find("td:eq(2)").text();

        $("#eventTypeN").val(eventType);
        $("#descriptionType").val(description);

        $("#typeUpdate").data("id", eventTypeId);
    });

    $(document).on("click", ".delete-btn", function () {
        let row = $(this).closest("tr");
        let eventTypeId = row.data("id");
        let token = localStorage.getItem("authToken");

        if (confirm("Are you sure you want to delete this event type?")) {
            $.ajax({
                url: `http://localhost:8080/api/v1/event_type/delete/${eventTypeId}`,
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                success: function () {
                    alert("Event type deleted successfully.");
                    loadEventTypes();
                },
                error: function () {
                    alert("Failed to delete event type.");
                }
            });
        }
    });


    $("#typeUpdate").off("click").on("click", function (e) {
        e.preventDefault();

        let Id = $(this).data("id");
        const eventType = $("#eventTypeN").val();
        const description = $("#descriptionType").val();
        let token = localStorage.getItem("authToken");

        console.log($(this).data("id"));

        $.ajax({
            url: "http://localhost:8080/api/v1/event_type/update",
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify({
                eventTypeId: Id,
                eventType: eventType,
                description: description
            }),
            headers: {
                'Authorization': `Bearer ${token}`
            },
            success: function () {
                alert("Event type updated successfully.");
                loadEventTypes();
            },
            error: function (xhr) {
                console.log(xhr.responseText);
                alert("Failed to update event type.");
            }
        });
    });
});