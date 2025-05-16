package com.advancedrv.dao;

import com.advancedrv.model.RV;
import java.util.List;

public interface RVDao {
    List<RV> getAllRVs();
    RV getRVById(int id);
    void addRV(RV rv);
    void updateRV(RV rv);
    void deleteRV(int id);
    List<RV> getAvailableRVs();
}
