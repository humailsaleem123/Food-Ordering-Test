describe("Home Page", () => {
  it("should load the homepage successfully", () => {
    // Visit the homepage
    cy.visit("http://localhost:3000/");

    cy.wait(2000);
    cy.get(
      'span[class="pi pi-thumbtack text-lime-500 cursor-pointer hover:text-lime-700 right-[7rem] xl:right-[10rem] p-input-icon"]'
    ).click();
    cy.wait(5000);
    cy.get('button[aria-label="Find Restaurants"]').click();
    cy.wait(2000);
    cy.get('button[aria-label="Other Restaurants"]').click();
    cy.get('button[aria-label="Show On Map"]').first().click();
    cy.wait(2000);
    cy.contains("h4", "Discover Nearby Restaurants with Spot Delivery!").should(
      "be.visible"
    );

    cy.get('div[data-pc-name="menubar"]').should("exist");
  });
});
