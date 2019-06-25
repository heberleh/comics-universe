

import React, {Component} from 'react'
import './Link.css'

export default class Link extends Component{
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

