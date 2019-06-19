import React, {Component} from 'react'
import Galaxy from '../galaxy/Galaxy'
import LoadDataset from '../../../src/dataset/LoadDataset'

class Universe extends Component{

    constructor(props){
        super(props)

        this.marvelCharacters = LoadDataset.marvelData()
        this.dcCharacters = LoadDataset.dcData()

        if (this.dcCharacters === undefined) {throw new Error("ComicsQueries.saveDcCharacters() should be executed to save the data")}
        if (this.marvelCharacters === undefined) {throw new Error("ComicsQueries.saveMarvelCharacters() should be executed to save the data")}
    }

    render(){
        return (
            <svg id="universe" width={400} height={400}>
                <Galaxy data={this.dcCharacters}  />
                <Galaxy data={this.marvelCharacters} />
            </svg>
        )
    }

}

export default Universe