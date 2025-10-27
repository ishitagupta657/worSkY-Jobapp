package com.ishita.worsky.repository;

import com.ishita.worsky.model.Post;

import java.util.List;

public interface SearchRepository {

    List<Post> findByText(String text);

}

