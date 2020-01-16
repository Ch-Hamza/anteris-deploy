package com.anteris.backend.Service;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class StorageService {

    Logger log = LoggerFactory.getLogger(this.getClass().getName());
    public final Path rootLocation = Paths.get("D:\\git repos\\angular-project-tp-gl4\\anteris\\src\\assets\\uploads\\");

    public void store(MultipartFile file, String name) {
        try {
            Files.copy(file.getInputStream(), this.rootLocation.resolve(name));
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("FAIL!");
        }
    }

    public void delete(String fileName) {
        Path rootLocation = Paths.get("D:\\git repos\\angular-project-tp-gl4\\anteris\\src\\assets\\uploads\\" + fileName);
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }

    public Resource loadFile(String filename) {
        try {
            Path file = rootLocation.resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("FAIL!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("FAIL!");
        }
    }

    public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }

    public void init() {
        try {
            Files.createDirectory(rootLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize storage!");
        }
    }
}
