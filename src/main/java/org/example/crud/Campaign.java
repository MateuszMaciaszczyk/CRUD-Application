package org.example.crud;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class Campaign {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String keywords;

    @NotNull
    @Min(0)
    private double bidAmount;

    @NotNull
    @Min(0)
    private double campaignFund;

    @NotBlank
    private String status;

    @NotBlank
    private String town;

    @NotNull
    @Min(0)
    private int radius;
}
