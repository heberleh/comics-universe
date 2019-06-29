import React, {Component} from 'react'
import {selectAll as d3SelectAll, select as d3Select} from 'd3-selection'
import './SearchBox.css'

class SearchBox extends Component{

    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        d3SelectAll('text').filter(function(){return !d3Select(this).attr('selected')}).attr('visibility','hidden')

        if(e.target.value !== ""){
            d3SelectAll('text')
                .filter(function(){
                    return e.target.value.toLowerCase().includes(d3Select(this).text().toLowerCase()) || d3Select(this).text().toLowerCase().includes(e.target.value.toLowerCase())})
                .attr('visibility','visible')
        }
    }

    render(){
        return <input   type="text" 
                        className="SearchBox-input" 
                        onChange={this.handleChange}                        
                        placeholder="Search..." />
    }
}

export default SearchBox