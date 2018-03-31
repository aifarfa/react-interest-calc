import { Decimal } from 'decimal.js-light';

export const add = (a, b) => {
  return new Decimal(a).add(b).toNumber();
};

export const getYearInterest = (principal, rate) => {
  const interest = new Decimal(principal).mul(rate).div(100);

  return interest.toNumber();
};

export const getMonthInterest = (principal, rate) => {
  const interest = getYearInterest(principal, rate);

  return new Decimal(interest).div(12).toNumber();
};

export const calculateNextMonth = (rate, isCompound) => previous => {
  const number = previous.number + 1;
  const principal = previous.principal;
  const balance = add(previous.balance, previous.interest);
  const interest = getMonthInterest(principal, rate);

  return { number, principal, balance, interest };
};

export const getNextMonthSimple = rate => {
  const simpleInterest = month => false; // never add compound
  return calculateNextMonth(rate, simpleInterest);
};

export const getSimpleInterestTimeline = month => (principal, rate) => {
  // init timeline
  const range = Array(month - 1).keys(); // index
  const timeline = Array.from(range); // [...range] spread 1,2,3..
  const getNext = getNextMonthSimple(rate);
  // initial values
  const firstMonth = {
    number: 1,
    principal: principal,
    balance: principal,
    interest: getMonthInterest(principal, rate)
  };
  const result = [firstMonth];

  return timeline.reduce((list, index) => {
    const previous = list[index];
    const nextMonth = getNext(previous);
    list.push(nextMonth);

    return list;
  }, result);
};
