import java.util.Random;

public class RockPaperScissorsGame {
    private String[] choices = {"Rock", "Paper", "Scissors"};
    private int userScore = 0;
    private int computerScore = 0;

    public String getComputerChoice() {
        return choices[new Random().nextInt(choices.length)];
    }

    public String determineWinner(String userChoice, String computerChoice) {
        if (userChoice.equals(computerChoice)) {
            return "It's a Tie!";
        } else if ((userChoice.equals("Rock") && computerChoice.equals("Scissors")) ||
                (userChoice.equals("Paper") && computerChoice.equals("Rock")) ||
                (userChoice.equals("Scissors") && computerChoice.equals("Paper"))) {
            userScore++;
            return "You Win!";
        } else {
            computerScore++;
            return "Computer Wins!";
        }
    }

    public int getUserScore() {
        return userScore;
    }

    public int getComputerScore() {
        return computerScore;
    }
}
