package com.hctco.controlechaves.entities;

import jakarta.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

@Entity
@Table(name = "registros")
public class Registro implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String chave;
    private Instant dataRetirada;
    private String matricula;
    private Boolean noPrazo;
    private Boolean entregue;

    public Registro() {
    }

    public Registro(Long id, String chave, Instant dataRetirada, String matricula, Boolean noPrazo,Boolean entregue) {
        this.id = id;
        this.chave = chave;
        this.dataRetirada = dataRetirada;
        this.matricula = matricula;
        this.noPrazo = noPrazo;
        this.entregue = entregue;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getChave() {
        return chave;
    }

    public void setChave(String chave) {
        this.chave = chave;
    }

    public Instant getDataRetirada() {
        return dataRetirada;
    }

    public void setDataRetirada(Instant dataRetirada) {
        this.dataRetirada = dataRetirada;
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public Boolean getNoPrazo() {
        return noPrazo;
    }

    public void setNoPrazo(Boolean noPrazo) {
        this.noPrazo = noPrazo;
    }

    public Boolean getEntregue() {
        return entregue;
    }

    public void setEntregue(Boolean entregue) {
        this.entregue = entregue;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Registro registro = (Registro) o;
        return Objects.equals(id, registro.id) && Objects.equals(chave, registro.chave);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, chave);
    }
}
