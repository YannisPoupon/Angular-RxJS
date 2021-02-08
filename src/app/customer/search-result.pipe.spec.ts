import { Customer } from './model/Customer';
import { SearchResultPipe } from './search-result.pipe';

describe('SearchResultPipe', () => {
  it('create an instance', () => {
    const pipe = new SearchResultPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return sentence with fullName and email', () => {
    const customer : Customer = {
      id: 10,
      fullName : 'Yannis Poupon',
      email : 'pp@test.com',
      invoices : []
    };

    const pipe = new SearchResultPipe;

    const resultat = pipe.transform(customer);

    expect(resultat).toBe('Yannis Poupon (pp@test.com)')
  })

  it('should apply strong tag on matched elements', () => {
    const customer : Customer = {
      id: 10,
      fullName : 'Yannis Poupon',
      email : 'pp@test.com',
      invoices : []
    };

    const search = "ann";

    const pipe = new SearchResultPipe;
    const resultat = pipe.transform(customer, search);
    expect(resultat).toBe("Y<strong>ann</strong>is Poupon (pp@test.com)")
  })

  it('should apply strong tag on EACH matched elements', () => {
    const customer : Customer = {
      id: 10,
      fullName : 'Yannis Annour',
      email : 'annour@test.com',
      invoices : []
    };

    const search = "ann";

    const pipe = new SearchResultPipe;
    const resultat = pipe.transform(customer, search);
    expect(resultat).toBe("Y<strong>ann</strong>is <strong>Ann</strong>our (<strong>ann</strong>our@test.com)")
  })
});
