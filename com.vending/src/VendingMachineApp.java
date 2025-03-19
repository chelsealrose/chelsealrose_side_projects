import javax.swing.*;

public class VendingMachineApp {

    public static void main(String[] args) {
        // Create the VendingMachineUI
        VendingMachineUI vendingMachineUI = new VendingMachineUI();

        // Create the frame to hold the UI
        JFrame frame = new JFrame("Vending Machine");

        // Set the close operation to exit the application when the window is closed
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        // Add the VendingMachineUI panel to the frame
        frame.add(vendingMachineUI.getPanel());

        // Set the size of the frame
        frame.setSize(400, 400);  // You can adjust the size as needed

        // Make the frame visible
        frame.setVisible(true);
    }
}
