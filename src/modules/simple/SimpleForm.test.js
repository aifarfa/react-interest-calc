
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { SimpleFormComponent } from './SimpleForm';
import { FormControl } from 'react-bootstrap';

describe('SimpleForm', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SimpleFormComponent />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders principal input', () => {
    const expected = 43210.0;
    const form = shallow(<SimpleFormComponent principal={expected} onChange={() => {}} />);
    const input = form.find(FormControl).first();
    // console.log(input.html())
    expect(input.prop('value')).toEqual(expected)
  });

  it('renders rate input', () => {
    const expected = 5.5;
    const form = shallow(<SimpleFormComponent rate={expected} onChange={() => {}} />);
    const input = form.find(FormControl).at(1)

    expect(input.prop('value')).toEqual(expected)
  });

  it('renders timePeriod input', () => {
    const expected = 12;
    const form = shallow(<SimpleFormComponent timePeriod={expected} onChange={() => {}} />);
    const input = form.find(FormControl).at(2)
    
    expect(input.prop('value')).toEqual(expected)
  });
})
