import { Decimal } from 'decimal.js-light';

export const add = (a = 0, b = 0) => {
  return new Decimal(a).add(b).toNumber();
};

export const getAnnaulInterest = (principal, rate) => {
  const interest = new Decimal(principal).mul(rate).div(100);
  return interest;
};

export const getPaidInterest = (principal, rate, frequency = 1) => {
  const annual = getAnnaulInterest(principal, rate);
  return annual.mul(frequency).div(12).toNumber(); // every N month eg. 3/12
};

const getYear = month => new Decimal(month)
    .dividedToIntegerBy(12)
    .toNumber();

export const calculateNextMonth = (rate, frequency, isCompound = false) => previous => {
  const number = previous.number + 1;
  const year = getYear(number);
  const principal = isCompound ? previous.balance : previous.principal;
  const interestIsPaid = number % frequency === 0;
  const interest = interestIsPaid
    ? getPaidInterest(principal, rate, frequency)
    : 0;
  const balance = add(previous.balance, interest);
  const sumInterest = add(interest, previous.sumInterest);

  return { number, year, principal, balance, interest, sumInterest };
};

export const round = (number = 0) => number.toFixed(2);

/**
 * @param {number} month total saving time in month
 * @param {number} frequency interest paid every N month
 * @param {function} getNext calculate previous => next month
 */
export const calculateTimeline = (month, frequency, getNext) => (
  principal,
  rate
) => {
  // init timeline
  const range = Array(month - 1).keys(); // index
  const timeline = Array.from(range); // [...range] spread 1,2,3..
  const next = getNext(rate, frequency);
  const initialValue = {
    number: 0,
    principal,
    interest: 0,
    sumInterest: 0,
    balance: principal,
    year: 1
  };
  const firstMonth = next(initialValue, frequency);
  const result = [firstMonth];

  return timeline.reduce((list, index) => {
    const previous = list[index];
    const nextMonth = next(previous);
    list.push(nextMonth);

    return list;
  }, result);
};

export const getNextSimple = (rate, frequency) =>
  calculateNextMonth(rate, frequency, false);

export const getNextCompound = (rate, frequency) =>
  calculateNextMonth(rate, frequency, true);

export const getSimpleInterestTimeline = (month, frequency) =>
  calculateTimeline(month, frequency, getNextSimple);

export const getCompoundInterestTimeline = (month, frequency) =>
  calculateTimeline(month, frequency, getNextCompound);
