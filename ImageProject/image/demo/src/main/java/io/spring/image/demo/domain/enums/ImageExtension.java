package io.spring.image.demo.domain.enums;

import java.util.Arrays;

import org.springframework.http.MediaType;

import lombok.Getter;

@SuppressWarnings("unused")
public enum ImageExtension {
    PNG (MediaType.IMAGE_PNG),
    JPG (MediaType.IMAGE_JPEG),
    GIF (MediaType.IMAGE_GIF),
    JPEG (MediaType.IMAGE_JPEG);
//    WEBP (MediaType.IMAGE);

    @Getter
    private final MediaType mediaType;

    ImageExtension(MediaType mediaType){
        this.mediaType = mediaType;
    }

    public static ImageExtension valueOf(MediaType mediaType){
        return Arrays.stream(values())
                .filter(ie-> ie.mediaType.equals(mediaType)).findFirst().orElse(null);
    }
    public static ImageExtension ofName(String name){
        return Arrays.stream(values())
                .filter(ie-> ie.name().equals(name))
                .findFirst()
                .orElse(null);
    }

}