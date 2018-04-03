import React from 'react';
import { round } from '../utils/calculator';

export default props => {
  const { number, principal, balance, interest, sumInterest } = props;
  const rounedBalance = round(balance);
  const rounedInterest = round(interest);
  const rounedPrincipal = round(principal);
  const sumOfInterest = round(sumInterest);

  return (
    <tr>
      <td>{number}</td>
      <td>{rounedPrincipal}</td>
      <td>{rounedInterest}</td>
      <td>{rounedBalance}</td>
      <td>{sumOfInterest}</td>
    </tr>
  );
};
