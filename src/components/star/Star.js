import React, {Component} from 'react'
import './Star.css'

class Star extends Component{

    _tooltipHtml(){
        let d = this.props.data

        return (`<div>
                    <div className='row Star-Tooltip-name'>
                        <a href="${d.url}">${d.name}</a>
                    </div>
                    <div className='row Star-Tooltip-summary'>
                        <b>${d.gender}</b> with <b>${d.abilities.length}</b> super abilities and present in <b>${d.presentInWorks.length}</b> works.
                    </div>
                    <div className='row Star-Tooltip-abilities'>
                        <div>${d.abilities.join(', ')}</div>
                    </div>                  
                </div>`)
    }

    render(){
        let {type, cx, cy, r} = this.props       
        
        return <circle 
                    name={name} 

                    className={'Star-'+type} 
                    cx={cx} 
                    cy={cy} 
                    r={r}
                    
                    data-tip={this._tooltipHtml()}
                    data-for='characterTooltip'
                    data-html={true}
                />
    }
}

export default Star