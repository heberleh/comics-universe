class Body{

    constructor(data, threshold){
        this.data = data
        this._threshold = threshold //size threshold to be considered a planet

        this.bodyType = Body.computeBodyType(data.presentInWorks.length, threshold)
        this.x = undefined
        this.y = undefined
        this.radius = 5
    }

    static get PLANET(){return 'planet'}
    static get STAR(){return 'star'}
    static get DUST(){return 'dust'}
    
    static computeBodyType(size, threshold){
        if (size > threshold) return Body.PLANET
        if (size > 0)         return Body.STAR
        // not present in works 
        return Body.DUST
    }

    isDust(){return this.bodyType === Body.DUST}
    isPlanet(){return this.bodyType === Body.PLANET}
    isStar(){return this.bodyType === Body.STAR}
}

export default Body