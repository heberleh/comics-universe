
// Adapted code. Original from  Kacper Goliński from https://medium.com/@caspg/responsive-chart-with-react-and-d3v4-afd717e57583

import React, { Component } from 'react'

export default ChartComponent => (
  class ResponsiveChart extends Component {
    constructor(props) {
      super(props)

      this.state = {
        containerWidth: null,
        containerHeight: null,
      }

      this.fitParentContainer = this.fitParentContainer.bind(this)
    }

    componentDidMount() {
      this.fitParentContainer()
      window.addEventListener('resize', this.fitParentContainer)
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.fitParentContainer)
    }

    fitParentContainer() {
      const { containerWidth, containerHeight } = this.state

      console.log("chartContainer", this.chartContainer)
      console.log("chartContainer.parentNode", this.chartContainer.parentNode)
      
      const currentContainerWidth = this.chartContainer.parentNode
                                        .getBoundingClientRect()
                                        .width
      const currentContainerHeight = this.chartContainer.parentNode
                                        .getBoundingClientRect()
                                        .height
                                           
      const shouldResize = (containerWidth !== currentContainerWidth) || (containerHeight !== currentContainerHeight)

      if (shouldResize) {
        this.setState({
          containerWidth: currentContainerWidth,
          containerHeight: currentContainerHeight,
        })
      }
    }

    renderChart() {
      const parentWidth = this.state.containerWidth
      const parentHeight = this.state.containerHeight

      return (
        <ChartComponent {...this.props} width={parentWidth} height={parentHeight}/>
      )
    }

    render() {
      const { containerWidth, containerHeight } = this.state
      const shouldRenderChart = containerWidth !== null && containerHeight !== null

      return (
        <div
          ref={(el) => {this.chartContainer = el }}
          className="Responsive-wrapper"
        >
          {shouldRenderChart && this.renderChart()}
        </div>
      )
    }
  }
)