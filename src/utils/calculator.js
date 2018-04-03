import { Decimal } from 'decimal.js-light';

export const add = (a, b) => {
  return new Decimal(a).add(b).toNumber();
};

export const getAnnaulInterest = (principal, rate) => {
  const interest = new Decimal(principal).mul(rate).div(100);
  return interest;
};

export const getPaidInterest = (principal, rate, frequency = 1) => {
  const annual = getAnnaulInterest(principal, rate);
  return annual.mul(frequency).div(12); // every N month eg. 3/12
}

export const calculateNextMonth = (rate, frequency, isCompound = false) => previous => {
  const number = previous.number + 1;
  const principal = isCompound ? previous.balance : previous.principal;
  const interestIsPaid = (number % frequency === 0);
  const interest = interestIsPaid ? getPaidInterest(principal, rate, frequency).toNumber() : 0;
  const balance = add(previous.balance, interest);

  return { number, principal, balance, interest };
};

export const round = number => number.toFixed(2);

/**
 * @param {number} month total saving time in month
 * @param {number} frequency interest paid every N month
 * @param {function} getNext calculate previous => next month
 */
export const calculateTimeline = (month, frequency, getNext) => (principal, rate) => {
  // init timeline
  const range = Array(month - 1).keys(); // index
  const timeline = Array.from(range); // [...range] spread 1,2,3..
  const next = getNext(rate, frequency);
  const initialValue = {
    number: 0,
    principal,
    interest: 0,
    balance: principal
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

export const getNextSimple = (rate, frequency) => calculateNextMonth(rate, frequency, false);

export const getNextCompound = (rate, frequency) => calculateNextMonth(rate, frequency, true);

export const getSimpleInterestTimeline = (month, frequency) => calculateTimeline(month, frequency, getNextSimple);

export const getCompoundInterestTimeline = (month, frequency) => calculateTimeline(month, frequency, getNextCompound);