package com.iit.dsr.controller;

import com.iit.dsr.model.Project;
import com.iit.dsr.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    @GetMapping
    public ResponseEntity<List<Project>> getProjects() {
        return ResponseEntity.ok(projectRepository.findAll());
    }

    @PostMapping
    @Transactional
    public ResponseEntity<?> saveProjects(@RequestBody List<Project> projects) {
        if (projects != null && !projects.isEmpty()) {
            List<Long> incomingIds = projects.stream().map(Project::getId).collect(Collectors.toList());
            projectRepository.deleteByIdNotIn(incomingIds);
            projectRepository.saveAll(projects);
        } else {
            projectRepository.deleteAll();
        }
        return ResponseEntity.ok(Map.of("success", true));
    }
}
