package com.laraid.ganeshfest.config;

import com.laraid.ganeshfest.util.UploadDir;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.convert.ReadingConverter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//👉 This makes everything inside your local uploads/ folder available at http://localhost:9494/uploads/....
@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final UploadDir uploadBaseDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Ensure trailing slash is present
        String location = "file:" + (
                uploadBaseDir.getBaseDir().endsWith("/")
                        ? uploadBaseDir.getBaseDir()
                        : uploadBaseDir.getBaseDir() + "/"
        );

        // ✅ Serve uploaded files
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations(location);

        // ✅ Serve default image from classpath
        registry.addResourceHandler("/default.png")
                .addResourceLocations("classpath:/static/images/");
    }


//    @Override
//    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        registry.addResourceHandler("/uploads/**")
//                .addResourceLocations("file:uploads/");
//    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:5174", "http://localhost:5173")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
