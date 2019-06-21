import React, {Component} from 'react'
import Galaxy from '../galaxy/Galaxy'
import LoadDataset from '../../../src/dataset/LoadDataset'

import './Universe.css'

class Universe extends Component{

    constructor(props){
        super(props)

        this.style = require("./Universe.css")
        this.marvelCharacters = LoadDataset.marvelData()
        this.dcCharacters = LoadDataset.dcData()

        if (this.dcCharacters === undefined) {throw new Error("ComicsQueries.saveDcCharacters() should be executed to save the data")}
        if (this.marvelCharacters === undefined) {throw new Error("ComicsQueries.saveMarvelCharacters() should be executed to save the data")}
    }

    render(){
        return (
            <svg id="Universe" width={1700} height={800}>
                <Galaxy data={this.dcCharacters} comic='marvel'  x={400} y={400}/>
                <Galaxy data={this.marvelCharacters} comic='dc'  x={1100} y={400}/>
            </svg>
        )
    }

}

export default Universe