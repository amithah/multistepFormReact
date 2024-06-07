import React from "react";
import App from "../../src/App";

describe("<App />", () => {
  it("mounts", () => {
    cy.mount(<App />);
  });

  it("have back button disabled in first step", () => {
    cy.mount(<App />);
    cy.contains("Back").should("be.disabled");
    cy.contains("Next").should("not.be.disabled");
  });

  it("navigates between steps", () => {
    cy.mount(<App />);
    cy.contains("Next").click();
    cy.contains("2/3");
    cy.contains("Next").click();
    cy.contains("3/3");
    cy.contains("Submit");
    cy.contains("Back").click();
    cy.contains("2/3");
    cy.contains("Back").click();
    cy.contains("1/3");
  });

  it("types in the first name field and checks if it updates correctly", () => {
    cy.mount(<App />);
    const firstName = "John";
    cy.get('input[name="firstName"]').type(firstName);
    // Check if the input value is updated
    cy.get('input[name="firstName"]').should("have.value", firstName);
  });

  it("displays an error if only one character in first name", () => {
    cy.mount(<App />);
    const invalidFirstName = "a";
    cy.get('input[name="firstName"]').type(invalidFirstName);
    cy.contains("FirstName should contain at least two characters")
  });
  it("submits the form with valid data", () => {
    cy.mount(<App />);
    // Fill out the form with valid data
    cy.get('input[name="firstName"]').type("John");
    cy.get('input[name="lastName"]').type("Doe");
    cy.contains("Next").click();
    cy.contains("Next").click();
    // Submit the form
    cy.contains("Submit").click();
    // Check if success message is displayed
    cy.contains("Form submitted successfully!").should("be.visible");
  });
});
