$(document).ready(function () {
    $('#savePayment').click(function () {
        const token = localStorage.getItem("authToken");

        if (!token) {
            alert("You are not authorized. Please login first.");
            return;
        }

        $.ajax({
            url: "http://localhost:8080/api/v1/User/profile",
            type: "GET",
            headers: {
                "Authorization": "Bearer " + token
            },
            success: function (profileResponse) {
                console.log("Profile loaded successfully:", profileResponse);

                const userId = profileResponse.userId;

                if (!userId) {
                    alert("User ID not found in profile. Please login again.");
                    return;
                }

                const paymentData = {
                    description: $('#PaymentDescription').val(),
                    date: $('#date').val(),
                    paymentMethod: $('#paymentMethod').val(),
                    price: $('#price').val(),
                    user: {
                        userId: userId
                    }
                };

                if (!paymentData.description || !paymentData.date || !paymentData.paymentMethod || !paymentData.price) {
                    alert("Please fill in all fields.");
                    return;
                }

                $.ajax({
                    url: "http://localhost:8080/api/v1/memberFee/payment",
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(paymentData),
                    headers: {
                        "Authorization": "Bearer " + token
                    },
                    success: function (response) {
                        alert("Payment submitted successfully!");
                        $('#memberFeeForm')[0].reset();
                    },
                    error: function (xhr) {
                        let msg = "Payment failed!";
                        if (xhr.responseJSON && xhr.responseJSON.message) {
                            msg += "\n" + xhr.responseJSON.message;
                        }
                        alert(msg);
                    }
                });
            },
            error: function (xhr) {
                let msg = "Failed to load profile!";
                if (xhr.responseJSON && xhr.responseJSON.message) {
                    msg += "\n" + xhr.responseJSON.message;
                }
                alert(msg);
            }
        });
    });
});




// Wait for the DOM to be fully loaded
// PayHere payment integration script

// Wait for the document to be fully loaded
/*document.addEventListener('DOMContentLoaded', function() {
    // Set up PayHere event handlers

    // Payment completed event handler
    payhere.onCompleted = function onCompleted(orderId) {
        console.log("Payment completed. OrderID:" + orderId);
        // Note: validate the payment and show success or failure page to the customer

        // You can add custom code here to handle successful payments
        // For example, redirect to a thank you page or update order status
    };

    // Payment dismissed event handler
    payhere.onDismissed = function onDismissed() {
        // Note: Prompt user to pay again or show an error page
        console.log("Payment dismissed");

        // You can add custom code here to handle dismissed payments
        // For example, show a message asking the user to try again
    };

    // Payment error event handler
    payhere.onError = function onError(error) {
        // Note: show an error page
        console.log("Error:" + error);

        // You can add custom code here to handle payment errors
        // For example, display the error to the user
    };

    // Configure payment parameters
    var payment = {
        "sandbox": true,                               // Set to false for production
        "merchant_id": "121XXXX",                      // Replace with your Merchant ID
        "return_url": "http://your-site.com/success",  // URL to redirect after successful payment
        "cancel_url": "http://your-site.com/cancel",   // URL to redirect after cancelled payment
        "notify_url": "http://sample.com/notify",      // Server notification URL
        "order_id": "ItemNo12345",                     // Your unique order ID
        "items": "Door bell wireles",                  // Item description
        "amount": "1000.00",                           // Payment amount
        "currency": "LKR",                             // Payment currency
        "hash": "45D3CBA93E9F2189BD630ADFE19AA6DC",    // Replace with generated hash from backend
        "first_name": "Saman",
        "last_name": "Perera",
        "email": "samanp@gmail.com",
        "phone": "0771234567",
        "address": "No.1, Galle Road",
        "city": "Colombo",
        "country": "Sri Lanka",
        "delivery_address": "No. 46, Galle road, Kalutara South",
        "delivery_city": "Kalutara",
        "delivery_country": "Sri Lanka",
        "custom_1": "",                                // Additional data field 1 (optional)
        "custom_2": ""                                 // Additional data field 2 (optional)
    };

    // Get the payment button and attach click event
    var paymentButton = document.getElementById('savePayment');

    // Attach the click event handler to the button
    if (paymentButton) {
        paymentButton.addEventListener('click', function(e) {
            // Start the PayHere payment process
            payhere.startPayment(payment);
        });
    } else {
        console.error("Payment button with ID 'savePayment' not found.");
    }
});*/




