class CelestialBody {
    private String name;
    private double gravity;

    public CelestialBody(String name, double gravity) {
        this.name = name;
        this.gravity = gravity;
    }

    public String getName() {
        return name;
    }

    public double getGravity() {
        return gravity;
    }
}

