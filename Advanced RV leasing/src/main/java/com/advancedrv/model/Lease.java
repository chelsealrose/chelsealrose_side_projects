package com.advancedrv.model;

import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Timestamp;

public class Lease {
    private int id;
    private int rvId;
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private Date leaseStartDate;
    private Date leaseEndDate;
    private BigDecimal agreedRate;
    private int mileageAllowance;
    private boolean insuranceVerified;
    private String notes;
    private String status;
    private Timestamp createdAt;
// constructor
    public Lease(int id, int rvId, String customerName, String customerEmail, String customerPhone, Date leaseStartDate, Date leaseEndDate, BigDecimal agreedRate, int mileageAllowance, boolean insuranceVerified, String notes, String status, Timestamp createdAt) {
        this.id = id;
        this.rvId = rvId;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.customerPhone = customerPhone;
        this.leaseStartDate = leaseStartDate;
        this.leaseEndDate = leaseEndDate;
        this.agreedRate = agreedRate;
        this.mileageAllowance = mileageAllowance;
        this.insuranceVerified = insuranceVerified;
        this.notes = notes;
        this.status = status;
        this.createdAt = createdAt;
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

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public Date getLeaseStartDate() {
        return leaseStartDate;
    }

    public void setLeaseStartDate(Date leaseStartDate) {
        this.leaseStartDate = leaseStartDate;
    }

    public Date getLeaseEndDate() {
        return leaseEndDate;
    }

    public void setLeaseEndDate(Date leaseEndDate) {
        this.leaseEndDate = leaseEndDate;
    }

    public BigDecimal getAgreedRate() {
        return agreedRate;
    }

    public void setAgreedRate(BigDecimal agreedRate) {
        this.agreedRate = agreedRate;
    }

    public int getMileageAllowance() {
        return mileageAllowance;
    }

    public void setMileageAllowance(int mileageAllowance) {
        this.mileageAllowance = mileageAllowance;
    }

    public boolean isInsuranceVerified() {
        return insuranceVerified;
    }

    public void setInsuranceVerified(boolean insuranceVerified) {
        this.insuranceVerified = insuranceVerified;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }
    public Date getStartDate() {
        return getLeaseStartDate();
    }

    public void setStartDate(Date startDate) {
        this.leaseStartDate = startDate;
    }

    public Date getEndDate() {
        return getLeaseEndDate();
    }

    public void setEndDate(Date endDate) {
        this.leaseEndDate = endDate;
    }

    public BigDecimal getMonthlyRate() {
        return getAgreedRate();
    }

    public void setMonthlyRate(BigDecimal monthlyRate) {
        this.agreedRate = monthlyRate;
    }

}

