import React, { Component } from 'react'
import { scaleOrdinal } from 'd3-scale'



class StackedBars extends Component{

    constructor(props) {
        super(props)
    
        this.colorScale = scaleOrdinal()
                          .domain(this.props.dataModel.labels)
                          .range(this.props.colorsVector)    
      }
    
      renderStackedBar(d){
        const { scales, margins, dataModel } = this.props
        const { xScale, yScale } = scales        

        let title = dataModel.bandFunc(d)
        let description = dataModel.descriptionFunc(d)

        let values = dataModel.valueFunc(d)              
        let labels = dataModel.labels

        let total = values.reduce((a,b)=>a+b)
        
        function getTooltipHtml(title, label, val, description){
          return "<div style='max-width:300px'><b>"+
            title+" ("+label+")</b><br>"+
            val+"/"+total+" = "+parseInt((val/total)*1000)/10+"\%<br>Info: "+
            description
        }

        function getX(i){
          let x = 0;
          for (let j = 0; j < i; j++){
            if (values[j] !== 0) x += xScale(values[j])
          }
          return x
        }

        return (values.map((val, i) => {
          
          if (val === 0) return "";
          
          return <rect
            key={title+labels[i]+val}

            val = {val}
            values = {values}
            scaleVal = {xScale(val)}
            getxval = { getX(i)} 
            marginleft = {margins.left}    
                   
            x={margins.left + getX(i)}
            width={xScale(val)} // -margins.left ??
            
            y={yScale(dataModel.bandFunc(d))}                
            height={yScale.bandwidth()}
            
            fill={this.colorScale(labels[i])}
          
            data-tip={getTooltipHtml(title, labels[i], val, description)}
            data-for='barTooltipStackedBarChart'
            data-html={true}
            />
          }
        ))
      }

      render() {
        const bars = (          
          <g>{this.props.dataModel.data.map(d => <g>{this.renderStackedBar(d)}</g>)}</g>
        )
    
        return (      
          <g>{bars}</g>       
        )
      }
}

export default StackedBars