import React, {Component} from 'react'
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

    _renderCircle(){
        let {type, cx, cy, r, data} = this.props
        if(type === 'planet'){
            return <g>
                        <circle cx={cx} 
                            cy={cy} 
                            r={r*1.1}
                            className={'Star-Glow-Gender-'+ (data.gender === 'male' || data.gender === undefined ? 'male' : 'nonMale')}
                            />
                        <circle 
                            name={name}                                           
                            className={'Star-'+type+' Star-Gender-'+ (data.gender === 'male' || data.gender === undefined ? 'male' : 'nonMale')} 
                            cx={cx} 
                            cy={cy} 
                            r={r}                                            
                        />                
                    </g>
        }else{
            return <circle 
                        name={name}                        
                        className={'Star-'+type+' Star-Gender-'+ (data.gender === 'male' || data.gender === undefined ? 'male' : 'nonMale')} 
                        cx={cx} 
                        cy={cy} 
                        r={r}                                            
                    />
        }

    }
    render(){
        let {type, cx, cy, r, data} = this.props       
        
        return <g 
                        data-tip={this._tooltipHtml()}
                        data-for='characterTooltip'
                        data-html={true}>
                <circle className='Star-around' cx={cx} cy={cy} r={r>2?r:2}  styles={'opacity:0.0;'} />
                {this._renderCircle(data, type)}
            </g>
    }
}

export default Star