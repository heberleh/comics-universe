//Based on this work:
//https://medium.com/@caspg/responsive-chart-with-react-and-d3v4-afd717e57583


import React, {Component} from 'react'
import './StackedBarChart.css'
import PropTypes from 'prop-types'
import {scaleLinear, scaleBand} from 'd3-scale'
import Axes from '../Axis/Axes'
import StackedBars from '../Bars/StackedBars'
import ResponsiveWrapper from '../ResponsiveWrapper'
import ReactTooltip from 'react-tooltip'

class StackedBarChart extends Component{
    constructor(props){        
        super(props)
        this.xScale = scaleLinear()
        this.xScale.type = "Linear"

        this.yScale = scaleBand()
        this.yScale.type = "Band"
    }    

    render(){
        const props = this.props
        
        const maxValue = Math.max(...props.dataModel.data.map(
                                        // list of values [3, 4, 5] :: [label1, label2, label3]
                                        d=>props.dataModel.valueFunc(d) 
                                                .reduce((a,b)=>a+b))) // sum values
                
        const yScale = this.yScale 
                        .padding([.5])                      
                        .domain(props.dataModel.data.map(d => props.dataModel.bandFunc(d)))
                        .range([props.height - props.margins.bottom, props.margins.top])
               
        const xScale = this.xScale
                        .domain([0, maxValue])
                        .range([0, props.width - props.margins.right - props.margins.left])

        const ticks ={
            x: {ticks:[6], tickPadding:12},
            y: {ticks:[6], tickPadding:12}
        }

        return (
                <div>
                    <svg width={props.width} 
                        height={props.height}>

                        <Axes
                            scales={{xScale, yScale}}
                            margins={props.margins} 
                            svgDimensions={{width:props.width, height:props.height}} 
                            ticks={ticks}
                            dataModel={props.dataModel}
                        />

                        <StackedBars
                                                                // #5cb5d8 #61f574 #f17341
                            colorsVector={['#2a2b83', '#ac4a59', '#5cb5d8', '#61f574', '#f17341']}//['#8D3340', '#E8895B', '#858685', '#A2DA3D', '#38397C', '#10101C']}
                            scales={{xScale, yScale}}
                            margins={props.margins}
                            dataModel={props.dataModel}
                            maxValue={maxValue}
                            svgDimensions={{width:props.width, height:props.height}} 
                        />

                    </svg>
                    <ReactTooltip 
                            id='barTooltipStackedBarChart'
                            html={true} 
                            border={true}/>
                </div>                
            )
    }
}

StackedBarChart.defaultProps = {
    width: 700,
    height: 1200,
    margins: {top: 50, right: 20, bottom: 100, left: 200 },
    parsPadding: 0.5
}

StackedBarChart.propTypes ={
    dataModel: PropTypes.object.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    margins: PropTypes.object,
    barsPadding: PropTypes.number
};

export default ResponsiveWrapper(StackedBarChart);