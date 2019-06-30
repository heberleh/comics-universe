import React from 'react'
import './Star.css'

function Sun(props){    
    if (props.galaxyName === 'marvel'){
        return <image className='Sun' width={props.width} height={props.height} xlinkHref={require('../../static/images/sunMarvel.svg')} />
    }
    if (props.galaxyName === 'dc'){
        return <image className='Sun' width={props.width} height={props.height} xlinkHref={require('../../static/images/sunDc.svg')} />
    }
    return <image className='Sun' width={props.width} height={props.height} xlinkHref={require('../../static/images/sunDefault.svg')} />
}

Sun.defaultProps = {
    galaxyName: 'default',
    width: 60,
    height: 60
}

export default Sun
