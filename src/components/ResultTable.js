import React from 'react';
import { Table } from 'react-bootstrap';
import Row from './ResultRow';

export default props => {
  // const { number, principal, balance, interest } = props;
  const result = props.result || [];
  const rows = result.map((m, index) => (
    <Row
      key={index}
      number={m.number}
      principal={m.principal}
      interest={m.interest}
      balance={m.balance}
      sumInterest={m.sumInterest}
    />
  ));

  return (
    <Table responsive striped>
      <thead>
        <tr>
          <th className="text-center">month</th>
          <th className="text-center">principal</th>
          <th className="text-center">interest</th>
          <th className="text-center">balance</th>
          <th className="text-center">gained</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};
