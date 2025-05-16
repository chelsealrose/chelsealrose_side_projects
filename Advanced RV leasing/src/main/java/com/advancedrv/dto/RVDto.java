package com.advancedrv.dto;

import java.math.BigDecimal;

public class RVDto {
    private int id;
    private String name;
    private BigDecimal monthlyRate;
    private boolean isAvailable;
// constructor
    public RVDto(int id, String name, BigDecimal monthlyRate, boolean isAvailable) {
        this.id = id;
        this.name = name;
        this.monthlyRate = monthlyRate;
        this.isAvailable = isAvailable;
    }
// getters and setters
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

    public BigDecimal getMonthlyRate() {
        return monthlyRate;
    }

    public void setMonthlyRate(BigDecimal monthlyRate) {
        this.monthlyRate = monthlyRate;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }
}

