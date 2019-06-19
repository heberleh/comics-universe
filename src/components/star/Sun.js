import React from 'react'

function Sun(galaxyName, width=40, height=40){
    // TODO when testing, check if this has any effect:
    // ! { width: {}, height: undefined, xlinkHref: { svgPath: 'Sun.svg', width: 40, height: 40 } }
    if (galaxyName === undefined){
        return <image width="100" height="100" xlinkHref={require('../../../static/images/sunFigure.svg')} />
    }else{
        return <image width="100" height="100" xlinkHref={require('../../../static/images/sunMarvelFigure.png')} />
    }

}

export default Sun
