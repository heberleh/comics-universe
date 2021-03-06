import React, {Component} from 'react'
import './Orbit.css'
import Star from '../star/Star'


class Orbit extends Component{

    constructor(props){
        super(props)
        this.props.bodies.sort((a,b) => (a.data.initials > b.data.initials) ? 1 : ((b.data.initials > a.data.initials) ? -1 : 0))
    }

    _renderLargeBodies(){
        let largeBodies = this.props.bodies.filter(body=>!body.isDust())
        return largeBodies.map((body, i) => {
            return <Star key={body.data.key} comic={this.props.comic} body={body} />
        })
    }

    _renderDust(){ 
        let dust = this.props.bodies.filter(body=>body.isDust())
        return dust.map((body,i) => {
                return <Star key={body.data.key} comic={this.props.comic} body={body} />
        })
    }

    _renderEllipse(){
        let {cx, cy, rx, ry} = this.props
    
        return <ellipse cx={cx} cy={cy} rx={rx} ry={ry}/>
    }

    render(){
        return (
            <g className="Orbit">
                {this._renderEllipse()}
                {this._renderLargeBodies()}
                {this._renderDust()}
            </g>
        )
    }
}

export default Orbit