import React, {PureComponent} from 'react'
import './Star.css'
import {select as d3Select, selectAll as d3SelectAll} from 'd3-selection'

class Star extends PureComponent{

    constructor(props){
        super(props)
        this.state = {selected: false}
        this.handleClick = this.handleClick.bind(this)
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

    _selectedClass(){
        return this.state.selected ? ' selected ' : ''
    }

    _bodyStyle(){
        if(this.state.selected){            
            return {strokeWidth: this.props.body.r*0.3,
                    stroke: 'yellow',
                    fill: 'purple'}
        }else{
            return {}
        }
    }

    _renderBody(){
        let body = this.props.body
        return <circle                                        
            className={'Star-'+body.bodyType+' Star-Gender-'+ this._genderClass(body.data)  + this._selectedClass()} 
            cx={0} 
            cy={0} 
            r={body.r}   
            style={this._bodyStyle()}
        /> 
    }

    _renderCircle(){        
        let body = this.props.body

        if(body.bodyType === 'planet'){
            return <g>
                        <circle
                            cx={0} 
                            cy={0} 
                            r={body.r*1.1}
                            className={'Star-Glow-Gender-'+ this._genderClass(body.data)}
                        />
                        {this._renderBody(body)}
                    </g>
        }else{
            return this._renderBody(body)
        }
    }

    _renderLabel(){
        let body = this.props.body
        let r = body.r*1.3
        let t = Math.PI/4
        return <text 
                    x={r*Math.cos(t)} 
                    y={r*Math.sin(t)} 
                    className="Star-label" 
                    visibility={this.state.selected?'visible':'hidden'}>{body.data.name}
                </text>
    }

    _expandSelectionArea(r){
        return <circle className='Star-around' cx={0} cy={0} r={r>2?r:2}  styles={'opacity:0.0;'} />
    }

    _showLabel(body){
        d3Select("#"+body.data.key)
            .select('text')
            .attr('visibility', this.state.selected ? 'visible' : 'hidden')
    }

    _highlightNeighbors(){
        let partners = this.props.body.data.partners
        let children = this.props.body.data.children
        
        partners.forEach(partner =>{
            if(partner.body !== undefined){
                // show link
                d3Select("#"+this.props.body.data.key+"_"+partner.body.data.key)
                                .attr('visibility', this.state.selected ? 'visible' : 'hidden')
                // show label
               this._showLabel(partner.body)
            }
        })

        children.forEach(child =>{            
            if(child.body !== undefined){
                d3Select("#"+this.props.body.data.key+"_"+child.body.data.key)
                    .attr('visibility', this.state.selected ? 'visible' : 'hidden')
                this._showLabel(child.body)
            }
        })
    }

    handleClick() {
        console.log(this)
        this.setState(state => ({
          selected: !state.selected
        }));        
    }

    render(){
        let {x, y, r} = this.props.body     

        return <g id={this.props.body.data.key} transform={`translate(${x},${y})`}>
                    <g
                        data-tip={this._tooltipHtml()}
                        data-for={`characterTooltip${this.props.comic}`}
                        data-html={true}
                        onClick={this.handleClick}
                        >
                        {this._expandSelectionArea(r)}
                        {this._renderCircle()}                                                
                    </g>
                    <g>
                        {this._renderLabel()}
                    </g>    

                    {this._highlightNeighbors()}                
                </g>
    }
}

Star.defaultProps = {
    visible: true
}

export default Star