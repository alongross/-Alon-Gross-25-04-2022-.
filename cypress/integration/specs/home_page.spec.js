import homepage from "../page_objects/home_page";
describe("Testing automation herolo", () => {
  afterEach(() => {
    homepage.error();
  });
  it("check if the web page is loding", () => {
    homepage.open();
  });
  it("check linkes", () => {
    homepage.broken_links();
  });
  it("check drag", () => {
    homepage.dragdrop();
  });
  it("click", () => {
    homepage.slickdots();
  });
  it("click", () => {
    homepage.help();
  });
  it("click", () => {
    homepage.validation2();
    homepage.validation(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      '[id$="email"]',
      "כתובת אימייל לא חוקית"
    );
    homepage.validation(
      /^\+?(972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/,
      '[id$="phone"]',
      "מספר טלפון לא חוקי"
    );
  });
});
