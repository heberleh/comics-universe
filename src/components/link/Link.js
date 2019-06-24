

import React, {Component} from 'react'
import './Link.css'

export default class Link extends Component{
    constructor(props){
        super(props)

        props.sourceBody.data[props.type]

        this.state = {counter: 0}

        this._update = this._update.bind(this)

        props.target.update = this._update
    }

    _update(){        
        this.setState((state)=>{
            return {counter: state.counter+1}
        })        
    }

    render(){
        let {type, sourceBody, target} = this.props
        return <line 
                    className={`Link Link-${type}`}
                    x1={sourceBody.x}
                    y1={sourceBody.y}
                    x2={target.x}
                    y2={target.y}
                />
    }
}

