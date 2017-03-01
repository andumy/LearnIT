import { LearnITPage } from './app.po';

describe('learn-it App', function() {
  let page: LearnITPage;

  beforeEach(() => {
    page = new LearnITPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
