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

        this.marvelCharacters.sort((a,b)=> (a,b) => (a.initials > b.initials) ? 1 : ((b.initials > a.initials) ? -1 : 0))
        this.dcCharacters.sort((a,b)=> (a,b) => (a.initials > b.initials) ? 1 : ((b.initials > a.initials) ? -1 : 0))

        if (this.dcCharacters === undefined) {throw new Error("ComicsQueries.saveDcCharacters() should be executed to save the data")}
        if (this.marvelCharacters === undefined) {throw new Error("ComicsQueries.saveMarvelCharacters() should be executed to save the data")}
    }

    render(){
        return (
            <svg id="Universe" width={1700} height={800}>
                <Galaxy data={this.dcCharacters} comic='dc'  x={400} y={400}/>
                <Galaxy data={this.marvelCharacters} comic='marvel'  x={1100} y={400}/>
            </svg>
        )
    }

}

export default Universe