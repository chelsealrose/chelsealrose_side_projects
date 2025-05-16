package com.advancedrv.dao;

import com.advancedrv.model.RV;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class RVDaoImpl implements RVDao {

    private final Connection conn;

    public RVDaoImpl(Connection conn) {
        this.conn = conn;
    }

    @Override
    public List<RV> getAllRVs() {
        List<RV> rvs = new ArrayList<>();
        String sql = "SELECT * FROM rv";
        try (Statement stmt = conn.createStatement(); ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                rvs.add(mapResultSetToRV(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return rvs;
    }

    @Override
    public RV getRVById(int id) {
        String sql = "SELECT * FROM rv WHERE id = ?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return mapResultSetToRV(rs);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void addRV(RV rv) {
        String sql = "INSERT INTO rv (name, vin, drivetrain, monthly_rate, mileage_limit, bed_setup, year, engine, is_available, created_at) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, rv.getName());
            stmt.setString(2, rv.getVin());
            stmt.setString(3, rv.getDrivetrain());
            stmt.setBigDecimal(4, rv.getMonthlyRate());
            stmt.setInt(5, rv.getMileageLimit());
            stmt.setString(6, rv.getBedSetup());
            stmt.setInt(7, rv.getYear());
            stmt.setString(8, rv.getEngine());
            stmt.setBoolean(9, rv.isAvailable());
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void updateRV(RV rv) {
        String sql = "UPDATE rv SET name = ?, vin = ?, drivetrain = ?, monthly_rate = ?, mileage_limit = ?, " +
                "bed_setup = ?, year = ?, engine = ?, is_available = ? WHERE id = ?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, rv.getName());
            stmt.setString(2, rv.getVin());
            stmt.setString(3, rv.getDrivetrain());
            stmt.setBigDecimal(4, rv.getMonthlyRate());
            stmt.setInt(5, rv.getMileageLimit());
            stmt.setString(6, rv.getBedSetup());
            stmt.setInt(7, rv.getYear());
            stmt.setString(8, rv.getEngine());
            stmt.setBoolean(9, rv.isAvailable());
            stmt.setInt(10, rv.getId());
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteRV(int id) {
        String sql = "DELETE FROM rv WHERE id = ?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<RV> getAvailableRVs() {
        List<RV> rvs = new ArrayList<>();
        String sql = "SELECT * FROM rv WHERE is_available = TRUE";
        try (Statement stmt = conn.createStatement(); ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                rvs.add(mapResultSetToRV(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return rvs;
    }

    private RV mapResultSetToRV(ResultSet rs) throws SQLException {
        RV rv = new RV();
        rv.setId(rs.getInt("id"));
        rv.setName(rs.getString("name"));
        rv.setVin(rs.getString("vin"));
        rv.setDrivetrain(rs.getString("drivetrain"));
        rv.setMonthlyRate(rs.getBigDecimal("monthly_rate"));
        rv.setMileageLimit(rs.getInt("mileage_limit"));
        rv.setBedSetup(rs.getString("bed_setup"));
        rv.setYear(rs.getInt("year"));
        rv.setEngine(rs.getString("engine"));
        rv.setAvailable(rs.getBoolean("is_available"));
        rv.setCreatedAt(rs.getTimestamp("created_at"));
        return rv;
    }
}

