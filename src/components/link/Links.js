import React, {Component} from 'react'
import Link from './Link'
import './Links.css'

class Links extends Component{

    _childrenLinks(bodies){    
        return this.props.bodies.map(body => {
            return body.data.children.map(child=>{
                return this._Link(body, 
                                child.body, 
                                'child',
                                this.props.children ? 'visible':'hidden')
            })
        })            
    }

    _partnersLinks(){    
        return this.props.bodies.map(body => {
            return body.data.partners.map(partner=>{
                return this._Link(body, 
                                partner.body, 
                                'partner', 
                                this.props.showPartners?'visible':'hidden')
            })
        })                   
    }

    _Link(source, target, type, vis){
            if (target === undefined) return ''
        	return <Link 
                        key={source.data.key + target.data.key}
                        type={type}
                        source={source}
                        target={target}
                        vis={vis}
                    />
    }

    _renderLinks(){
        return <g className={`Links Links-Galaxy-${this.props.comic}`}>
                {this._childrenLinks()}
                {this._partnersLinks()}
               </g>            
    }

    render(){
        return this._renderLinks()
    }
}

export default Links