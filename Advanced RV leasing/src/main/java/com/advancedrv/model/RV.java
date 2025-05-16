package com.advancedrv.model;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class RV {
    private int id;
    private String name;
    private String vin;
    private String drivetrain;
    private BigDecimal monthlyRate;
    private int mileageLimit;
    private String bedSetup;
    private int year;
    private String engine;
    private boolean isAvailable;
    private Timestamp createdAt;

    // Constructors
    public RV() {}

    public RV(int id, String name, String vin, String drivetrain, BigDecimal monthlyRate,
              int mileageLimit, String bedSetup, int year, String engine, boolean isAvailable, Timestamp createdAt) {
        this.id = id;
        this.name = name;
        this.vin = vin;
        this.drivetrain = drivetrain;
        this.monthlyRate = monthlyRate;
        this.mileageLimit = mileageLimit;
        this.bedSetup = bedSetup;
        this.year = year;
        this.engine = engine;
        this.isAvailable = isAvailable;
        this.createdAt = createdAt;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVin() {
        return vin;
    }

    public void setVin(String vin) {
        this.vin = vin;
    }

    public String getDrivetrain() {
        return drivetrain;
    }

    public void setDrivetrain(String drivetrain) {
        this.drivetrain = drivetrain;
    }

    public BigDecimal getMonthlyRate() {
        return monthlyRate;
    }

    public void setMonthlyRate(BigDecimal monthlyRate) {
        this.monthlyRate = monthlyRate;
    }

    public int getMileageLimit() {
        return mileageLimit;
    }

    public void setMileageLimit(int mileageLimit) {
        this.mileageLimit = mileageLimit;
    }

    public String getBedSetup() {
        return bedSetup;
    }

    public void setBedSetup(String bedSetup) {
        this.bedSetup = bedSetup;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getEngine() {
        return engine;
    }

    public void setEngine(String engine) {
        this.engine = engine;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }
}

