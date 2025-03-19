import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class RockPaperScissorsUI extends JFrame {
    private RockPaperScissorsGame game;
    private JLabel resultLabel, userChoiceLabel, computerChoiceLabel, scoreLabel;

    public RockPaperScissorsUI(RockPaperScissorsGame game) {
        this.game = game;
        setTitle("Rock Paper Scissors");
        setSize(400, 300);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new GridLayout(5, 1));

        getContentPane().setBackground(new Color(229, 229, 255)); // Light blue background

        // Font setup
        Font font = new Font("Arial", Font.BOLD, 20);


        // Labels
        resultLabel = new JLabel("Make your move!", SwingConstants.CENTER);
        resultLabel.setFont(font);
        resultLabel.setForeground(new Color(0, 0, 128));
        userChoiceLabel = new JLabel("Your choice: ", SwingConstants.CENTER);
        userChoiceLabel.setFont(font);
        computerChoiceLabel = new JLabel("Computer choice: ", SwingConstants.CENTER);
        computerChoiceLabel.setFont(font);
        scoreLabel = new JLabel("Score - You: 0 | Computer: 0", SwingConstants.CENTER);
        scoreLabel.setFont(font);

        // Buttons
        JPanel buttonPanel = new JPanel();
        buttonPanel.setBackground(new Color(229, 229, 255));
        JButton rockButton = new JButton("Rock");
        rockButton.setFont(font);
        rockButton.setBackground(new Color(135, 23, 1));
        rockButton.addActionListener(e -> playGame("Rock"));
        JButton paperButton = new JButton("Paper");
        paperButton.setFont(font);
        paperButton.setBackground(new Color(253, 252, 210)); // Medium Sea Green
        paperButton.addActionListener(e -> playGame("Paper"));
        JButton scissorsButton = new JButton("Scissors");
        scissorsButton.setFont(font);
        scissorsButton.setBackground(new Color(255, 215, 0)); // Gold color
        scissorsButton.addActionListener(e -> playGame("Scissors"));


        buttonPanel.add(rockButton);
        buttonPanel.add(paperButton);
        buttonPanel.add(scissorsButton);

        // Add components
        add(resultLabel);
        add(userChoiceLabel);
        add(computerChoiceLabel);
        add(scoreLabel);
        add(buttonPanel);

        setVisible(true);
    }

    private void playGame(String userChoice) {
        String computerChoice = game.getComputerChoice();
        String result = game.determineWinner(userChoice, computerChoice);

        userChoiceLabel.setText("Your choice: " + userChoice);
        computerChoiceLabel.setText("Computer choice: " + computerChoice);
        resultLabel.setText(result);
        scoreLabel.setText("Score - You: " + game.getUserScore() + " | Computer: " + game.getComputerScore());
    }
}
