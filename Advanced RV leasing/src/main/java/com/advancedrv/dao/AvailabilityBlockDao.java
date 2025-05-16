package com.advancedrv.dao;

import com.advancedrv.model.AvailabilityBlock;
import java.util.List;

public interface AvailabilityBlockDao {
    List<AvailabilityBlock> getAllBlocks();
    AvailabilityBlock getBlockById(int id);
    void addBlock(AvailabilityBlock block);
    void updateBlock(AvailabilityBlock block);
    void deleteBlock(int id);
}


