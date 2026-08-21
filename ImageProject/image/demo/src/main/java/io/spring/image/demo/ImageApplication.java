package io.spring.image.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SuppressWarnings("unused")
@SpringBootApplication
@EnableJpaAuditing
public class ImageApplication {

//	@Bean
//	public CommandLineRunner commandLineRunner(@Autowired ImageRepository repository){
//		return args -> {
//			Image image = Image
//					.builder()
//					.extension(ImageExtension.JPEG)
//					.name("myimage")
//					.tags("teste")
//					.size(1000L)
//					.build();
//			repository.save(image);
//
//		};
//	}

	public static void main(String[] args) {
		SpringApplication.run(ImageApplication.class, args);
	}

}
