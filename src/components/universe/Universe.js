import React, {PureComponent} from 'react'
import Galaxy from '../galaxy/Galaxy'
import SearchBox from '../SearchBox'
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

        this.state = {showPartners: false, showChildren: false}
        this._setShowChildren = this._setShowChildren.bind(this)
        this._setShowPartners = this._setShowPartners.bind(this)

        this.Viewer = null

        this.marvelCharacters = props.marvelData
        this.dcCharacters = props.dcData

        this.marvelCharacters.sort((a,b) => (a.initials > b.initials) ? 1 : ((b.initials > a.initials) ? -1 : 0))
        this.dcCharacters.sort((a,b) => (a.initials > b.initials) ? 1 : ((b.initials > a.initials) ? -1 : 0))

        if (this.dcCharacters === undefined) {throw new Error("ComicsQueries.saveDcCharacters() should be executed to save the data")}
        if (this.marvelCharacters === undefined) {throw new Error("ComicsQueries.saveMarvelCharacters() should be executed to save the data")}
    }

    componentDidMount() {
        this.Viewer.closeMiniature();
        this.Viewer.fitToViewer();    
        
    }

    _setShowChildren(b){
        this.setState({showChildren: b})        
    }
    _setShowPartners(b){
        this.setState({showPartners: b})
    }

    render(){
        console.log("dimensions***", this.props.width, this.props.height)
        let svgWidth = 1600
        let svgHeight = 700
        return (
            <div id='div-universe'>                        
                <UncontrolledReactSVGPanZoom
                        key="Universe-View" 
                        detectAutoPan={false}              
                        className='Universe-viewer'                 
                        width={this.props.width} height={this.props.height}
                        ref={Viewer => this.Viewer = Viewer}
                        //onClick={event => console.log('click', event.x, event.y, event.originalEvent)}
                        background='black'
                        SVGBackground='black'
                        toolbarProps={{SVGAlignX: 'center', SVGAlignY: 'center'}}>            
                    
                    <svg className="Universe" width={svgWidth} height={svgHeight} styles='background-color:"black"'>
                        <Galaxy 
                            key={'marvel-galaxy'}
                            data={this.marvelCharacters}
                            comic='marvel'
                            x={435}
                            y={355}
                            showPartners={this.state.showPartners}
                            showChildren={this.state.showChildren}
                        />
                        <Galaxy
                            key={'dc-galaxy'}
                            data={this.dcCharacters}
                            comic='dc'
                            x={1150}
                            y={355}
                            showPartners={this.state.showPartners}
                            showChildren={this.state.showChildren}
                        />
                    </svg>
                </UncontrolledReactSVGPanZoom>
                <hr/>
                <SearchBox />
                <button className="Universe-Button Universe-Button-child"
                        onClick={()=>this._setShowChildren(!this.state.showChildren)}>Children</button>
                <button className="Universe-Button Universe-Button-partner" 
                        onClick={()=>this._setShowPartners(!this.state.showPartners)}>Partners</button>     

                
                
                <Tooltips />
            </div>
        )
    }

}

export default ResponsiveWrapper(Universe)