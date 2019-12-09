package com.anteris.backend.Model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private boolean enabled;

    @Column(length = 10000)
    private String description;

    /*@OneToMany(targetEntity = VoteOption.class)
    private List<VoteOption> voteOptionList;*/

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "vote_roles", joinColumns = @JoinColumn(name = "vote_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> role_restriction = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Role> getRole_restriction() {
        return role_restriction;
    }

    public void setRole_restriction(Set<Role> role_restriction) {
        this.role_restriction = role_restriction;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
}
