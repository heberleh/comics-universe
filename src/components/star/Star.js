import React, {PureComponent} from 'react'
import PropTypes from 'prop-types';
import './Star.css'
import Link from '../link/Link'

class Star extends PureComponent{

    constructor(props){
        super(props)
        this.state = this.props.body

        this._renderLinks = this._renderLinks.bind(this)
        this._partnersLinks = this._partnersLinks.bind(this)
        this._childrenLinks = this._childrenLinks.bind(this)
    }

    _tooltipHtml(){
        let d = this.props.body.data

        return (`<div>
                    <div className='row Star-Tooltip-name'>
                        <a href="${d.url}" target="_blank" title="Click opens a new tab with all details">${d.name}</a>
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

    _clickedClass(){
        return this.state.clicked ? ' Start-clicked ' : ''
    }

    _renderCircle(){        
        let body = this.props.body

        if(body.bodyType === 'planet'){
            return <g>
                        <circle
                            cx={0} 
                            cy={0} 
                            r={body.r*1.1}
                            className={'Star-Glow-Gender-'+ this._genderClass(body.data) + this._clickedClass()}
                        />
                        <circle 
                            name={name}                                           
                            className={'Star-'+body.bodyType+' Star-Gender-'+ this._genderClass(body.data)  + this._clickedClass()} 
                            cx={0} 
                            cy={0} 
                            r={body.r}                                            
                        />                
                    </g>
        }else{
            return <circle
                        name={name}                        
                        className={'Star-'+body.bodyType+' Star-Gender-'+ this._genderClass(body.data)  + this._clickedClass()} 
                        cx={0} 
                        cy={0}
                        r={body.r}                                       
                    />
        }
    }

    _expandSelectionArea(r){
        return <circle className='Star-around' cx={0} cy={0} r={r>2?r:2}  styles={'opacity:0.0;'} />
    }

    _childrenLinks(){    
        if (this.state.showChildren === false) return
        else return this.props.body.data.children.map(child=>{
            if(child.body === undefined) return
            else return <Link 
                        key={this.props.body.data.key + child.body.data.key}
                        type='child'
                        sourceBody={this.props.body}
                        target={child}
                    />
        })
    }

    _partnersLinks(){
        if (this.state.showParners === false) return
        else 
            return this.props.body.data.partners.map(partner=>{
                        if(partner.body === undefined) return
                        else {
                            return <Link 
                                        key={this.props.body.data.key + partner.body.data.key}
                                        type='partner'
                                        sourceBody={this.props.body}
                                        target={partner.body}
                                        />
                        }
                    })
    }

    _renderLinks(){
        return <g>
                {this._childrenLinks()}
                {this._partnersLinks()}
               </g>            
    }


    render(){
        let {x, y, r} = this.props.body     

        return  <g>
                <g className='Links'> {this._renderLinks()} </g>

                
                <g transform={`translate(${x},${y})`}
                        data-tip={this._tooltipHtml()}
                        data-for='characterTooltip'
                        data-html={true}>

                    {this._expandSelectionArea(r)}

                    {this._renderCircle()}
                </g>
                </g>
    }
}

Star.defaultProps = {
    visible: true
}

export default Star