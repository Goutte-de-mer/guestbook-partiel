Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("matched") || err.message.includes("left")) {
    return false;
  }
  return true;
});

describe("Guestbook E2E Test", () => {
  it("should load the page and submit a message", () => {
    let callCount = 0;

    cy.intercept("GET", "http://localhost:3001/users/messages", (req) => {
      callCount++;
      if (callCount === 1) {
        req.reply({
          statusCode: 200,
          body: { success: true, messages: [] },
        });
      } else {
        req.reply({
          statusCode: 200,
          body: {
            success: true,
            messages: [
              {
                _id: "123",
                name: "Test User",
                message: "Hello World",
                createdAt: new Date().toISOString(),
              },
            ],
          },
        });
      }
    }).as("getMessages");

    cy.intercept("POST", "http://localhost:3001/users/new-message", {
      statusCode: 201,
      body: {
        success: true,
        message: "Message créé avec succès",
        data: {
          _id: "123",
          name: "Test User",
          message: "Hello World",
          createdAt: new Date().toISOString(),
        },
      },
    }).as("postMessage");

    cy.visit("/");
    cy.contains("Chargement des messages").should("be.visible");
    cy.wait("@getMessages");

    cy.get('input[name="name"]').type("Test User");
    cy.get('textarea[name="message"]').type("Hello World");
    cy.get('button[type="submit"]').click();
    cy.wait("@postMessage");
    cy.wait("@getMessages");

    cy.contains("Test User").should("be.visible");
    cy.contains("Hello World").should("be.visible");
  });
});
