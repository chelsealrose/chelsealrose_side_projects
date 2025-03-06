import java.util.ArrayList;
import java.util.List;

class CelestialBodies {
    private static final List<CelestialBody> BODIES = new ArrayList<>();

    static {
        BODIES.add(new CelestialBody("Mercury", 3.7));
        BODIES.add(new CelestialBody("Venus", 8.87));
        BODIES.add(new CelestialBody("Earth", 9.81));
        BODIES.add(new CelestialBody("Mars", 3.71));
        BODIES.add(new CelestialBody("Jupiter", 24.79));
        BODIES.add(new CelestialBody("Saturn", 10.44));
        BODIES.add(new CelestialBody("Uranus", 8.69));
        BODIES.add(new CelestialBody("Neptune", 11.15));
        BODIES.add(new CelestialBody("Moon", 1.62));
    }

    public static List<CelestialBody> getBodies() {
        return BODIES;
    }

    public static CelestialBody getBodyByIndex(int index) {
        if (index < 1 || index > BODIES.size()) {
            return null;
        }
        return BODIES.get(index - 1);
    }
}