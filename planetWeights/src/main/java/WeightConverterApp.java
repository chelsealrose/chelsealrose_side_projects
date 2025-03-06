import java.util.List;
import java.util.Scanner;

public class WeightConverterApp {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        boolean continueConversion = true;

        while (continueConversion) {
            System.out.println("Choose a celestial body:");
            List<CelestialBody> bodies = CelestialBodies.getBodies();
            for (int i = 0; i < bodies.size(); i++) {
                System.out.println((i + 1) + ". " + bodies.get(i).getName());
            }

            System.out.print("Enter the number of your choice: ");
            int choice = scanner.nextInt();
            CelestialBody selectedBody = CelestialBodies.getBodyByIndex(choice);

            if (selectedBody == null) {
                System.out.println("Invalid choice. Please try again.");
                continue;
            }

            System.out.print("Enter your weight on Earth: ");
            double weight = scanner.nextDouble();

            double convertedWeight = WeightConverter.convertWeight(weight, selectedBody);
            System.out.println("Your weight on " + selectedBody.getName() + " would be: " + convertedWeight + " kg");

            System.out.print("Would you like to perform another conversion? (yes/no): ");
            String response = scanner.next();
            if (!response.equalsIgnoreCase("yes")) {
                continueConversion = false;
            }
        }

        System.out.println("Thank you for using the Weight Converter!");
    }
}