package com.anteris.backend.Message.response;

import com.anteris.backend.Message.request.UserInfo;
import org.springframework.security.core.GrantedAuthority;
import java.util.Collection;

public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private UserInfo user;
    private Collection<? extends GrantedAuthority> authorities;

    public JwtResponse(String token, UserInfo user, Collection<? extends GrantedAuthority> authorities) {
        this.token = token;
        this.user = user;
        this.authorities = authorities;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getTokenType() {
        return type;
    }

    public void setTokenType(String tokenType) {
        this.type = tokenType;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public UserInfo getUser() {
        return user;
    }

    public void setUser(UserInfo user) {
        this.user = user;
    }
}
