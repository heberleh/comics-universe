import React from 'react'

function Sun(props){    
    if (props.galaxyName === 'marvel'){
        return <image width={props.width} height={props.height} xlinkHref={require('../../../static/images/sunMarvel.png')} />
    }
    if (props.galaxyName === 'dc'){
        return <image width={props.width} height={props.height} xlinkHref={require('../../../static/images/sunDc.png')} />
    }
    return <image width={props.width} height={props.height} xlinkHref={require('../../../static/images/sunDefault.svg')} />
}

Sun.defaultProps = {
    galaxyName: 'default',
    width: 60,
    height: 60
}

export default Sun
