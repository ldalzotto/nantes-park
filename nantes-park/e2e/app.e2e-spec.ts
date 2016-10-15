import { NantesParkPage } from './app.po';

describe('nantes-park App', function() {
  let page: NantesParkPage;

  beforeEach(() => {
    page = new NantesParkPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
