package com.hctco.controlechaves.services;

import com.hctco.controlechaves.entities.Registro;
import com.hctco.controlechaves.repositories.RegistroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RegistroService {
    @Autowired
    private RegistroRepository repository;

    public List<Registro> findAll() {
        return repository.findAll();
    }

    public Registro findById(Long id) {
        Optional<Registro> registro = repository.findById(id);

        return registro.get();
    }

    public Registro insert(Registro registro) {
        return repository.save(registro);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public Registro update(Long id, Registro registro) {
        Registro entity = repository.getReferenceById(id);
        updateData(entity, registro);

        return repository.save(entity);
    }

    public void updateData(Registro entity, Registro registro) {
        entity.setMatricula(registro.getMatricula());
        entity.setChave(registro.getChave());
        entity.setDataRetirada(registro.getDataRetirada());
        entity.setNoPrazo(registro.getNoPrazo());
    }

}
