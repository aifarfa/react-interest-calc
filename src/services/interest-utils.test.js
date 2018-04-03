import {
  getAnnaulInterest,
  getNextSimple,
  getSimpleInterestTimeline,
  getPaidInterest,
  round
} from './interest-utils';

describe('interest utils', () => {
  describe('getAnnualInterest', () => {
    it('get year interest rate 4', () => {
      const interest = getAnnaulInterest(1000, 4).toNumber();
      expect(interest).toEqual(40);
    });

    it('get annual interest rate 3.3', () => {
      const interest = getAnnaulInterest(1200, 3.3).toNumber();
      expect(interest).toEqual(39.6);
    });

    it('get annual interest rate 2.5', () => {
      const interest = getAnnaulInterest(1200, 2.5).toNumber();
      expect(interest).toEqual(30);
    });
  });

  describe('getPaidInterest', () => {
    it('paid monthly', () => {
      const interest = getPaidInterest(1000, 4, 1).toNumber();
      expect(interest).toEqual(3.3333333333333335);
    });

    it('paid quaterly', () => {
      const interest = getPaidInterest(1000, 4, 3).toNumber();
      expect(interest).toEqual(10);
    });

    it('get half-yearly', () => {
      const interest = getPaidInterest(1200, 2.5, 6).toNumber();
      expect(interest).toEqual(15);
    });

    it('get annually', () => {
      const interest = getPaidInterest(1200, 2.5, 12).toNumber();
      expect(interest).toEqual(30);
    });
  });

  describe('calculateNext - simple monthly', () => {
    const principal = 1200;
    const rate = 3.3;
    let result;

    beforeEach(() => {
      const interest = getPaidInterest(principal, rate, 1);
      const previous = {
        number: 1,
        principal: principal,
        balance: principal,
        interest: interest
      };
      const getNext = getNextSimple(rate, 1);
      result = getNext(previous);
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

  describe('calculateNext - simple quaterly', () => {
    const principal = 1200;
    const rate = 3.3;
    const firstMonth = {
      number: 1,
      principal: principal,
      balance: principal,
      interest: 0
    };

    let result;

    it('do not add interest until paid time', () => {
      const getNext = getNextSimple(rate, 3);
      const second = getNext(firstMonth);
      const expected = {
        number: 2,
        principal: 1200,
        balance: 1200,
        interest: 0
      };
      expect(second).toEqual(expected);
    });

    it('add interest on third month', () => {
      const getNext = getNextSimple(rate, 3);
      const second = getNext(firstMonth);
      const third = getNext(second);
      const expected = {
        number: 3,
        principal: 1200,
        balance: 1209.9,
        interest: 9.9
      };
      expect(third).toEqual(expected);
    });
  });


  describe('simple saving timeline', () => {

    describe('getTimeline monthly', () => {
      const getTimeline = getSimpleInterestTimeline(15, 1); // monthly
      const principal = 1000;
      const rate = 4;
      let actual;

      beforeEach(() => {
        actual = getTimeline(principal, rate);
      });

      it('reduce range', () => {
        expect(actual).toHaveLength(15);
      });

      it('round precision (40 * 1 / 12)', () => {
        // apply format
        const balance = actual[0].balance;
        const interest = actual[0].interest;

        expect(round(balance)).toEqual('1003.33');
        expect(round(interest)).toEqual('3.33');
      });

      it('annual equivalent rate', () => {
        const balance = actual[11].balance;
        expect(balance).toEqual(1040);
        expect(round(balance)).toEqual('1040.00');
      });

      it('sum up balance', () => {
        const balance = actual[14].balance;
        expect(balance).toEqual(1050);
        expect(round(balance)).toEqual('1050.00');
      });
    });

    describe('getTimeline quaterly', () => {
      const getTimeline = getSimpleInterestTimeline(12, 3);
      const principal = 1000;
      const rate = 4;
      let actual;

      beforeEach(() => {
        actual = getTimeline(principal, rate);
      });

      it('reduce range', () => {
        expect(actual).toHaveLength(12);
      });

      it('add no interest on first month', () => {
        expect(actual[0]['balance']).toEqual(1000);
      });

      it('add no interest on second month', () => {
        expect(actual[1]['balance']).toEqual(1000);
      });

      it('add interest on thrid month', () => {
        expect(actual[2]['balance']).toEqual(1010);
      });

      it('annual equivalent rate', () => {
        const balance = actual[11].balance;
        expect(balance).toEqual(1040);
        expect(round(balance)).toEqual('1040.00');
      });
    });
  });
});
