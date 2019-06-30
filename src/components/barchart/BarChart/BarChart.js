//Based on this work:
//https://medium.com/@caspg/responsive-chart-with-react-and-d3v4-afd717e57583


import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {scaleLinear, scaleBand} from 'd3-scale'
import Axes from '../Axis/Axes'
import Bars from '../Bars/Bars'
import ResponsiveWrapper from '../ResponsiveWrapper'
import ReactTooltip from 'react-tooltip'

import './BarChart.css'

class BarChart extends Component{
    constructor(props){        
        super(props)        

        this.key = props.key

        this.xScale = scaleLinear()
        this.xScale.type = "Linear"

        this.yScale = scaleBand()
        this.yScale.type = "Band"
    }    

    render(){
        const props = this.props
        
        const maxValue = Math.max(...props.dataModel.data.map(d=>props.dataModel.valueFunc(d)))  
                
        const yScale = this.yScale 
                        .padding([.5])                      
                        .domain(props.dataModel.data.map(d => props.dataModel.bandFunc(d)))
                        .range([props.height - props.margins.bottom, props.margins.top])
               
        const xScale = this.xScale
                        .domain([0, maxValue])
                        .range([0, props.width - props.margins.right - props.margins.left])

        const ticks ={
            x: {ticks:[5], tickPadding:6},
            y: {ticks:[], tickPadding:12}
        }

        return (
                <div>
                    <h3 className="BarChart">{props.title}</h3>
                    <svg width={props.width} 
                        height={props.height}>

                        <Axes
                            scales={{xScale, yScale}}
                            margins={props.margins} 
                            svgDimensions={{width:props.width, height:props.height}} 
                            ticks={ticks}
                            dataModel={props.dataModel}
                        />

                        <Bars    
                            key={this.key}                        
                            scales={{xScale, yScale}}
                            margins={props.margins}
                            dataModel={props.dataModel}
                            maxValue={maxValue}
                            svgDimensions={{width:props.width, height:props.height}} 
                        />

                    </svg>
                    <ReactTooltip 
                            id={'TooltipBarChart'+this.key}
                            html={true}
                            border={true}/>
                </div>                
            )
    }
}

BarChart.defaultProps = {
    width: 700,
    height: 1200,
    margins: {top: 50, right: 20, bottom: 100, left: 200 },
    parsPadding: 0.5
}

BarChart.propTypes ={
    dataModel: PropTypes.object.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    margins: PropTypes.object,
    barsPadding: PropTypes.number
};

export default ResponsiveWrapper(BarChart);