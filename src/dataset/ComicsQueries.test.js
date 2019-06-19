
import { expect } from 'chai';
const cTable = require('console.table');

import ComicsQueries from './ComicsQueries'


describe('Data Management', function() {
    describe('Comics Queries', function() {        

        xit('Characters\' total number of skills', () => {           
            let result = ComicsQueries.charactersTotalSkills();
            //console.table(result.data);
        });

        xit('Characters\' total number of skills', () => {           
            let result = ComicsQueries.skillsDistribution();
            //console.table(result.data);
        });
        
        xit('Characters\' total number of skills per gender', () => {           
            let result = ComicsQueries.skillsDistributionByGender();
            console.table(result.data);
        });

        xit('Show all gender labels', () => {           
            let result = ComicsQueries.findGenders();
            //console.table(result.data);
        });
    });
});

describe('Characters Management', function() {
    describe('Object creation', function() { 

        it('Marvel Character objects', () => {                       
            ComicsQueries.marvelCharacters()       
        }); 

        it('DC Character objects', () => {                       
            ComicsQueries.dcCharacters()       
        });         
        
    });
});