import React, {Component} from 'react'
import Sun from '../star/Sun'
import PropTypes from 'prop-types';
import Character from '../../dataset/Character'
import Body from './Body'
import Orbit from '../orbit/Orbit'


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
        return this.data.map(d => d.presentInWorks.length).reduce((a,b)=>a+b,0)/this.data.length
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
        return bodies
    }

    _placement(bodies){
        // compute x.y for each body
    }

    _renderOrbits(){
        // based on Body data, with updated location
        // return the <Planet> <Star> <Dust> components
        return this.orbits.map((orbit, i) =>{

            let bodies = this.bodies.filter(body => {return body.data.abilities.length in orbit.levels});

            return <Orbit bodies={bodies} {...orbit}/>
        })

    }

    render(){        
        return (
            <g className='galaxy' transform={'translate('+this.props.x+','+this.props.y+')'}>
                <Sun galaxyName={this.props.comic} />
                {this._renderOrbits()}
            </g>
        )

    }
}

Galaxy.defaultProps = {
    orbits : [ // each line is an orbit
        {cx:45, cy:10, rx:450, ry: 220, levels:[0, 1, 2]},
        {cx:45, cy:10, rx:340, ry: 190, levels:[3, 4]},
        {cx:45, cy:10, rx:250, ry: 160, levels:[5, 6]},
        {cx:45, cy:10, rx:190, ry: 120, levels:[7, 8]},
        {cx:45, cy:10, rx:140, ry: 90, levels:[9, 10]},
        {cx:45, cy:10, rx:80, ry: 60, levels:[11, 12, 13, 14]} // smallest ellipse, closer to the sun
    ]
}

Galaxy.propTypes = {
    comic: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
}



export default Galaxy