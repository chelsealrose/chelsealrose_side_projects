package com.advancedrv.dao;

import com.advancedrv.model.Lease;
import java.util.List;

public interface LeaseDao {
    List<Lease> getAllLeases();
    Lease getLeaseById(int id);
    void addLease(Lease lease);
    void updateLease(Lease lease);
    void deleteLease(int id);
}



