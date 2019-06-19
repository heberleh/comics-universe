import React, {Component} from 'react'
import Sun from '../star/Sun'

class Galaxy extends Component{

    constructor(props){
        super(props)
        this.data = props.data
        this.sunSvg = props.sunSvg
        this.state = {orbitsMap: props.orbitsMap} // !Check: if orbits map changes, re-render accordingly
    }

    renderOrbits(){
        // compute the distribution

    }

    render(){
        console.log(this.sunSvg)
        return (
            <g className='galaxy' transform="translate(100,100)">
                <Sun />
                {this.renderOrbits()}
            </g>
        )

    }
}

Galaxy.defaultProps = {
    orbitsMap : [
        [0, 1, 2],
        [3, 4],
        [5, 6],
        [7, 8],
        [9, 10],
        [11, 12, 13, 14] // smallest ellipse, closer to the sun
    ]
}


export default Galaxy