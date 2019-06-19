import React from 'react';
import ReactDOM from 'react-dom';
import Sun from './Sun';
import TestRenderer from 'react-test-renderer';
import sun from '../../static/images/sun.svg'


describe('Sun class', function() {
  describe('Renders and load Sun.svg', function() { 

      it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Sun svgPath={sun}/>, div);
      });

      it('renders correctly', () => {
          let testRenderer = TestRenderer.create(<Sun svgPath={sun}/>)
          console.log(testRenderer.toJSON());
      });  

    });
});