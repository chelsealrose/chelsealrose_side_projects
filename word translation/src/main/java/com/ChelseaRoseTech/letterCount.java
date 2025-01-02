package com.ChelseaRoseTech;

public class letterCount {

    public static int countCharacters(String sentence) {
        sentence = sentence.replace(" ", "");  // Remove spaces
        return sentence.length();
    }
}
