import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Character from '../../dataset/Character'
import './Orbit.css'

class Orbit extends Component{

    constructor(props){
        super(props)
    }

    render(){
        let {cx, cy, rx, ry} = this.props

        return (
            <g>
                <ellipse className="Orbit" cx={cx} cy={cy} rx={rx} ry={ry}/>
            </g>
        )
    }
}

Orbit.defaultProps = {
}

Orbit.propTypes = {
}

export default Orbit