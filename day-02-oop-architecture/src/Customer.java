public class Customer extends User {

    public Customer(int id, String name) {
        super(id, name);
    }

    @Override
    public void displayInfo() {
        System.out.println("Customer ID: " + getId());
        System.out.println("Customer Name: " + getName());
    }
}