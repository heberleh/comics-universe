class Body{

    constructor(data, threshold){
        this.data = data
        this._threshold = threshold

        this.bodyType = Body.computeBodyType(data.presentInWorks.length, threshold)
        this.x = 0
        this.y = 0
        this.radius = 5        
    }

    static computeBodyType(size, threshold){
        if (size > threshold) return"planet"
        if (size > 0)         return "star"
        // not present in works 
        return "dust"
    }
}

export default Body