import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import LoadDataset from '../../dataset/LoadDataset'
import Galaxy from './Galaxy'

describe('Galaxy', function() {
  describe('Renders', function() { 

      it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Galaxy data={LoadDataset.marvelData()} comic='marvel' x={50} y={50}/>, div);
      });

      it('renders correctly', () => {
          let testRenderer = TestRenderer.create(<Galaxy data={LoadDataset.marvelData()} comic='marvel'  x={50} y={50}/>)
          //console.log(testRenderer.toJSON());
      });  

    });
});