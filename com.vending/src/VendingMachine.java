import java.util.HashMap;
import java.util.Map;

public class VendingMachine {

    private double currentBalance;
    private double totalSales;
    private Map<String, Integer> inventory;
    private Map<String, Double> itemPrices;

    public VendingMachine() {
        inventory = new HashMap<>();
        itemPrices = new HashMap<>();
        currentBalance = 0.0;
        totalSales = 0.0;

        // Initialize inventory with 5 of each item
        inventory.put("Chips", 5);
        inventory.put("Drinks", 5);
        inventory.put("Dessert", 5);
        inventory.put("Gum", 5);

        // Set item prices
        itemPrices.put("Chips", 1.50);
        itemPrices.put("Drinks", 1.00);
        itemPrices.put("Dessert", 2.00);
        itemPrices.put("Gum", 0.75);
    }

    public void insertMoney(double amount) {
        currentBalance += amount;
    }

    public double getCurrentBalance() {
        return currentBalance;
    }

    public boolean checkInventory(String item) {
        return inventory.containsKey(item) && inventory.get(item) > 0;
    }

    public void purchaseItem(String item) {
        double price = itemPrices.get(item);
        if (currentBalance >= price) {
            if (checkInventory(item)) {
                inventory.put(item, inventory.get(item) - 1);
                totalSales += price;
                currentBalance -= price; // Deduct the price from current balance
                System.out.println("Enjoy your " + item + "! " + getSillyMessage(item));
            } else {
                System.out.println("Sorry, " + item + " is out of stock.");
            }
        } else {
            double shortfall = price - currentBalance;
            System.out.println("You don't have enough funds. You need $" + shortfall + " more.");
        }
    }

    public String getSillyMessage(String item) {
        switch (item) {
            case "Chips":
                return "Crunch, crunch, enjoy the munch!";
            case "Drinks":
                return "Slurp, slurp, time to gulp!";
            case "Dessert":
                return "Sweetness overload, enjoy!";
            case "Gum":
                return "Pop it, chew it, love it!";
            default:
                return "Enjoy your snack!";
        }
    }

    public double getTotalSales() {
        return totalSales;
    }

    public void returnChange() {
        double change = currentBalance;
        currentBalance = 0;
        System.out.println("Returning $" + change + " in change.");
    }

    public void generateSalesReport() {
        System.out.println("Total Sales: $" + totalSales);
    }
}

