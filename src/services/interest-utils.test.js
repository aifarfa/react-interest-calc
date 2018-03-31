import {
  getYearInterest,
  getMonthInterest,
  getNextMonthSimple,
  getSimpleInterestTimeline
} from './interest-utils';

describe('interest utils', () => {
  describe('getYearInterest', () => {
    it('get year interest rate 4', () => {
      const interest = getYearInterest(1000, 4);
      expect(interest).toEqual(40);
    });

    it('get year interest rate 3.3', () => {
      const interest = getYearInterest(1200, 3.3);
      expect(interest).toEqual(39.6);
    });

    it('get year interest rate 2.5', () => {
      const interest = getYearInterest(1200, 2.5);
      expect(interest).toEqual(30);
    });
  });

  describe('getMonthInterest', () => {
    it('get monthly round at precision 20', () => {
      const interest = getMonthInterest(1000, 4);
      expect(interest).toEqual(3.3333333333333335);
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
    const interest = getMonthInterest(principal, rate);
    const previous = {
      number: 1,
      principal: principal,
      balance: principal,
      interest: interest
    };
    let result;

    beforeEach(() => {
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

  describe('getSimpleInterestTimeline', () => {
    const principal = 1000;
    const getTimeline = getSimpleInterestTimeline(15); // months

    describe('getTimeline round precision', () => {
      const rate = 4;
      let actual;

      beforeEach(() => {
        actual = getTimeline(principal, rate);
      });

      it('reduce range', () => {
        expect(actual.length).toEqual(15);
      });

      it('round precision (40 / 12 * 12)', () => {
        // (40 / 12) * 12
        expect(actual[12]['balance']).toEqual(1040);
      });

      it('sum up balance', () => {
        // (40 / 12) * 12
        expect(actual[14]['balance']).toEqual(1046.6666666666667);
      });
    });

    describe('different rate', () => {
      const rate = 4.2;
      let actual;

      beforeEach(() => {
        actual = getTimeline(principal, rate);
      });

      it('reduce range', () => {
        expect(actual.length).toEqual(15);
      });

      it('sum up balance', () => {
        expect(actual[14]['balance']).toEqual(1049);
      });
    });
  });
});
