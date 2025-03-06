class WeightConverter {
    public static double convertWeight(double weight, CelestialBody body) {
        return (weight / 9.81) * body.getGravity();
    }
}
