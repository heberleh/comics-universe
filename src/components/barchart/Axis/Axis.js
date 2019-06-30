import React, { Component } from 'react'
import * as d3Axis from 'd3-axis'
import { select as d3Select } from 'd3-selection'
import PropTypes from 'prop-types'

import './Axis.css'

class Axis extends Component{

    componentDidMount() {
        this.renderAxis()
    }
    
    componentDidUpdate() {
        this.renderAxis()
    }
    
    renderAxis(){
        const axisType = `axis${this.props.orient}`

        const axis = d3Axis[axisType]()
                .scale(this.props.scale)
                .tickSize(-this.props.tickSize)
                .tickPadding(this.props.tickPadding)
                .ticks(this.props.ticks)

        d3Select(this.axisElement).call(axis)
    }

    render(){        
        return (
        <g
            className={`Axis Axis-${this.props.orient} Axis-${this.props.scale.type}`}
            ref={(el) => { this.axisElement = el; }}
            transform={this.props.translate}
          />
        )
    }

}

Axis.defaultProps = {
   ticks: [4],
   tickPadding: [12]
}

Axis.propTypes = {
    ticks:  PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.array
    ]),
    tickPadding : PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.array
    ]),
    orient: PropTypes.string.isRequired,
    scale: PropTypes.func.isRequired,
    translate: PropTypes.string.isRequired,
    tickSize: PropTypes.number.isRequired
}

export default Axis