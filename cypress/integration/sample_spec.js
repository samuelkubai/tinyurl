describe("Shorten form", () => {
  it("it shortens a user provided url", () => {
    cy.server()
    cy.route("/api/shorten?url=https://example.test", { code: "ABCD", destination: "https://example.test" })
    cy.visit("/")
    cy.get("input").type("https://example.test").should("have.value", "https://example.test")
    cy.get("button").click()
    cy.get(".results__link").contains("http://localhost:3000/ABCD")
  })

  it("redirects to the provided destination url", () => {
    cy.server()
    cy.route("/api/retrieve?code=ABCD", { code: "ABCD", destination: "http://localhost:3000" }).as("retrieveUrl")
    cy.visit("/ABCD")
    cy.wait("@retrieveUrl")
    cy.url().should("eq", "http://localhost:3000/")
  })

  it("shows an error page when invalid code is provided", () => {
    cy.server()
    cy.route({
      url: "/api/retrieve?code=ABCDE",
      response: { code: "ABCDE" },
      status: 404,
    }).as("retrieveUrl")
    cy.visit("/ABCDE")
    cy.wait("@retrieveUrl")
    cy.get(".not-found-message").contains("The route cannot be matched")
  })
})
