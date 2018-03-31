import { Decimal } from 'decimal.js-light';

export const getYearInterest = (principal, rate) => {
  const interest = new Decimal(principal).mul(rate).div(100);

  return interest.toNumber();
};

export const getMonthInterest = (principal, rate) => {
  const interest = getYearInterest(principal, rate);

  return new Decimal(interest).div(12).toNumber();
};

export const calculateNextMonth = rate => previous => {
  const number = previous.number + 1;
  const principal = previous.principal;
  const balance = previous.balance + previous.interest;
  const interest = getMonthInterest(principal, rate);

  return { number, principal, balance, interest };
};
