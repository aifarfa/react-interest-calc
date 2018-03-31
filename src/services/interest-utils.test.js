import {
  getYearInterest,
  getMonthInterest,
  getNextMonthSimple
} from './interest-utils';

describe('interest utils', () => {
  describe('getMonthInterest', () => {
    it('get year interest rate 3.3', () => {
      const interest = getYearInterest(1200, 3.3);
      expect(interest).toEqual(39.6);
    });

    it('get year interest rate 2.5', () => {
      const interest = getYearInterest(1200, 2.5);
      expect(interest).toEqual(30);
    });

    it('get monthly interest rate 3.3', () => {
      const monthly = getMonthInterest(1200, 3.3);
      expect(monthly).toEqual(3.3);
    });

    it('get monthly interest rate 2.5', () => {
      const monthly = getMonthInterest(1200, 2.5);
      expect(monthly).toEqual(2.5);
    });
  });

  describe('getNextMonth - simple', () => {
    const principal = 1200;
    const rate = 3.3;
    let result;

    beforeEach(() => {
      const interest = getMonthInterest(principal, rate);
      const previous = {
        number: 1,
        principal,
        balance: principal,
        interest
      };
      const getNext = getNextMonthSimple(rate);
      result = getNext(previous);
      // console.log('result', result);
    });

    it('add number ', () => {
      expect(result.number).toEqual(2);
    });

    it('add balance', () => {
      expect(result.balance).toEqual(1203.3);
    });

    it('keep principal', () => {
      expect(result.principal).toEqual(principal);
    });

    it('add interest', () => {
      expect(result.interest).toEqual(3.3);
    });
  });
});
