
import { expect } from 'chai';
const cTable = require('console.table');

import LoadDataset from './LoadDataset'

describe('Characters Management', function() {
    describe('Creating objects of class Character', function(){
        
        it('Loading Marvel json',()=>{
            let data = LoadDataset.marvelData()
            //console.log(data)
        });

    });
});