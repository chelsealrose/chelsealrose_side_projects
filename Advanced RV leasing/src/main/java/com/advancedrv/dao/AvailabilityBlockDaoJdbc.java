package com.advancedrv.dao;

import com.advancedrv.model.AvailabilityBlock;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.List;

@Component
public class AvailabilityBlockDaoJdbc implements AvailabilityBlockDao {

    private final JdbcTemplate jdbcTemplate;

    public AvailabilityBlockDaoJdbc(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<AvailabilityBlock> getAllBlocks() {
        String sql = "SELECT * FROM availability_block";
        return jdbcTemplate.query(sql, this::mapRowToBlock);
    }

    @Override
    public AvailabilityBlock getBlockById(int id) {
        String sql = "SELECT * FROM availability_block WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, this::mapRowToBlock, id);
    }

    @Override
    public void addBlock(AvailabilityBlock block) {
        String sql = """
            INSERT INTO availability_block (rv_id, block_start, block_end, reason, created_at)
            VALUES (?, ?, ?, ?, ?)
            """;

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, block.getRvId());
            ps.setDate(2, block.getBlockStart());
            ps.setDate(3, block.getBlockEnd());
            ps.setString(4, block.getReason());
            ps.setTimestamp(5, block.getCreatedAt());
            return ps;
        }, keyHolder);

        if (keyHolder.getKey() != null) {
            block.setId(keyHolder.getKey().intValue());
        }
    }

    @Override
    public void updateBlock(AvailabilityBlock block) {
        String sql = """
            UPDATE availability_block SET
                rv_id = ?, block_start = ?, block_end = ?, reason = ?, created_at = ?
            WHERE id = ?
            """;

        jdbcTemplate.update(sql,
                block.getRvId(),
                block.getBlockStart(),
                block.getBlockEnd(),
                block.getReason(),
                block.getCreatedAt(),
                block.getId()
        );
    }

    @Override
    public void deleteBlock(int id) {
        String sql = "DELETE FROM availability_block WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

    private AvailabilityBlock mapRowToBlock(ResultSet rs, int rowNum) throws SQLException {
        return new AvailabilityBlock(
                rs.getInt("id"),
                rs.getInt("rv_id"),
                rs.getDate("block_start"),
                rs.getDate("block_end"),
                rs.getString("reason"),
                rs.getTimestamp("created_at")
        );
    }
}


