package com.iit.dsr.repository;

import com.iit.dsr.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    void deleteByIdNotIn(List<Long> ids);
}
