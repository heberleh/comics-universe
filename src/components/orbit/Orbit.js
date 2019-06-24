import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Character from '../../dataset/Character'
import './Orbit.css'
import Star from '../star/Star'
import {scaleLinear} from 'd3-scale'

class Orbit extends Component{

    constructor(props){
        super(props)
        this.starScale = scaleLinear().domain([0, props.maxWorks]).range([2,8]);
        this.planetScale = scaleLinear().domain([0, props.maxWorks]).range([2,8]);
        this.scale = scaleLinear().domain([0, props.maxWorks]).range([1,10]);

        this.props.bodies.sort((a,b) => (a.data.initials > b.data.initials) ? 1 : ((b.data.initials > a.data.initials) ? -1 : 0))
    }


    _x(t){
        return this.props.rx * Math.cos(t)
    }

    _y(t){
        return this.props.ry * Math.sin(t)
    }

    _renderLargeBodies(random){

        let largeBodies = this.props.bodies.filter((body)=>!(body.bodyType==='dust'))

        let dt = 2*Math.PI/largeBodies.length        

        return largeBodies.map((body, i) =>{
            let t = dt*(this.props.start+i);            
            body.x = this._x(t)
            body.y = this._y(t)
            if (random){
                body.x += ((Math.random()*3)) *(Math.random()<0.5?-1:1)
                body.y += ((Math.random()*3)) *(Math.random()<0.5?-1:1)
            }
            body.r = this.scale(body.data.presentInWorks.length)

            return <Star key={body.data.key} body={body} />
        })
    }

    _renderDust(){       

        let dust = this.props.bodies.filter((body)=>body.bodyType==='dust')

        let dt = 2*Math.PI/dust.length
        
        return dust.map((body,i) =>{
            
                let t = dt*i;
                let xrandom =  ((Math.random()*15)+5) *(Math.random()<0.5?-1:1)
                let yrandom =  ((Math.random()*15)+5) *(Math.random()<0.5?-1:1)
                
                body.x = this._x(t) + xrandom
                body.y = this._y(t) + yrandom
                body.r = 0.5

                return <Star  key={body.data.id} body={body} />
        })
    }

    _renderEllipse(visible){
        let {cx, cy, rx, ry} = this.props
        if (visible){
            return <ellipse cx={cx} cy={cy} rx={rx} ry={ry}/>
        }else{
            return ""
        }
    }

    render(){
        return (
            <g className="Orbit">
                {this._renderEllipse(!this.props.random)}
                {this._renderLargeBodies(this.props.random)}
                {this._renderDust()}
            </g>
        )
    }
}

Orbit.defaultProps = {
    random: false, // semi-radomize large bodies x,y
}

Orbit.propTypes = {
    random: PropTypes.bool
}

export default Orbit