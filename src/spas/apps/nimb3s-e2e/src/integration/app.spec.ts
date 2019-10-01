import { getGreeting } from '../support/app.po';

describe('nimb3s', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to nimb3s!');
  });
});
