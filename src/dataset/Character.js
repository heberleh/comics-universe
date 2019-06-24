import { timeHour } from "d3-time";


class Character{

    constructor(id, name=undefined, gender=undefined, birthDate=undefined, abilities=[], partners=[], children=[], presentInWorks=[], occupations=[]){
        this.id = id
        this.name = name
        this.gender = gender
        this.birthDate = birthDate

        this._abilities = abilities
        this._partners = partners
        this._children = children
        this._presentInWorks = presentInWorks
        this._occupations = occupations
    }

    get key(){
        let v = this.id.split('/')
        return v[v.length-1]
    }

    get url(){return this.id}

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
    addAbility(ability){
        if (!(ability in this._abilities)){
            this._abilities.push(ability)
        }                
    }

    get occupations(){return this._occupations}
    addOccupation(occupation){
        if(!(occupation in this._occupations)){
            this._occupations.push(occupation)
        }
    }

    get presentInWorks(){return this._presentInWorks}
    addPresentInWork(work){
        if(!(work in this._presentInWorks)){
            this._presentInWorks.push(work)
        }        
    }

    get children(){return this._children}
    addChild(child){
        if (!(child in this._children)){
            this._children.push(child)
        }
    }

    get partners(){return this._partners}
    addPartner(partner){
        if(!(partner in this._partners)){
            this._partners.push(partner)
        }
    }
    
}

export default Character