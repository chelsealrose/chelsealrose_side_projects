package com.advancedrv.model;

import java.sql.Date;
import java.sql.Timestamp;

public class AvailabilityBlock {
    private int id;
    private int rvId;
    private Date blockStart;
    private Date blockEnd;
    private String reason;
    private Timestamp createdAt;
// constructor
    public AvailabilityBlock(int id, int rvId, Date blockStart, Date blockEnd, String reason, Timestamp createdAt) {
        this.id = id;
        this.rvId = rvId;
        this.blockStart = blockStart;
        this.blockEnd = blockEnd;
        this.reason = reason;
        this.createdAt = createdAt;
    }

    public AvailabilityBlock() {

    }

    // getters and setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getRvId() {
        return rvId;
    }

    public void setRvId(int rvId) {
        this.rvId = rvId;
    }

    public Date getBlockStart() {
        return blockStart;
    }

    public void setBlockStart(Date blockStart) {
        this.blockStart = blockStart;
    }

    public Date getBlockEnd() {
        return blockEnd;
    }

    public void setBlockEnd(Date blockEnd) {
        this.blockEnd = blockEnd;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }
    public Date getStartDate() {
        return getBlockStart();
    }

    public Date getEndDate() {
        return getBlockEnd();
    }

    public boolean isAvailable() {
        return reason == null || reason.trim().isEmpty() || reason.equalsIgnoreCase("AVAILABLE");
    }
    public void setStartDate(Date startDate) {
        this.blockStart = startDate;
    }

    public void setEndDate(Date endDate) {
        this.blockEnd = endDate;
    }

    public void setAvailable(boolean available) {
        if (available) {
            this.reason = "AVAILABLE";
        } else {
            this.reason = "UNAVAILABLE"; // Or you can set it based on specific use-case like "LEASED", "MAINTENANCE", etc.
        }
    }
}

