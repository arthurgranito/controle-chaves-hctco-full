package com.hctco.controlechaves.repositories;

import com.hctco.controlechaves.entities.Registro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistroRepository extends JpaRepository<Registro, Long> {
}
