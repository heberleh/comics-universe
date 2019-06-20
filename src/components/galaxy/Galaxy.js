import React, {Component} from 'react'
import Sun from '../star/Sun'
import PropTypes from 'prop-types';
import Character from '../../dataset/Character'

class Galaxy extends Component{

    constructor(props){
        super(props)

        if (!(props.data[0] instanceof Character)){ throw new Error('Prop <data> should be an array of <Character>')}

        this.galaxyName = props.comic
        this.data = props.data        
        this.state = {orbitsMap: props.orbitsMap} // !Check: if orbits map changes, re-render accordingly
    }

    renderOrbits(){
        // compute the distribution

    }

    render(){        
        return (
            <g className='galaxy' transform={'translate('+this.props.x+','+this.props.y+')'}>
                <Sun galaxyName={this.props.comic} />
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

Galaxy.propTypes = {
    comic: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
}


export default Galaxy