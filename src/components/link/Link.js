

import React, {Component} from 'react'
import './Links.css'

export default class Link extends Component{
    render(){
        let {type, source, target, vis} = this.props
        return <line 
                    className={`Link Link-${type}`}
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    visibility={vis}
                    id={source.data.key+'_'+target.data.key}
                />
    }
}

