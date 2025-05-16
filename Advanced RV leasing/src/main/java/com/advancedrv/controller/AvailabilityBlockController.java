package com.advancedrv.controller;

import com.advancedrv.dao.AvailabilityBlockDao;
import com.advancedrv.model.AvailabilityBlock;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/availability")
public class AvailabilityBlockController {

    private final AvailabilityBlockDao availabilityBlockDao;

    public AvailabilityBlockController(AvailabilityBlockDao availabilityBlockDao) {
        this.availabilityBlockDao = availabilityBlockDao;
    }

    @GetMapping
    public List<AvailabilityBlock> getAllAvailabilityBlocks() {
        return availabilityBlockDao.getAllAvailabilityBlocks();
    }

    @GetMapping("/{id}")
    public AvailabilityBlock getAvailabilityBlockById(@PathVariable int id) {
        return availabilityBlockDao.getAvailabilityBlockById(id);
    }

    @PostMapping
    public void addAvailabilityBlock(@RequestBody AvailabilityBlock block) {
        availabilityBlockDao.addAvailabilityBlock(block);
    }

    @PutMapping("/{id}")
    public void updateAvailabilityBlock(@PathVariable int id, @RequestBody AvailabilityBlock block) {
        block.setId(id);
        availabilityBlockDao.updateAvailabilityBlock(block);
    }

    @DeleteMapping("/{id}")
    public void deleteAvailabilityBlock(@PathVariable int id) {
        availabilityBlockDao.deleteAvailabilityBlock(id);
    }
}
