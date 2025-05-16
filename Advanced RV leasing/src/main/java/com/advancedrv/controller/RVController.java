package com.advancedrv.controller;

import com.advancedrv.dao.RVDao;
import com.advancedrv.model.RV;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rvs")
public class RVController {

    private final RVDao rvDao;

    public RVController(RVDao rvDao) {
        this.rvDao = rvDao;
    }

    @GetMapping
    public List<RV> getAllRVs() {
        return rvDao.getAllRVs();
    }

    @GetMapping("/{id}")
    public RV getRVById(@PathVariable int id) {
        return rvDao.getRVById(id);
    }

    @PostMapping
    public void addRV(@RequestBody RV rv) {
        rvDao.addRV(rv);
    }

    @PutMapping("/{id}")
    public void updateRV(@PathVariable int id, @RequestBody RV rv) {
        rv.setId(id);
        rvDao.updateRV(rv);
    }

    @DeleteMapping("/{id}")
    public void deleteRV(@PathVariable int id) {
        rvDao.deleteRV(id);
    }

    @GetMapping("/available")
    public List<RV> getAvailableRVs() {
        return rvDao.getAvailableRVs();
    }
}

