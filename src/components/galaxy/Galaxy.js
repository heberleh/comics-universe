import React, {Component} from 'react'


class Galaxy extends Component{

    constructor(props){
        this.data = props.data
        this.sunImagePath = props.sunImagePath
        this.state.orbitsMap = props.orbitsMap // !Check: if orbits map changes, re-render accordingly
    }

    renderOrbits(){
        // compute the distribution

    }

    render(){

        return (
            <div className='galaxy'>
                <Sun imagePath={this.sunImagePath} />
                {this.renderOrbits()}
            </div>
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
    ],
    sunImagePath: 'static/sun.svg' // under public domain - https://svgsilh.com/ff9800/image/700364.html
}


export default Galaxy