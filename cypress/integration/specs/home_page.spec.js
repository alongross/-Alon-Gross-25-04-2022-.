import homepage from "../page_objects/home_page";
describe("Testing automation herolo", () => {
  afterEach(() => {
    homepage.error();
  });
  it("Testing if the web page is loding", () => {
    homepage.open();
  });
  it("Testing the linkes", () => {
    homepage.broken_links();
  });
  it("Testing the drag option", () => {
    homepage.dragdrop();
  });
  it("Testing the dots", () => {
    homepage.slickdots();
  });
  it("Testing if 'Want to hear more?' option is working", () => {
    homepage.help();
  });
  it("Testing the validation name and company", () => {
    homepage.validation2();
  });
  it("Testing the validation of emails and phones", () => {
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
