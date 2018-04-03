import { Decimal } from 'decimal.js-light';

export const add = (a, b) => {
  return new Decimal(a).add(b).toNumber();
};

export const getAnnaulInterest = (principal, rate) => {
  const interest = new Decimal(principal).mul(rate).div(100);
  return interest;
};

export const getPaidInterest = (principal, rate, frequency = 1) => {
  // console.log('getPaidInterest', principal, rate, frequency)
  const annual = getAnnaulInterest(principal, rate);
  return annual.mul(frequency).div(12); // every N month eg. 3/12
}

export const calculateNextMonth = (rate, frequency) => previous => {
  const number = previous.number + 1;
  const principal = previous.principal; // simple
  const interestIsPaid = (number % frequency === 0);
  const interest = interestIsPaid ? getPaidInterest(principal, rate, frequency).toNumber() : 0;
  const balance = add(previous.balance, interest);

  return { number, principal, balance, interest };
};

export const round = number => number.toFixed(2);

export const getNextMonthSimple = (rate, frequency) => {
  // TODO: apply balance update function
  return calculateNextMonth(rate, frequency);
};

/**
 * @param {*} month total saving time in month
 * @param {*} frequency interest paid every N month
 */
export const getSimpleInterestTimeline = (month, frequency) => (principal, rate) => {
  // init timeline
  const range = Array(month - 1).keys(); // index
  const timeline = Array.from(range); // [...range] spread 1,2,3..
  const getNext = getNextMonthSimple(rate, frequency);
  const initialValue = {
    number: 0,
    principal,
    interest: 0,
    balance: principal
  };
  const firstMonth = getNext(initialValue);
  const result = [firstMonth];

  return timeline.reduce((list, index) => {
    const previous = list[index];
    const nextMonth = getNext(previous);
    list.push(nextMonth);

    return list;
  }, result);
};
