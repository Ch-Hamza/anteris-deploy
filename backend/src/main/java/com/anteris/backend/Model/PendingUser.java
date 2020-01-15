package com.anteris.backend.Model;


import javax.persistence.*;

@Entity
@Table(name = "pending_users", uniqueConstraints = { @UniqueConstraint(columnNames = { "email" }) })
public class PendingUser {


    private String id;
    @Id
    private String email;

    public PendingUser() {
    }

    public PendingUser(String id, String email) {
        this.id = id;
        this.email = email;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
