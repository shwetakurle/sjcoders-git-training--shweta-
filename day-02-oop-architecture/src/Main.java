import java.util.ArrayList;
import java.util.HashSet;
import java.util.HashMap;

public class Main {

    public static void main(String[] args) {

        Customer customer1 = new Customer(1, "Aarav");
        Customer customer2 = new Customer(2, "Neha");
        Customer customer3 = new Customer(3, "Rahul");

        Service service1 = new Service(101, "Consultation", 500);
        Service service2 = new Service(102, "Health Checkup", 800);
        Service service3 = new Service(103, "Online Booking", 300);

        Booking booking1 =
                new Booking(1001, customer1, service1, "CREATED");

        Booking booking2 =
                new Booking(1002, customer2, service2, "CONFIRMED");

        Booking booking3 =
                new Booking(1003, customer3, service3, "CREATED");

        // ArrayList
        ArrayList<Booking> bookings = new ArrayList<>();

        bookings.add(booking1);
        bookings.add(booking2);
        bookings.add(booking3);

        System.out.println("All Bookings:");

        for (Booking booking : bookings) {
            booking.displayBooking();
        }

        // HashSet
        HashSet<String> serviceNames = new HashSet<>();

        serviceNames.add(service1.getName());
        serviceNames.add(service2.getName());
        serviceNames.add(service3.getName());

        System.out.println("\nUnique Services:");

        for (String serviceName : serviceNames) {
            System.out.println(serviceName);
        }

        // HashMap
        HashMap<Integer, Booking> bookingMap = new HashMap<>();

        bookingMap.put(booking1.getBookingId(), booking1);
        bookingMap.put(booking2.getBookingId(), booking2);
        bookingMap.put(booking3.getBookingId(), booking3);

        System.out.println("\nSearch Booking ID 1002:");

        Booking foundBooking = bookingMap.get(1002);

        if (foundBooking != null) {
            foundBooking.displayBooking();
        }

        // Polymorphism
        User user = new Customer(4, "Priya");
        user.displayInfo();

        // Abstraction
        NotificationService notification =
                new EmailNotification();

        notification.sendNotification(
                "Your booking has been created successfully."
        );
    }
}