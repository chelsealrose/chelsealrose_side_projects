package com.advancedrv.dao;

import com.advancedrv.model.Lease;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.List;

@Component
public class LeaseDaoJdbc implements LeaseDao {

    private final JdbcTemplate jdbcTemplate;

    public LeaseDaoJdbc(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Lease> getAllLeases() {
        String sql = "SELECT * FROM lease";
        return jdbcTemplate.query(sql, this::mapRowToLease);
    }

    @Override
    public Lease getLeaseById(int id) {
        String sql = "SELECT * FROM lease WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, this::mapRowToLease, id);
    }

    @Override
    public void addLease(Lease lease) {
        String sql = """
                INSERT INTO lease (
                    rv_id, customer_name, customer_email, customer_phone,
                    lease_start_date, lease_end_date, agreed_rate, mileage_allowance,
                    insurance_verified, notes, status, created_at
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """;

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, lease.getRvId());
            ps.setString(2, lease.getCustomerName());
            ps.setString(3, lease.getCustomerEmail());
            ps.setString(4, lease.getCustomerPhone());
            ps.setDate(5, lease.getLeaseStartDate());
            ps.setDate(6, lease.getLeaseEndDate());
            ps.setBigDecimal(7, lease.getAgreedRate());
            ps.setInt(8, lease.getMileageAllowance());
            ps.setBoolean(9, lease.isInsuranceVerified());
            ps.setString(10, lease.getNotes());
            ps.setString(11, lease.getStatus());
            ps.setTimestamp(12, lease.getCreatedAt());
            return ps;
        }, keyHolder);

        if (keyHolder.getKey() != null) {
            lease.setId(keyHolder.getKey().intValue());
        }
    }

    @Override
    public void updateLease(Lease lease) {
        String sql = """
                UPDATE lease SET
                    rv_id = ?, customer_name = ?, customer_email = ?, customer_phone = ?,
                    lease_start_date = ?, lease_end_date = ?, agreed_rate = ?, mileage_allowance = ?,
                    insurance_verified = ?, notes = ?, status = ?, created_at = ?
                WHERE id = ?
                """;

        jdbcTemplate.update(sql,
                lease.getRvId(),
                lease.getCustomerName(),
                lease.getCustomerEmail(),
                lease.getCustomerPhone(),
                lease.getLeaseStartDate(),
                lease.getLeaseEndDate(),
                lease.getAgreedRate(),
                lease.getMileageAllowance(),
                lease.isInsuranceVerified(),
                lease.getNotes(),
                lease.getStatus(),
                lease.getCreatedAt(),
                lease.getId()
        );
    }

    @Override
    public void deleteLease(int id) {
        String sql = "DELETE FROM lease WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

    private Lease mapRowToLease(ResultSet rs, int rowNum) throws SQLException {
        return new Lease(
                rs.getInt("id"),
                rs.getInt("rv_id"),
                rs.getString("customer_name"),
                rs.getString("customer_email"),
                rs.getString("customer_phone"),
                rs.getDate("lease_start_date"),
                rs.getDate("lease_end_date"),
                rs.getBigDecimal("agreed_rate"),
                rs.getInt("mileage_allowance"),
                rs.getBoolean("insurance_verified"),
                rs.getString("notes"),
                rs.getString("status"),
                rs.getTimestamp("created_at")
        );
    }
}
