package com.ChelseaRoseTech;
import java.io.*;
import java.util.Scanner;
public class WordTranslation {

    // Display the menu options
    public static void showMenu() {
        System.out.println("Choose an option:");
        System.out.println("1. Convert to Pig Latin");
        System.out.println("2. Convert to Uppercase");
        System.out.println("3. Convert to Lowercase");
        System.out.println("4. Count Characters (excluding spaces)");
        System.out.println("5. Exit");
    }

    // Method to log input and output to a file
    public static void logToFile(String input, String output) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("log.txt", true))) {
            writer.write("Input: " + input + "\n");
            writer.write("Output: " + output + "\n\n");
        } catch (IOException e) {
            System.out.println("Error writing to log file: " + e.getMessage());
        }
    }

    // Main method
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        while (true) {
            showMenu();
            try {
                System.out.print("Enter your choice (1-5): ");
                int choice = Integer.parseInt(scanner.nextLine());

                if (choice == 5) {
                    System.out.println("Exiting the program. Goodbye!");
                    break;
                }

                System.out.print("Enter a sentence: ");
                String sentence = scanner.nextLine().trim();

                // Check for empty input
                if (sentence.isEmpty()) {
                    throw new IllegalArgumentException("Input cannot be empty. Please provide a valid sentence.");
                }

                // Process input and generate the appropriate output
                String output = "";
                switch (choice) {
                    case 1:
                        output = pigLatin.convertToPigLatin(sentence);
                        System.out.println("Pig Latin: " + output);
                        break;
                    case 2:
                        output = upperCase.convertToUppercase(sentence);
                        System.out.println("Uppercase: " + output);
                        break;
                    case 3:
                        output = lowerCase.convertToLowercase(sentence);
                        System.out.println("Lowercase: " + output);
                        break;
                    case 4:
                        output = String.valueOf(letterCount.countCharacters(sentence));
                        System.out.println("Character Count: " + output);
                        break;
                    default:
                        System.out.println("Invalid choice. Please select a valid option (1-5).");
                        continue;
                }

                // Log the input and output to the file
                logToFile(sentence, output);

            } catch (NumberFormatException e) {
                System.out.println("Error: Invalid menu choice. Please enter a number between 1 and 5.");
            } catch (IllegalArgumentException e) {
                System.out.println("Error: " + e.getMessage());
            } catch (Exception e) {
                System.out.println("An unexpected error occurred: " + e.getMessage());
            }
        }

        scanner.close();
    }
}