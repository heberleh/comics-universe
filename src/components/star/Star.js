import React, {Component} from 'react'
import PropTypes from 'prop-types';
import './Star.css'

class Star extends Component{

    _tooltipHtml(){
        let d = this.props.data

        return (`<div>
                    <div className='row Star-Tooltip-name'>
                        <a href="${d.id}" target="_blank" title="Click opens a new tab with all details">${d.name}</a>
                    </div>
                    <div className='row Star-Tooltip-summary'>
                        <b>${d.gender}</b> with <b>${d.abilities.length}</b> super abilities and present in <b>${d.presentInWorks.length}</b> works.
                    </div>
                    <div className='row Star-Tooltip-abilities'>
                        <div>${d.abilities.join(', ')}</div>
                    </div>                  
                </div>`)
    }

    _genderClass(data){
        return data.gender === 'male' || data.gender === undefined ? 'male' : 'nonMale'
    }

    _renderCircle(){
        let {type, r, data} = this.props
        if(type === 'planet'){
            return <g>
                        <circle cx={0} 
                            cy={0} 
                            r={r*1.1}
                            className={'Star-Glow-Gender-'+ this._genderClass(data)}
                            />
                        <circle 
                            name={name}                                           
                            className={'Star-'+type+' Star-Gender-'+ this._genderClass(data)} 
                            cx={0} 
                            cy={0} 
                            r={r}                                            
                        />                
                    </g>
        }else{
            return <circle 
                        name={name}                        
                        className={'Star-'+type+' Star-Gender-'+ this._genderClass(data)} 
                        cx={0} 
                        cy={0} 
                        r={r}                                            
                    />
        }
    }

    _expandSelectionArea(r){
        return <circle className='Star-around' cx={0} cy={0} r={r>2?r:2}  styles={'opacity:0.0;'} />
    }

    render(){
        let {type, cx, cy, r, data} = this.props       
        
        return <g transform={`translate(${cx},${cy})`}
                        data-tip={this._tooltipHtml()}
                        data-for='characterTooltip'
                        data-html={true}>

                    {this._expandSelectionArea(r)}

                    {this._renderCircle(data, type)}
                </g>
    }
}

Star.defaultProps = {
    r: 0.5,
    visible: true
}

Star.propTypes = {    
    data: PropTypes.array.isRequired,
    cx: PropTypes.number.isRequired,
    cy: PropTypes.number.isRequired,
    r: PropTypes.number.isRequired,
    visible: PropTypes.bool
}

export default Star