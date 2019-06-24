import React, {PureComponent} from 'react'
import Galaxy from '../galaxy/Galaxy'
import LoadDataset from '../../../src/dataset/LoadDataset'
import './Universe.css'
import './../star/Star.css'

import ReactTooltip from 'react-tooltip'
import {UncontrolledReactSVGPanZoom} from 'react-svg-pan-zoom';
import ResponsiveWrapper from '../ResponsiveWrapper'

class Universe extends PureComponent{

    constructor(props){
        super(props)

        this.Viewer = null

        this.style = require("./Universe.css")
        this.marvelCharacters = LoadDataset.marvelData()
        this.dcCharacters = LoadDataset.dcData()

        this.marvelCharacters.sort((a,b)=> (a,b) => (a.initials > b.initials) ? 1 : ((b.initials > a.initials) ? -1 : 0))
        this.dcCharacters.sort((a,b)=> (a,b) => (a.initials > b.initials) ? 1 : ((b.initials > a.initials) ? -1 : 0))

        if (this.dcCharacters === undefined) {throw new Error("ComicsQueries.saveDcCharacters() should be executed to save the data")}
        if (this.marvelCharacters === undefined) {throw new Error("ComicsQueries.saveMarvelCharacters() should be executed to save the data")}
    }

    componentDidMount() {
        this.Viewer.fitToViewer();    
    }    

    render(){
        console.log("dimensions***", this.props.width, this.props.height)
        let svgWidth = 1600
        let svgHeight = 700
        return (
            <div id='div-universe'>                        
                {/* <button className="btn" onClick={() => this.Viewer.zoomOnViewerCenter(1.1)}>Zoom in</button>
                <button className="btn" onClick={() => this.Viewer.fitSelection(40, 40, 200, 200)}>Zoom area 200x200</button>
                <button className="btn" onClick={() => this.Viewer.fitToViewer()}>Fit</button>

                <hr/> */}

                <UncontrolledReactSVGPanZoom                         
                        className='Universe-viewer'                 
                        width={this.props.width} height={this.props.height}
                        ref={Viewer => this.Viewer = Viewer}
                        onClick={event => console.log('click', event.x, event.y, event.originalEvent)}
                        background='black'
                        SVGBackground='black'
                        toolbarProps={{SVGAlignX: 'center', SVGAlignY: 'center'}}>            
                    
                    <svg className="Universe" width={svgWidth} height={svgHeight} styles='background-color:"black"'>
                        
                        {/* <defs>
                            <filter id="glow">
                                <feFlood flood-color="rgb(255, 255, 255)" flood-opacity="0.9" in="SourceGraphic" />                              
                                <feComposite operator="in" in2="SourceGraphic" />

                                <feGaussianBlur stdDeviation="0.1" result="coloredBlur"/>
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>

                        </defs> */}
                        <Galaxy data={this.dcCharacters} comic='dc'             x={435}  y={355}/>
                        <Galaxy data={this.marvelCharacters} comic='marvel'     x={1150} y={355}/>
                    </svg>
                </UncontrolledReactSVGPanZoom>

                <ReactTooltip 
                        id='characterTooltip'
                        className='Star-Tooltip'
                        effect='solid'
                        delayHide={200}
                        delayShow={200}
                        delayUpdate={200}                        
                        border={true}
                        //type={'light'}
                        html={true} 
                        border={true}/>
            </div>
        )
    }

}

export default ResponsiveWrapper(Universe)