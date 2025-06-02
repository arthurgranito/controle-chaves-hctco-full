package com.hctco.controlechaves.controllers;


import com.hctco.controlechaves.entities.Registro;
import com.hctco.controlechaves.services.RegistroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/registros")
public class RegistroController {
    @Autowired
    private RegistroService service;

    @GetMapping
    public ResponseEntity<List<Registro>> findAll() {
        List<Registro> registros = service.findAll();

        return ResponseEntity.ok().body(registros);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Registro> findById(@PathVariable Long id) {
        Registro registro = service.findById(id);

        return ResponseEntity.ok().body(registro);
    }

    @PostMapping
    public ResponseEntity<Registro> insert(@RequestBody Registro registro) {
        registro = service.insert(registro);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("${id}").buildAndExpand(registro.getId()).toUri();
        return ResponseEntity.created(uri).body(registro);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);

        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Registro> update(@PathVariable Long id, @RequestBody Registro registro){
        registro = service.update(id, registro);

        return ResponseEntity.ok().body(registro);
    }
}
