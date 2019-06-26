import React, {Component} from 'react'
import Sun from '../star/Sun'
import PropTypes from 'prop-types';
import Character from '../../dataset/Character'
import Body from './Body'
import Orbit from '../orbit/Orbit'
import {max as d3max} from 'd3-array'
import {scaleLinear} from 'd3-scale'
import ReactTooltip from 'react-tooltip'
import ReactDOM from 'react-dom'
import Links from '../link/Links'


class Galaxy extends Component{

    constructor(props){
        super(props)

        if (!(props.data[0] instanceof Character)){ throw new Error('Prop <data> should be an array of <Character>')}

        this.galaxyName = props.comic
        this.data = props.data  
        this.orbits = props.orbits
    }

    componentDidMount() {
        console.log("Galaxy Component did mount.")
        this.setState({bodies: this._createBodies()})
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

        this._computeOrbitsBodies(bodies)

        bodies.map(body =>{
            for (let i = 0; i < body.data.children.length; i++){
                let child = body.data.children[i]                
                child.body = bodies.find(d=>d.data.id === child.id)
            }
            return body
        })

        bodies.map(body =>{
            for (let i = 0; i < body.data.partners.length; i++){
                let partner = body.data.partners[i]
                partner.body = bodies.find(d=>d.data.id === partner.id)
            }    
            return body        
        })
        
        return bodies
    }

    x(rx, t){return rx * Math.cos(t)}
    y(ry, t){return ry * Math.sin(t)}


    /**
     * Set Body.x and Body.y in an Orbit
     * @param {array} bodies array of Body
     * @param {numeric} randomR how x,y will randomly vary
     * @param {function} r d3-scale function
     */
    _setUpOrbitBodies(rx, ry, randomR, bodies, r, start=1, allbodies){
        if (r === undefined){
            let maxWorks = d3max(allbodies, d=>d.data.presentInWorks.length);           
            r = scaleLinear().domain([0, maxWorks]).range([1,10]);    
        }

        let dt = 2*Math.PI/bodies.length; 

        bodies.map((body, i) => {
            let t = dt*(start+i);
            if (randomR === undefined){
                body.x = this.x(rx, t);
                body.y = this.y(ry, t);       
            }else{
                body.x = this.x(rx, t) + ((Math.random()*randomR)+5) *(Math.random()<0.5?-1:1);          
                body.y = this.y(ry, t) + ((Math.random()*randomR)+5) *(Math.random()<0.5?-1:1);
            }
            body.r = r(body.data.presentInWorks.length);
            return body
        })
    }

    _computeOrbitsBodies(bodies){
        this.orbits.map((orbit, i) =>{

            let orbitBodies = bodies.filter(body => {
                let size = body.data.abilities.length
                return  (size <= orbit.levels.max && size >= orbit.levels.min)
            });
            
            // placement of planets and starts
            this._setUpOrbitBodies(orbit.rx, orbit.ry, undefined, orbitBodies.filter(body => body.bodyType !== 'dust'), undefined, i*10, bodies);
            
            // placement of dust
            this._setUpOrbitBodies(orbit.rx, orbit.ry, 15, orbitBodies.filter(body => body.bodyType === 'dust'), (d)=>0.5, i*10, bodies);

            return orbit
        })
    }

    _renderOrbits(bodies){                
        return this.orbits.map((orbit, i) =>{
            let orbitBodies = bodies.filter(body => {
                let size = body.data.abilities.length
                return  (size <= orbit.levels.max && size >= orbit.levels.min)
            });
            return <Orbit key={this.props.comic+'_orbit_'+i} comic={this.props.comic} bodies={orbitBodies} {...orbit}/>
        })
    }

    _renderGalaxy(){
        return <g className='galaxy' transform={'translate('+this.props.x+','+this.props.y+')'}>               

                    <Links 
                        showPartners={this.props.showPartners}
                        showChildren={this.props.showChildren}
                        bodies={this.state.bodies}
                        comic={this.props.comic}
                    />

                    <g transform='translate(-30,-30)'>
                        <Sun galaxyName={this.props.comic} width={60} height={60}/>
                    </g>

                    {this._renderOrbits(this.state.bodies)}
                
                    {ReactDOM.createPortal(<ReactTooltip 
                        key="Universe-Node-Tooltip"
                        id={`characterTooltip${this.props.comic}`}
                        className='Star-Tooltip'
                        effect='solid'
                        delayHide={200}
                        delayShow={200}
                        delayUpdate={200}                        
                        border={true}
                        html={true}/>,       document.getElementById("tooltips"))}
                </g>
    }

    render(){
        return this.state && this.state.bodies && this._renderGalaxy()
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
    ],
    showPartners: false,
    showChildren: false
}

Galaxy.propTypes = {
    comic: PropTypes.string.isRequired, // used to set the correct Sun
    data: PropTypes.array.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
}

export default Galaxy