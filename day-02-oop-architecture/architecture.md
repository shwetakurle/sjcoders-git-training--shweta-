\# Day 2 - Application Architecture



\## Frontend -> REST API -> Backend -> Database -> Response



A user enters booking details such as customer name, service and booking date on the frontend.



The frontend can send the data to an API endpoint such as:



POST /api/bookings



The backend checks whether the customer and service details are valid and then creates the booking.



The database stores information such as customer details, service details, booking ID and booking status.



After saving the booking, the backend returns a response containing the booking ID and status to the frontend.

