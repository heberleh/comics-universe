import React, {Component} from 'react'
import Sun from '../star/Sun'
import PropTypes from 'prop-types';
import Character from '../../dataset/Character'
import Body from './Body'
import Orbit from '../orbit/Orbit'
import {max as d3max} from 'd3-array'


class Galaxy extends Component{

    constructor(props){
        super(props)

        if (!(props.data[0] instanceof Character)){ throw new Error('Prop <data> should be an array of <Character>')}

        this.galaxyName = props.comic
        this.data = props.data  
        this.orbits = props.orbits      
        this.state = {orbits: props.orbits} // !Check: if orbits map changes, re-render accordingly

        this.bodies = this._createBodies()
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
                let foundBody = bodies.find(d=>d.data.id === child.id)
                if (foundBody !== undefined){
                    child.body = foundBody                                   
                }else{
                    child.body = undefined
                }
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

    _placement(bodies){
        // compute x.y for each body
    }

    _renderOrbits(){
        // based on Body data, with updated location
        // return the <Planet> <Star> <Dust> components

        let maxWorks = d3max(this.bodies, d=>d.data.presentInWorks.length)        

        return this.orbits.map((orbit, i) =>{

            let bodies = this.bodies.filter(body => {
                let size = body.data.abilities.length
                return  (size <= orbit.levels.max && size >= orbit.levels.min)
            });

            return <Orbit random={false} maxWorks={maxWorks} start={i*10} key={this.props.comic+'_orbit_'+i} bodies={bodies} {...orbit}/>
        })

    }
    
    componentDidMount(){
        this.bodies.map(body=>{            
            if (body.update !== undefined && body.x === 0 && body.y ===0){
                body.update()
            }
        })        
    }

    // _renderLinks(){
    //     document.getElementById(`Links-${this.props.comic}`)
    // }

    render(){        
        return (
            <g className='galaxy' transform={'translate('+this.props.x+','+this.props.y+')'}>
                {/* <g id={`Links-${this.props.comic}`}></g> */}
                <g transform='translate(-30,-30)'>
                    <Sun galaxyName={this.props.comic} width={60} height={60}/>
                </g>                
                {this._renderOrbits()}                
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