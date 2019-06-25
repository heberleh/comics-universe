import React, {Component} from 'react'
import Sun from '../star/Sun'
import PropTypes from 'prop-types';
import Character from '../../dataset/Character'
import Body from './Body'
import Orbit from '../orbit/Orbit'
import {max as d3max} from 'd3-array'
import {scaleLinear} from 'd3-scale'
//import Link from '../link/Links'


class Galaxy extends Component{

    constructor(props){
        super(props)

        if (!(props.data[0] instanceof Character)){ throw new Error('Prop <data> should be an array of <Character>')}

        this.galaxyName = props.comic
        this.data = props.data  
        this.orbits = props.orbits      
        this.state = {orbits: props.orbits} // !Check: if orbits map changes, re-render accordingly

        this.bodies = this._createBodies()

        this._renderOrbits()
        
    }

    _averageWorksN(){
        let important = this.data.filter(d=>d.presentInWorks.length>2)
        return important.map(d => d.presentInWorks.length).reduce((a,b)=>a+b,0)/important.length
    }

    /**
     * Create and set the Body type (planet, star or dust)
     * Return vector of Body
     */
    _createBodies(){
        // ? Allow to change this threshold
        let threshold = this._averageWorksN()

        let bodies = []
        this.data.forEach((char)=>{
            let body = new Body(char, threshold)
            bodies.push(body)
        })

        bodies.map(body =>{
            for (let i = 0; i < body.data.children.length; i++){
                let child = body.data.children[i]                
                child.body = bodies.find(d=>d.data.id === child.id)
            }
        })

        bodies.map(body =>{
            for (let i = 0; i < body.data.partners.length; i++){
                let partner = body.data.partners[i]
                partner.body = bodies.find(d=>d.data.id === partner.id) // Body or undefined                
            }            
        })

        return bodies
    }

    /**
     * Set Body.x and Body.y in an Orbit
     * @param {array} bodies array of Body
     * @param {numeric} randomR how x,y will randomly vary
     * @param {function} r d3-scale function
     */
    _setUpOrbitBodies(rx, ry, randomR, bodies, r, start=1){
        if (r === undefined){
            let maxWorks = d3max(this.bodies, d=>d.data.presentInWorks.length)            
            r = scaleLinear().domain([0, maxWorks]).range([1,10]);    
        }

        x = (rx, t) => rx * Math.cos(t)
        y = (ry, t) => ry * Math.sin(t)

        let dt = 2*Math.PI/bodies.length   

        bodies.map((body, i) =>{            
            let t = dt*(start+i);
            if (randomR === undefined){
                body.x = x(t)
                body.y = y(t)       
            }else{
                body.x = x(t) + ((Math.random()*randomR)+5) *(Math.random()<0.5?-1:1)            
                body.y = y(t) + ((Math.random()*randomR)+5) *(Math.random()<0.5?-1:1)
            }
            body.r = r(body.data.presentInWorks.length)
        })
    }

    _computeOrbitsBodies(){
        this.orbits.map((orbit, i) =>{

            orbit.bodies = this.bodies.filter(body => {
                let size = body.data.abilities.length
                return  (size <= orbit.levels.max && size >= orbit.levels.min)
            });
            
            // placement of planets and starts
            this._computeOrbit(orbit.rx, orbit.ry, undefined, orbit.bodies.filter(body => body.bodyType !== 'dust'), undefined, i*10)
            
            // placement of dust
            this._computeOrbit(orbit.rx, orbit.ry, 15, orbit.bodies.filter(body => body.bodyType === 'dust'), (d)=>0.5, i*10)
        })
    }

    _renderOrbits(){        
        return this.orbits.map((orbit, i) =>{
            return <Orbit key={this.props.comic+'_orbit_'+i} {...orbit}/>
        })
    }

    render(){
        return (
            <g className='galaxy' transform={'translate('+this.props.x+','+this.props.y+')'}>
                {/*     <g id={`Links-${this.props.comic}`}></g> */}
                <g transform='translate(-30,-30)'>
                    <Sun galaxyName={this.props.comic} width={60} height={60}/>
                </g>                
                {this._renderOrbits()}  
                {/* {this._renderLinks()}               */}
            </g>
        )
    }
}

Galaxy.defaultProps = {
    orbits : [ // each line is an orbit
        {cx:0, cy:0, rx:420, ry: 235, levels:{min:0, max:0}},
        {cx:0, cy:0, rx:330, ry: 190, levels:{min:1, max:2}},
        {cx:0, cy:0, rx:250, ry: 160, levels:{min:3, max:4}},
        {cx:0, cy:0, rx:190, ry: 120, levels:{min:5, max:6}},
        {cx:0, cy:0, rx:140, ry: 90, levels:{min:7, max:8}},
        {cx:0, cy:0, rx:80, ry: 60, levels:{min:9, max:20}} // smallest ellipse, closer to the sun
    ]
}

Galaxy.propTypes = {
    comic: PropTypes.string.isRequired, // used to set the correct Sun
    data: PropTypes.array.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
}



export default Galaxy