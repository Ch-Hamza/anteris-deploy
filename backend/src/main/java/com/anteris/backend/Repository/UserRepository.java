package com.anteris.backend.Repository;


import com.anteris.backend.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Optional<User> findByIdAndEnabled(long id, Boolean enabled);
    List<User> findUsersByEnabled(boolean enabled);

    @Query(value = "SELECT * FROM users LEFT JOIN user_roles ON users.id=user_roles.user_id LEFT JOIN roles ON user_roles.role_id = roles.id WHERE roles.name = ?1", nativeQuery = true)
    List<User> findUsersByRoles(String role);

    Boolean existsByUsername(String username);
    Boolean existsByEmail(String username);

    Long countByUsername(String username);

    @Query(value = "SELECT COUNT(*) FROM users LEFT JOIN user_roles ON users.id=user_roles.user_id LEFT JOIN roles ON user_roles.role_id = roles.id WHERE roles.name = ?1", nativeQuery = true)
    Long countByRoles(String role);

    @Query(value = "SELECT COUNT(*) FROM users", nativeQuery = true)
    long count();

    @Query(value = "SELECT * FROM users order by id limit ?2 OFFSET ?1", nativeQuery = true)
    List<User> getUsersWithFilters(String offset, int limit);
}
