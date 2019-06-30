import Character from './Character'
const marvelData = require('./marvelCharacters.json')
const dcData = require('./dcCharacters.json')

class LoadDataset{

    static loadCharacters(json){
        let characters = []
        json.forEach(d=>{
                let char = new Character(
                            d.id, 
                            d.name, 
                            d.gender, 
                            d.birthDate, 
                            d._abilities, 
                            d._partners, 
                            d._children, 
                            d._presentInWorks, 
                            d._occupations );
                characters.push(char)                
            }    
        );
        return characters
    }

    static marvelData(){
        return LoadDataset.loadCharacters(marvelData)
    }

    static dcData(){
        return LoadDataset.loadCharacters(dcData)
    }

    static abilitiesDataModel(data){
        let model = {data: [], valueFunc: d=>d.total, bandFunc: d=>d.label, classFunc: d=>d.cssClass}
       
        let count = {} // count number of char. has each ability
        let countMale = {} // do the same for males
        let countNonMale = {} //do the same for nonMales = #males - #undefined

        model.count = count
        model.countMale = countMale
        model.countNonMale = countNonMale

        function countAb(counter, ability){
            if(ability in counter){
                return counter[ability]
            }else{
                return 0
            }
        }

        function incrementCount(counter, ability){
            if (ability in counter){
                counter[ability] +=1
            }else{
                counter[ability] = 1
            }
        }

        model.getTooltipHtml = (model, d) => {
            let ability = model.bandFunc(d)
            return "<div style='max-width:400px'><b>"+
                    ability+"</b><br><br>"+
                    "<b>" + countAb(model.count, ability) + "</b> in total <br>"+
                    countAb(model.countMale, ability) + " males and " +
                    countAb(model.countNonMale, ability) + " females, transgender or other<br><br>" + 
                    d.names.join(', ')+"</div>"
        }

        let names = {}
        data.forEach(char => {
            char.abilities.forEach(ability => {
                
                names[ability] === undefined? names[ability] = [char.name] : names[ability].push(char.name)

                incrementCount(count, ability)
                if (char.gender !== undefined){
                    if (char.gender === 'male'){
                        incrementCount(countMale, ability)
                    }else{
                        incrementCount(countNonMale, ability)
                    }                    
                }
            })
        })


        for(let ability in count){
            let abilityData = {}
            abilityData.total = count[ability]
            abilityData.label = ability
            abilityData.cssClass = countAb(countMale, ability) >= countAb(countNonMale, ability) ? 'BarChart-Ability-male' : 'BarChart-Ability-nonMale'
            abilityData.names = names[ability]           
            model.data.push(abilityData)
        }

        model.data.sort((a,b) => (a.total > b.total) ? 1 : ((b.total > a.total) ? -1 : 0))
        
        return model
    }
}

export default LoadDataset