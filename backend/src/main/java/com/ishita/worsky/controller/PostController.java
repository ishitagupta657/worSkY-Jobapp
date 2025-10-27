package com.ishita.worsky.controller;

import com.ishita.worsky.repository.PostRepository;
import com.ishita.worsky.model.Post;
import com.ishita.worsky.repository.SearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


//import javax.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "https://worsk.netlify.app/")
public class PostController
{

    @Autowired
    PostRepository repo;

    @Autowired
    SearchRepository srepo;

   

    @GetMapping("/allPosts")
    @CrossOrigin
    public List<Post> getAllPosts()
    {
        return repo.findAll();
    }
    // posts/java
    @GetMapping("/posts/{text}")
    @CrossOrigin
    public List<Post> search(@PathVariable String text)
    {
        return srepo.findByText(text);
    }

    @PostMapping("/post")
    @CrossOrigin
    public Post addPost(@RequestBody Post post)
    {
        System.out.println("Received job posting request:");
        System.out.println("Profile: " + post.getProfile());
        System.out.println("Company: " + post.getCompany());
        System.out.println("Location: " + post.getLocation());
        System.out.println("Experience: " + post.getExp());
        System.out.println("Techs: " + java.util.Arrays.toString(post.getTechs()));
        System.out.println("Description: " + post.getDesc());
        System.out.println("Contact Email: " + post.getContactEmail());
        System.out.println("Application Deadline: " + post.getApplicationDeadline());
        
        try {
            Post savedPost = repo.save(post);
            System.out.println("Job posting saved successfully with ID: " + savedPost.getId());
            return savedPost;
        } catch (Exception e) {
            System.err.println("Error saving job posting: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }


}