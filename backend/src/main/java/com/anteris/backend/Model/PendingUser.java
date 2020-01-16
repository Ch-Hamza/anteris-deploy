package com.anteris.backend.Model;


import javax.persistence.*;

@Entity
@Table(name = "pending_users", uniqueConstraints = { @UniqueConstraint(columnNames = { "email" }) })
public class PendingUser {


    private String link;
    @Id
    private String email;

    public PendingUser() {
    }

    public PendingUser(String link, String email) {
        this.link = link;
        this.email = email;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
