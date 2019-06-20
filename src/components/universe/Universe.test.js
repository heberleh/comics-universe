import React from 'react';
import ReactDOM from 'react-dom';
import Universe from './Universe';


describe('Universe', function() {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Universe />, div);
  });
});