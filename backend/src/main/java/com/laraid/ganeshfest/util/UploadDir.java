package com.laraid.ganeshfest.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;

@Component
public class UploadDir {

    @Value("${app.upload-dir}")
    private String uploadBaseDir;

    public String getUploadDir(String code) {
        return uploadBaseDir + File.separator + code;
    }

    public String getBaseDir() {
        return uploadBaseDir;
    }
}
