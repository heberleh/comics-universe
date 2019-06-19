

class Character{

    constructor(id){
        this._id = id
        
        this.name = undefined
        this.gender = undefined
        this.birthDate = undefined

        this._abilities = new Set()
        this._edges = {partners: new Set(), children: new Set()}
        this._presentInWorks = new Set()
        this._occupations = new Set()    
    }

    get id(){this._id}

    get initials(){
        if (this.name){
            let names = this.name.split(' ')
            return (names[0][0] + names[names.length-1][0]).toUpperCase()
        }else{
            return undefined
        }
    }

    computeAge(date){
        // TODO subtract birthDate and date
        return undefined
    }

    get abilities(){return this._abilities}
    addAbility(ability){this._abilities.add(ability)}

    get occupations(){return this._occupations}
    addOccupation(occupation){this._occupations.add(occupation)}

    get presentInWorks(){return this._presentInWorks}
    addPresentInWork(work){this._presentInWorks.add(work)}

    get children(){return this._edges.children}
    addChild(child){this._edges.children.add(child)}

    get partners(){return this._edges.partners}
    addPartner(partner){this._edges.partners.add(partner)}
    
}

export default Character