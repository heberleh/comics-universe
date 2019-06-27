import React, {PureComponent} from 'react'
import Galaxy from '../galaxy/Galaxy'
import LoadDataset from '../../../src/dataset/LoadDataset'
import './Universe.css'
import './../star/Star.css'

import {UncontrolledReactSVGPanZoom} from 'react-svg-pan-zoom';
import ResponsiveWrapper from '../ResponsiveWrapper'


function Tooltips(props){
    return <div id="tooltips"></div>
  }
  
class Universe extends PureComponent{

    constructor(props){
        super(props)

        this.Viewer = null

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
                        key="Universe-View"                  
                        className='Universe-viewer'                 
                        width={this.props.width} height={this.props.height}
                        ref={Viewer => this.Viewer = Viewer}
                        onClick={event => console.log('click', event.x, event.y, event.originalEvent)}
                        background='black'
                        SVGBackground='black'
                        toolbarProps={{SVGAlignX: 'center', SVGAlignY: 'center'}}>            
                    
                    <svg className="Universe" width={svgWidth} height={svgHeight} styles='background-color:"black"'>
                        <Galaxy key={'dc-galaxy'} data={this.dcCharacters} comic='dc'             x={435}  y={355} showPartners={false} showChildren={false}/>
                        <Galaxy key={'marvel-galaxy'} data={this.marvelCharacters} comic='marvel' x={1150} y={355} showPartners={false} showChildren={false}/>
                    </svg>
                </UncontrolledReactSVGPanZoom>

                <Tooltips />
            </div>
        )
    }

}

export default ResponsiveWrapper(Universe)