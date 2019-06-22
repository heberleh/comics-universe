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

    _renderLargeBodies(){

        let largeBodies = this.props.bodies.filter((body)=>!(body.bodyType==='dust'))

        let dt = 2*Math.PI/largeBodies.length        

        return largeBodies.map((body, i) =>{
            let t = dt*(this.props.start+i);
            // Planet / Start / Dust -> Single component for each?

            if (body.bodyType === "planet"){  
                let r = this.scale(body.data.presentInWorks.length)             
                return <Star type="planet" data={body.data} key={i} cx={this._x(t)} cy={this._y(t)} r={r} />
            }           

            if (body.bodyType === "star"){     
                let r = this.scale(body.data.presentInWorks.length)         
                return <Star type="star" data={body.data} key={i} cx={this._x(t)} cy={this._y(t)} r={r} />
            }
        })
    }

    _renderDust(){       

        let dust = this.props.bodies.filter((body)=>body.bodyType==='dust')

        let dt = 2*Math.PI/dust.length
        
        return dust.map((body,i) =>{
                let t = dt*i;
                let xrandom =  ((Math.random()*15)+5) *(Math.random()<0.5?-1:1)
                let yrandom =  ((Math.random()*15)+5) *(Math.random()<0.5?-1:1)
                let r = 0.5

                return <Star 
                        type="dust"
                        data={body.data}
                        key={i} 
                        cx={this._x(t) + xrandom} 
                        cy={this._y(t) + yrandom} 
                        r={r} />
        })          
    }

    render(){
        let {cx, cy, rx, ry} = this.props

        return (
            <g className="Orbit">
                <ellipse cx={cx} cy={cy} rx={rx} ry={ry}/>
                {this._renderLargeBodies()}
                {this._renderDust()}
            </g>
        )
    }
}

Orbit.defaultProps = {
}

Orbit.propTypes = {
}

export default Orbit