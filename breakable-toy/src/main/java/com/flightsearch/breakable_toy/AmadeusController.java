package com.flightsearch.breakable_toy;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/amadeus")
@CrossOrigin(origins = "http://localhost:3000")
public class AmadeusController {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${amadeus.client-id}")
    private String clientId;

    @Value("${amadeus.client-secret}")
    private String clientSecret;

    private String accessToken;
    private long tokenExpirationTime;
    private final String tokenUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";

    @GetMapping("/")
    public String hello() {
        return "Hello World Travel!";
    }

    @GetMapping("/locations")
    public ResponseEntity<String> getLocations(@RequestParam String subtype, @RequestParam String keyword) {
        String token = getAccessToken();

        String url = String.format(
                "https://test.api.amadeus.com/v1/reference-data/locations?subType=%s&keyword=%s",
                subtype, keyword
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

    @GetMapping("/locationsById")
    public ResponseEntity<String> getLocationsById(@RequestParam String locationId) {
        String token = getAccessToken();

        String url = String.format(
                "https://test.api.amadeus.com/v1/reference-data/locations/%s",
                locationId
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

    @GetMapping("/airlines")
    public ResponseEntity<String> getAirlines(@RequestParam String airlineCodes) {
        String token = getAccessToken();

        String url = String.format(
                "https://test.api.amadeus.com/v1/reference-data/airlines?airlineCodes=%s",
                airlineCodes
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

    @GetMapping("/flights")
    public ResponseEntity<String> getFlights(@RequestParam String origin, @RequestParam String destination, @RequestParam String departureDate, @RequestParam Optional<String> returnDate, @RequestParam(defaultValue = "false") boolean nonStop, @RequestParam String adults, @RequestParam Optional<String> currencyCode) {

        String token = getAccessToken();


        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl("https://test.api.amadeus.com/v2/shopping/flight-offers?")
                .queryParam("originLocationCode", origin)
                .queryParam("destinationLocationCode", destination)
                .queryParam("departureDate", departureDate)
                .queryParam("adults", adults);

        returnDate.ifPresent(date -> uriBuilder.queryParam("returnDate", date));

        if (nonStop) {
            uriBuilder.queryParam("nonStop", true);
        }

        currencyCode.ifPresent(currency -> uriBuilder.queryParam("currencyCode", currency));

        String url = uriBuilder.toUriString();

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
