package com.manish.Albums.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.manish.Albums.model.Photo;

@Repository
public interface PhotoRepository extends JpaRepository<Photo,Long> {
    List<Photo> findByAlbum_id(long id); 
}
