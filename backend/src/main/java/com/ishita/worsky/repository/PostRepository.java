package com.ishita.worsky.repository;

import com.ishita.worsky.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostRepository extends MongoRepository<Post,String>
{

}