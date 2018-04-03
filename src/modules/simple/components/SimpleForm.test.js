
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { SimpleFormComponent } from './SimpleForm';
import { Button, FormControl } from 'react-bootstrap';
import * as sinon from 'sinon';

describe('SimpleForm', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SimpleFormComponent />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders principal input', () => {
    const expected = 43210.0;
    const form = shallow(<SimpleFormComponent principal={expected} />);
    const input = form.find(FormControl).first()
    // console.log(input.html())
    expect(input.prop('value')).toEqual(expected)
  });

  it('renders rate input', () => {
    const expected = 5.5;
    const form = shallow(<SimpleFormComponent rate={expected} />);
    const input = form.find(FormControl).at(1)

    expect(input.prop('value')).toEqual(expected)
  });

  it('renders timePeriod input', () => {
    const expected = 12;
    const form = shallow(<SimpleFormComponent timePeriod={expected} />);
    const input = form.find(FormControl).at(2)

    expect(input.prop('value')).toEqual(expected)
  });

  it('renders frequency input', () => {
    const expected = 6;
    const form = shallow(<SimpleFormComponent frequency={expected} />);
    const input = form.find(FormControl).at(3)

    expect(input.prop('value')).toEqual(expected)
  });

  it('handle principal change', () => {
    const action = sinon.spy();
    const form = shallow(<SimpleFormComponent onPrincipalChange={action} />);
    const input = form.find(FormControl).at(0)
    const expected = { target: { value: 1000 } }

    input.simulate('change', expected)
    sinon.assert.calledWith(action, expected)
  });

  it('handle rate change', () => {
    const action = sinon.spy();
    const form = shallow(<SimpleFormComponent onRateChange={action} />);
    const input = form.find(FormControl).at(1)
    const expected = { target: { value: 1 } }

    input.simulate('change', expected)
    sinon.assert.calledWith(action, expected)
  });

  it('handle timePeriod change', () => {
    const action = sinon.spy();
    const form = shallow(<SimpleFormComponent onTimePeriodChange={action} />);
    const input = form.find(FormControl).at(2)
    const expected = { target: { value: 12 } }

    input.simulate('change', expected)
    sinon.assert.calledWith(action, expected)
  });

  it('handle frequency change', () => {
    const action = sinon.spy();
    const form = shallow(<SimpleFormComponent onFrequencyChange={action} />);
    const input = form.find(FormControl).at(3)
    const expected = { target: { value: 6 } }

    input.simulate('change', expected)
    sinon.assert.calledWith(action, expected)
  });

  it('disable button when hasErrors', () => {
    const form = shallow(<SimpleFormComponent hasErrors />);
    const button = form.find(Button).first()

    expect(button.prop('disabled')).toBe(true)
  });

  it('enable button when no error', () => {
    const form = shallow(<SimpleFormComponent />);
    const button = form.find(Button).first()

    expect(button.prop('disabled')).toBe(false)
  });

  it('calls onSubmit when clicked', () => {
    const submit = sinon.spy();
    const form = shallow(<SimpleFormComponent onSubmit={submit} />);
    const button = form.find(Button).first()

    button.simulate('click', {})
    sinon.assert.calledOnce(submit)
  });

  it('calls onReset when clicked', () => {
    const reset = sinon.spy();
    const form = shallow(<SimpleFormComponent onReset={reset} />);
    const button = form.find(Button).last()

    button.simulate('click', {})
    sinon.assert.calledOnce(reset)
  });
})
