class HomePage
{
error()
    {
        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false
          })
    }
open()
{
    cy.visit('https://automation.herolo.co.il/')
}
menu()
{
    cy.get('#main_menu').within(()=>{
        cy.get('a').should('have.attr','href').click()
})
}
footer_menu(footer_menu)
{
    if(cy.url()==='https://techdemotbaseo.kinsta.cloud/')
    {
        cy.get("[id$=pwbox-6379]").type(text)
        cy.contains("Enter").click()
        cy.get('[class$="bettingWrap py-4"]').should('include.text', 'Best Betting Apps in The UK')
    }
    cy.get('[id^=main_menu]').get('[id^=menu-item-]').get('[class^="menu-item menu-item-type-post_type menu-item-object-page menu-item-"]').each(($el) => {
        // condition matching check
        console.log(`footer_menu_list text:${footer_menu}`)
            if ($el.text().includes(footer_menu))
            {
                console.log(`EL click:${$el.text()}`)
                if(Cypress.dom.isDetached($el)===false)
                {
                    cy.wrap($el).find('a').click({force: true})
                     cy.go('back')
            }
            }
        })
}
broken_links()
{
       cy.get("a:not([href*='mailto:]']").each($el => {
 
                if ($el.prop('href').length >20) {
                    const message = $el.text()
                    expect($el, message).to.have.attr("href").not.contain("undefined")
                    cy.log($el.attr('href'))
                   let a=$el.attr('href')
                }
        })
}
password(text)
{
    cy.get("[id$=pwbox-6379]").type(text)
    cy.contains("Enter").click()
    if(text==="optivalqa"){cy.get('[class$="bettingWrap py-4"]').should('include.text', 'Best Betting Apps in The UK')}
}
dragdrop()
{
    var moveobject
    cy.get('[data-index]').each(($el) => {
    cy.wrap($el).invoke('attr', 'data-index').then(($style1) => {
        moveobject = $style1
          })
    cy.wrap($el).type('{leftArrow}',{force: true}).invoke('attr', 'data-index').then(($style1) => {
            cy.wrap($style1).should('contain', moveobject)
          })
})
}
slickdots()
{
    var moveobject
    cy.get('[class$="commun__Paging-zi6nvq-3 jZSvee"]').each(($el) => {
    cy.wrap($el).click().should(($class1) => {
        expect($class1).not.to.be.null
      })
})
}
}
export default new HomePage();
