package com.ChelseaRoseTech;

public class pigLatin {

    public static String convertToPigLatin(String sentence) {
        String[] words = sentence.split("\\s+");
        StringBuilder pigLatinSentence = new StringBuilder();

        for (String word : words) {
            String pigLatinWord = convertWordToPigLatin(word);
            pigLatinSentence.append(pigLatinWord).append(" ");
        }

        return pigLatinSentence.toString().trim();
    }

    private static String convertWordToPigLatin(String word) {
        String vowels = "aeiouAEIOU";
        if (vowels.indexOf(word.charAt(0)) != -1) {  // Word starts with a vowel
            return word + "ay";
        } else {
            int firstVowelIndex = -1;
            for (int i = 0; i < word.length(); i++) {
                if (vowels.indexOf(word.charAt(i)) != -1) {
                    firstVowelIndex = i;
                    break;
                }
            }
            if (firstVowelIndex == -1) {
                return word + "ay";  // No vowels found, just add 'ay'
            } else {
                String consonantPrefix = word.substring(0, firstVowelIndex);
                String restOfWord = word.substring(firstVowelIndex);
                return restOfWord + consonantPrefix + "ay";
            }
        }
    }
}
