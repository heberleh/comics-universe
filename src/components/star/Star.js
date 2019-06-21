import React, {Component} from 'react'
import './Star.css'

class Star extends Component{

    render(){
        let {cx, cy, r, name} = this.props
        return <circle name={name} className='Star' cx={cx} cy={cy} r={r}></circle>
    }
}

export default Star