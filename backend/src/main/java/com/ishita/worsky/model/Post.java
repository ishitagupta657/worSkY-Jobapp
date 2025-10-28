package com.ishita.worsky.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.Arrays;
import java.util.Date;

@Document(collection = "JobPost")
public class Post {
    @Id
    private String id;
    private String profile;
    private String desc;
    private int exp;
    private String[] techs;
    private String company;
    private String location;
    private String type;
    private String salary;
    private String requirements;
    private String benefits;
    private String contactEmail;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "UTC")
    private Date applicationDeadline;
    private String status;
    private int applications;
    private int views;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ", timezone = "UTC")
    private Date postedDate;
    private String employerId;

    public Post() {
        this.postedDate = new Date();
        this.status = "Active";
        this.applications = 0;
        this.views = 0;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProfile() {
        return profile;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public int getExp() {
        return exp;
    }

    public void setExp(int exp) {
        this.exp = exp;
    }

    public String[] getTechs() {
        return techs;
    }

    public void setTechs(String[] techs) {
        this.techs = techs;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSalary() {
        return salary;
    }

    public void setSalary(String salary) {
        this.salary = salary;
    }

    public String getRequirements() {
        return requirements;
    }

    public void setRequirements(String requirements) {
        this.requirements = requirements;
    }

    public String getBenefits() {
        return benefits;
    }

    public void setBenefits(String benefits) {
        this.benefits = benefits;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public Date getApplicationDeadline() {
        return applicationDeadline;
    }

    public void setApplicationDeadline(Date applicationDeadline) {
        this.applicationDeadline = applicationDeadline;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getApplications() {
        return applications;
    }

    public void setApplications(int applications) {
        this.applications = applications;
    }

    public int getViews() {
        return views;
    }

    public void setViews(int views) {
        this.views = views;
    }

    public Date getPostedDate() {
        return postedDate;
    }

    public void setPostedDate(Date postedDate) {
        this.postedDate = postedDate;
    }

    public String getEmployerId() {
        return employerId;
    }

    public void setEmployerId(String employerId) {
        this.employerId = employerId;
    }

    @Override
    public String toString() {
        return "Post{" +
                "id='" + id + '\'' +
                ", profile='" + profile + '\'' +
                ", desc='" + desc + '\'' +
                ", exp=" + exp +
                ", techs=" + Arrays.toString(techs) +
                ", company='" + company + '\'' +
                ", location='" + location + '\'' +
                ", type='" + type + '\'' +
                ", salary='" + salary + '\'' +
                ", requirements='" + requirements + '\'' +
                ", benefits='" + benefits + '\'' +
                ", contactEmail='" + contactEmail + '\'' +
                ", applicationDeadline=" + applicationDeadline +
                ", status='" + status + '\'' +
                ", applications=" + applications +
                ", views=" + views +
                ", postedDate=" + postedDate +
                ", employerId='" + employerId + '\'' +
                '}';
    }
}