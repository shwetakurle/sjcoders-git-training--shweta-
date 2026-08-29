public class User {
    private int id;
    private String name;

    public User(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void displayInfo() {
        System.out.println("User ID: " + id);
        System.out.println("Name: " + name);
    }
}