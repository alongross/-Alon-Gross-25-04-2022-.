class HomePage {
  error() {
    Cypress.on("uncaught:exception", (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
  }
  open() {
    cy.visit("https://automation.herolo.co.il/");
  }
  menu() {
    cy.get("#main_menu").within(() => {
      cy.get("a").should("have.attr", "href").click();
    });
  }
  broken_links() {
    cy.get("a:not([href*='mailto:]']").each(($el) => {
      if ($el.prop("href").length > 20) {
        const message = $el.text();
        expect($el, message).to.have.attr("href").not.contain("undefined");
        cy.log($el.attr("href"));
        let a = $el.attr("href");
      }
    });
  }
  dragdrop() {
    var moveobject;
    cy.get("[data-index]").each(($el) => {
      cy.wrap($el)
        .invoke("attr", "data-index")
        .then(($style1) => {
          moveobject = $style1;
        });
      cy.wrap($el)
        .type("{leftArrow}", { force: true })
        .invoke("attr", "data-index")
        .then(($style1) => {
          cy.wrap($style1).should("contain", moveobject);
        });
    });
  }
  slickdots() {
    cy.get('[class$="commun__Paging-zi6nvq-3 jZSvee"]').each(($el) => {
      cy.wrap($el)
        .click()
        .should(($class1) => {
          expect($class1).not.to.be.null;
        });
    });
  }
  help() {
    cy.get('[id$="name"]').type("magic jorztdan", { force: true });
    cy.get('[id$="email"]').type("kessem8vv@gmail.com", { force: true });
    cy.get('[id$="phone"]').type("0546936122", { force: true });
    cy.get('[id$="company"]').type("idf", { force: true });
    cy.intercept(
      {
        method: "POST",
        url: "https://mdm24dqywk.execute-api.us-east-1.amazonaws.com/development/email-staging",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Referer: "https://automation.herolo.co.il/",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36",
          "sec-ch-ua":
            '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
        },
      },
      (req) => {
        expect(req.body.name).to.include("magic jorztdan");
        expect(req.body.email).to.include("kessem8vv@gmail.com");
        expect(req.body.telephone).to.include("0546936122");
        expect(req.body.needs).to.include("idf");
      }
    ).as("emailstaging");
    cy.get(
      '[class$="commun__Button-zi6nvq-0 commun__ButtonContact-zi6nvq-1 form__ButtonContact-y0ft28-1 llCdxe"]'
    ).click();
    cy.wait(1000);
    cy.wait("@emailstaging")
      .its("response")
      .should("deep.include", {
        statusCode: 200,
        statusMessage: "OK",
      })
      .and("have.property", "body")
      .then((body) => {
        expect(body).to.be.eq("success");
      });
    cy.url().should("include", "/thank-you/");
    cy.get('[class$="thankYou__button-avz2fr-9 fIeAdZ"]').click();
    cy.url().should("include", "herolo");
    cy.go("back");
  }
  validation(re, id, ErrorText) {
    var emails, phons, Testpossibility;
    if (id.includes("email")) {
      emails = (val) => {
        var possibility = "";
        var possible = "abcd@.gh";
        for (var i = 0; i < val; i++) {
          possibility += possible.charAt(
            Math.floor(Math.random() * possible.length)
          );
        }
        return possibility;
      };
    } else {
      phons = (val) => {
        var possibility = "";
        var possible = "0541237896";
        for (var i = 0; i < val; i++) {
          possibility += possible.charAt(
            Math.floor(Math.random() * possible.length)
          );
        }
        return possibility;
      };
    }
    const validates = (possibility) => {
      return re.test(possibility);
    };

    //Test Cases (I have added 10 loops so it will create 10 test cases)
    for (let index = 0; index < 10; index++) {
      if (id.includes("email")) {
        Testpossibility = emails(10);
      } else {
        Testpossibility = phons(10);
      }
      const possibilitytate = validates(Testpossibility);
      cy.get(id).type(Testpossibility, { force: true });
      cy.get(
        '[class$="commun__Button-zi6nvq-0 commun__ButtonContact-zi6nvq-1 form__ButtonContact-y0ft28-1 llCdxe"]'
      ).click();
      if (!possibilitytate) {
        cy.contains(ErrorText).should("be.visible");
      } else {
        cy.contains(ErrorText).should("not.be.visible");
      }
      cy.get(id).clear({ force: true });
    }
  }
  validation2() {
    const longString = ("a", 0x0fffffff + 1);
    cy.get('[id$="name"]').type(longString, { force: true });
    cy.get('[id$="email"]').type("kessem8vv@gmail.com", { force: true });
    cy.get('[id$="phone"]').type("0546936122", { force: true });
    cy.get('[id$="company"]').type(longString, { force: true });
    cy.get(
      '[class$="commun__Button-zi6nvq-0 commun__ButtonContact-zi6nvq-1 form__ButtonContact-y0ft28-1 llCdxe"]'
    ).click();
    cy.url().should("include", "herolo");
    cy.get('[class$="thankYou__backLink-avz2fr-10 bBzcJF"]').click();
    cy.get('[id$="name"]').type(" ", { force: true });
    cy.get('[id$="email"]').type("kessem8vv@gmail.com", { force: true });
    cy.get('[id$="phone"]').type("0546936122", { force: true });
    cy.get('[id$="company"]').type(" ", { force: true });
    cy.get(
      '[class$="commun__Button-zi6nvq-0 commun__ButtonContact-zi6nvq-1 form__ButtonContact-y0ft28-1 llCdxe"]'
    ).click();
    cy.get('[class$="commun__ErrorText-zi6nvq-6 bDkbFh"]').should("be.visible");
  }
}
export default new HomePage();
