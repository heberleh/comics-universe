import Character from './Character'
const marvelData = require('./marvelCharacters.json')
const dcData = require('./dcCharacters.json')

class LoadDataset{

    static loadCharacters(json){
        let characters = []
        json.forEach(d=>{
                let char = new Character(
                            d._id, 
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
}

export default LoadDataset