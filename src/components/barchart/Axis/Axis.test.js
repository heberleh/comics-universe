import React from 'react';
import ReactDOM from 'react-dom';
import Axis from './Axis';
import {scaleLinear} from 'd3-scale'

// Check this article to complete the testing file
// https://medium.com/selleo/testing-react-components-best-practices-2f77ac302d12
// and this https://reactjs.org/docs/test-utils.html
describe('Axis', function() {
    describe('Render', function() {
        it('renders without crashing', () => {
        const div = document.createElement('div');

        const props = {
            orient: "Left",
            ticks: [4],
            tickPadding: [12],
            translate: 'translate(100,100)' ,
            scale: scaleLinear().domain([100, 1000]).range([50, 500])
        }
        ReactDOM.render(<Axis {...props} />, div);
        
        });
    });
});
