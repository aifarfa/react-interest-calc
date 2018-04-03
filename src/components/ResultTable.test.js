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

it('renders result', () => {
  const sample = [
    { number: 1, principal: 100, balance: 100, interest: 0 },
    { number: 2, principal: 100, balance: 110, interest: 10 },
    { number: 3, principal: 100, balance: 120, interest: 10 }
  ];
  const table = shallow(<ResultTable result={sample} />);
  const rows = table.find(ResultRow);

  expect(rows).toHaveLength(3);
});
