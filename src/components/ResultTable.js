import React from 'react';
import { Table } from 'react-bootstrap';
import Row from './ResultRow';

export default props => {
  // const { number, principal, balance, interest } = props;
  const data = props.result || [];
  const result = props.monthly
    ? data
    : data.filter(item => item.number % 12 === 0); // only year end.

  const rows = result.map((m, index) => (
    <Row
      key={index}
      number={props.monthly ? m.number : m.year}
      principal={m.principal}
      interest={props.monthly ? m.interest : m.yearInterest}
      balance={m.balance}
      sumInterest={m.sumInterest}
    />
  ));

  const mode = props.monthly ? 'month' : 'year';
  return (
    <Table responsive striped>
      <thead>
        <tr>
          <th className='text-center'>{mode}</th>
          <th className='text-center'>principal</th>
          <th className='text-center'>interest</th>
          <th className='text-center'>sum</th>
          <th className='text-center'>balance</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};
