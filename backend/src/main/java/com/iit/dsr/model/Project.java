package com.iit.dsr.model;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "projects")
public class Project {
    
    @Id
    private Long id;
    
    private String title;
    private String district;
    @Column(name = "project_year") // year is a reserved word in some DBs
    private String year;
    private String mineral;
    private String rivers;
    private Integer progress;
    private String status;
    private String createdAt;
    private Integer signatures;

    @Column(columnDefinition = "TEXT")
    private String additionalDataJson;

    @Transient
    private Map<String, Object> additionalProperties = new HashMap<>();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }
    
    public String getYear() { return year; }
    public void setYear(String year) { this.year = year; }
    
    public String getMineral() { return mineral; }
    public void setMineral(String mineral) { this.mineral = mineral; }
    
    public String getRivers() { return rivers; }
    public void setRivers(String rivers) { this.rivers = rivers; }
    
    public Integer getProgress() { return progress; }
    public void setProgress(Integer progress) { this.progress = progress; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
    
    public Integer getSignatures() { return signatures; }
    public void setSignatures(Integer signatures) { this.signatures = signatures; }

    @JsonAnyGetter
    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    @JsonAnySetter
    public void setAdditionalProperty(String name, Object value) {
        this.additionalProperties.put(name, value);
    }

    @PrePersist
    @PreUpdate
    public void serializeAdditionalData() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            this.additionalDataJson = mapper.writeValueAsString(additionalProperties);
        } catch (JsonProcessingException e) {
            this.additionalDataJson = "{}";
        }
    }

    @PostLoad
    public void deserializeAdditionalData() {
        try {
            if (this.additionalDataJson != null && !this.additionalDataJson.isEmpty()) {
                ObjectMapper mapper = new ObjectMapper();
                this.additionalProperties = mapper.readValue(this.additionalDataJson, new TypeReference<Map<String, Object>>() {});
            }
        } catch (JsonProcessingException e) {
            this.additionalProperties = new HashMap<>();
        }
    }
}
