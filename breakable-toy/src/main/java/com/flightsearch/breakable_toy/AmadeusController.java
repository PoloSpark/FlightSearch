package com.flightsearch.breakable_toy;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/amadeus")
public class AmadeusController {
    @Value("${amadeus.client-id}")
    private String clientId;

    @Value("${amadeus.client-secret}")
    private String clientSecret;

    private final RestTemplate restTemplate = new RestTemplate();
    private String accessToken;
    private long tokenExpirationTime;
    private final String tokenUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";


    @GetMapping("/")
    public String hello() {
        return "Hello World Travel!";
    }

    @GetMapping("/flights")
    public ResponseEntity<String> getFlights(@RequestParam String origin, @RequestParam String destination, @RequestParam String departureDate, @RequestParam String adults) {
        String token = getAccessToken();

        String url = String.format(
                "https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=%s&destinationLocationCode=%s&departureDate=%s&adults=%s",
                origin, destination, departureDate, adults
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);

        HttpEntity<Void> request = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                request,
                String.class
        );

        return ResponseEntity.ok(response.getBody());
    }

    public String getAccessToken() {
        try {
            if (accessToken != null && System.currentTimeMillis() < tokenExpirationTime) {
                //System.out.println("Returning cached token: " + accessToken);
                return accessToken;
            }

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            body.add("grant_type", "client_credentials");
            body.add("client_id", clientId);
            body.add("client_secret", clientSecret);

            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    tokenUrl,
                    HttpMethod.POST,
                    request,
                    String.class
            );

            //System.out.println("Token Response: " + response.getBody());

            if (response.getStatusCode() == HttpStatus.OK) {
                JsonNode jsonResponse = new ObjectMapper().readTree(response.getBody());
                String newAccessToken = jsonResponse.get("access_token").asText();
                int expiresIn = jsonResponse.get("expires_in").asInt();

                this.accessToken = newAccessToken;
                this.tokenExpirationTime = System.currentTimeMillis() + (expiresIn * 1000);

                //System.out.println("New access token: " + newAccessToken);
                return newAccessToken;
            } else {
                throw new RuntimeException("Failed to retrieve access token. Status: " + response.getStatusCode());
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error while retrieving access token: " + e.getMessage(), e);
        }
    }

}
