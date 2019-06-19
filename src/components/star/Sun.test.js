import React from 'react';
import ReactDOM from 'react-dom';
import Sun from './Sun';
import TestRenderer from 'react-test-renderer';
import sun from '../../static/sun.svg'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Sun svg={sun}/>, div);
});

it('renders correctly', () => {
    let testRenderer = TestRenderer.create(<Sun svgPath={sun}/>)
    console.log(testRenderer.toJSON());
});  
