import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import ResultTable from './ResultTable';
import ResultRow from './ResultRow';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ResultTable />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders result: monthly', () => {
  const sample = [
    { number: 1, principal: 100, balance: 100, interest: 0 },
    { number: 2, principal: 100, balance: 110, interest: 10 },
    { number: 3, principal: 100, balance: 120, interest: 10 }
  ];
  const table = shallow(<ResultTable result={sample} monthly />);
  const rows = table.find(ResultRow);

  expect(rows).toHaveLength(3);
});

it('renders result: annually', () => {
  const sample = [
    { number: 1, principal: 100, balance: 100, interest: 0 },
    { number: 2, principal: 100, balance: 110, interest: 10 },
    { number: 3, principal: 100, balance: 120, interest: 10 },
    { number: 4, principal: 100, balance: 130, interest: 10 },
    { number: 5, principal: 100, balance: 140, interest: 10 },
    { number: 6, principal: 100, balance: 150, interest: 10 },
    { number: 7, principal: 100, balance: 160, interest: 10 },
    { number: 8, principal: 100, balance: 170, interest: 10 },
    { number: 9, principal: 100, balance: 180, interest: 10 },
    { number: 10, principal: 100, balance: 190, interest: 10 },
    { number: 11, principal: 100, balance: 200, interest: 10 },
    { number: 12, principal: 100, balance: 210, interest: 10 },
    { number: 13, principal: 100, balance: 220, interest: 10 },
  ];
  const table = shallow(<ResultTable result={sample} />);
  const rows = table.find(ResultRow);

  expect(rows).toHaveLength(1);
});
