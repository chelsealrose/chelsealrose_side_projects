package com.advancedrv.dto;

import java.sql.Date;

public class LeaseDto {
    private int rvId;
    private String customerName;
    private Date leaseStartDate;
    private Date leaseEndDate;
// constructor
    public LeaseDto(int rvId, String customerName, Date leaseStartDate, Date leaseEndDate) {
        this.rvId = rvId;
        this.customerName = customerName;
        this.leaseStartDate = leaseStartDate;
        this.leaseEndDate = leaseEndDate;
    }
    //getters and setters

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



}

