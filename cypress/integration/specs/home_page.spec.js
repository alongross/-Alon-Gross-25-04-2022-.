import homepage from "../page_objects/home_page";
describe('Testing techdemotbaseo', () => {
    afterEach(() => {
        homepage.error()
      })
    it('check if the web page is loding',() => {
        homepage.open()
    })
    it('check linkes',() => {
        homepage.broken_links()
    })
    it('check drag',() => {
        homepage.dragdrop()
    })
    it.only('click',() => {
        homepage.open()
        homepage.slickdots()
    })
})