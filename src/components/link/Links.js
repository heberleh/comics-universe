import React, {Component} from 'react'
import Link from './Link'
class Links extends Component{

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
        return this._renderLinks()
    }
}

export default Links