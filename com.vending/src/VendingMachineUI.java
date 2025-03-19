import javax.swing.*;
import java.awt.*;

public class VendingMachineUI {

    private VendingMachine vendingMachine;
    private JLabel balanceLabel;
    private JLabel sillyMessageLabel;
    private JPanel panel;
    private JButton returnChangeButton;
    private JButton generateReportButton;

    public VendingMachineUI() {
        this.vendingMachine = new VendingMachine();
        panel = new JPanel();
        panel.setLayout(new BorderLayout());

        // Initialize balance label
        balanceLabel = new JLabel("Balance: $" + String.format("%.2f", this.vendingMachine.getCurrentBalance()));
        panel.add(balanceLabel, BorderLayout.NORTH);

        // Initialize silly message label
        sillyMessageLabel = new JLabel("Welcome to the Vending Machine!");
        panel.add(sillyMessageLabel, BorderLayout.CENTER);

        // Add money insertion buttons
        JPanel moneyPanel = new JPanel(new FlowLayout());
        JButton insertOneDollar = new JButton("$1");
        insertOneDollar.addActionListener(e -> insertMoney(1.00));
        moneyPanel.add(insertOneDollar);

        JButton insertQuarter = new JButton("$0.25");
        insertQuarter.addActionListener(e -> insertMoney(0.25));
        moneyPanel.add(insertQuarter);

        JButton insertDime = new JButton("$0.10");
        insertDime.addActionListener(e -> insertMoney(0.10));
        moneyPanel.add(insertDime);

        JButton insertNickel = new JButton("$0.05");
        insertNickel.addActionListener(e -> insertMoney(0.05));
        moneyPanel.add(insertNickel);

        JButton insertPenny = new JButton("$0.01");
        insertPenny.addActionListener(e -> insertMoney(0.01));
        moneyPanel.add(insertPenny);

        panel.add(moneyPanel, BorderLayout.WEST);

        // Add buttons for item purchase
        JPanel itemPanel = new JPanel(new FlowLayout());
        JButton chipsButton = new JButton("Chips");
        chipsButton.addActionListener(e -> purchaseItem("Chips"));
        itemPanel.add(chipsButton);

        JButton drinksButton = new JButton("Drinks");
        drinksButton.addActionListener(e -> purchaseItem("Drinks"));
        itemPanel.add(drinksButton);

        JButton dessertButton = new JButton("Dessert");
        dessertButton.addActionListener(e -> purchaseItem("Dessert"));
        itemPanel.add(dessertButton);

        JButton gumButton = new JButton("Gum");
        gumButton.addActionListener(e -> purchaseItem("Gum"));
        itemPanel.add(gumButton);

        panel.add(itemPanel, BorderLayout.CENTER);

        // Add bottom panel with return change and report buttons
        JPanel bottomPanel = new JPanel(new FlowLayout());
        returnChangeButton = new JButton("Return Change");
        returnChangeButton.addActionListener(e -> returnChange());
        bottomPanel.add(returnChangeButton);

        generateReportButton = new JButton("Generate Sales Report");
        generateReportButton.addActionListener(e -> generateSalesReport());
        bottomPanel.add(generateReportButton);

        panel.add(bottomPanel, BorderLayout.SOUTH);
    }

    private void insertMoney(double amount) {
        vendingMachine.insertMoney(amount);
        updateBalanceLabel();
    }

    private void updateBalanceLabel() {
        balanceLabel.setText("Balance: $" + String.format("%.2f", vendingMachine.getCurrentBalance()));
    }

    private void purchaseItem(String item) {
        vendingMachine.purchaseItem(item);
        updateBalanceLabel();
        updateSillyMessage(vendingMachine.getSillyMessage(item));
    }

    private void updateSillyMessage(String message) {
        sillyMessageLabel.setText(message);
    }

    private void returnChange() {
        vendingMachine.returnChange();
        updateBalanceLabel();
    }

    private void generateSalesReport() {
        vendingMachine.generateSalesReport();
    }

    public JPanel getPanel() {
        return panel;
    }
}

