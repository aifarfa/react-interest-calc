import React from 'react';
import { round } from '../services/interest-utils';

export default props => {
  const { number, principal, balance, interest } = props;
  const rounedBalance = round(balance);
  const rounedInterest = round(interest);
  const rounedPrincipal = round(principal);

  return (
    <tr>
      <td>{number}</td>
      <td>{rounedPrincipal}</td>
      <td>{rounedInterest}</td>
      <td>{rounedBalance}</td>
    </tr>
  )
}