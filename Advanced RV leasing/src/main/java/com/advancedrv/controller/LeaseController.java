package com.advancedrv.controller;

import com.advancedrv.dao.LeaseDao;
import com.advancedrv.model.Lease;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leases")
public class LeaseController {

    private final LeaseDao leaseDao;

    public LeaseController(LeaseDao leaseDao) {
        this.leaseDao = leaseDao;
    }

    @GetMapping
    public List<Lease> getAllLeases() {
        return leaseDao.getAllLeases();
    }

    @GetMapping("/{id}")
    public Lease getLeaseById(@PathVariable int id) {
        return leaseDao.getLeaseById(id);
    }

    @PostMapping
    public void addLease(@RequestBody Lease lease) {
        leaseDao.addLease(lease);
    }

    @PutMapping("/{id}")
    public void updateLease(@PathVariable int id, @RequestBody Lease lease) {
        lease.setId(id);
        leaseDao.updateLease(lease);
    }

    @DeleteMapping("/{id}")
    public void deleteLease(@PathVariable int id) {
        leaseDao.deleteLease(id);
    }
}

