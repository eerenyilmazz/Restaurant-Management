package com.restaurant.dtos;

import lombok.Data;

@Data
public class SignupRequest {

    /* Bu kod, kullanıcı kayıt isteği için kullanılan SignupRequest
    DTO (Data Transfer Object) sınıfını tanımlar. Bu sınıf,
    kullanıcıdan alınan kayıt bilgilerini taşıyan basit bir Java
    nesnesidir. DTO sınıfları, veri taşımak için kullanılan
    nesnelerdir ve genellikle kontrolcü ile servisler arasındaki veri
    alışverişinde kullanılır. */

    private String name;
    private String email;
    private String password;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
