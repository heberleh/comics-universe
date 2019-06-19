import dcDB from './comics-characters-js-database/src/DcDB'
import marvelDB from './comics-characters-js-database/src/MarvelDB'
import Character from './Character'

const fs = require('fs');

class ComicsQueries{

   static characters(db){
        // query ids
        let ids = db.exec("SELECT char FROM character").map(d => d.char)

        let characters = [] // list of characters

        // create each character object performing subqueries
        ids.forEach(function(id){
            let char = new Character(id)

            //----- Single Values :: query[0] -----
            let queryName = `SELECT charLabel FROM character WHERE char ="${id}"`
            char.name = db.exec(queryName)[0].charLabel

            let queryGender = `SELECT LOWER(genderLabel) as gender FROM gender WHERE char = "${id}"`
            char.gender = db.exec(queryGender)[0] ? db.exec(queryGender)[0].gender : undefined

            let queryBirthDate = `SELECT LOWER(birthDate) as birthDate FROM birthDate WHERE char = "${id}"`
            char.birthDate = db.exec(queryBirthDate)[0] ? db.exec(queryBirthDate)[0].birthDate : undefined

            //----- Multiple Values :: set.add() -----
            let queryAbilities = `SELECT DISTINCT LOWER(abilityLabel) AS ability FROM abilities\
                                  WHERE char = "${id}"`
            db.exec(queryAbilities).forEach(d=>char.addAbility(d.ability))

            let queryOccupation = `SELECT DISTINCT occupation, LOWER(occupationLabel) AS occupationL FROM occupation\
                                    WHERE char = "${id}"`
            db.exec(queryOccupation).forEach(d=>char.addOccupation(d.occupationL))                       

            let queryWork = `SELECT DISTINCT presentInWork, presentInWorkLabel AS work FROM presentInWork\
                                    WHERE char = "${id}"`
            db.exec(queryWork).forEach(d=>char.addPresentInWork(d.work))              
            
            let queryChildren = `SELECT DISTINCT child AS id, childLabel AS name FROM child\
                                    WHERE char = "${id}"`
            db.exec(queryChildren).forEach(child=>char.addChild(child))                

            let queryPartners = `SELECT DISTINCT partner AS id, partnerLabel AS name FROM partner\
                                    WHERE char = "${id}"`
            db.exec(queryPartners).forEach(partner=>char.addPartner(partner)) 
            
            characters.push(char)
        })
        return characters
    }

    static saveDcCharacters(){        
        let characters = ComicsQueries.characters(dcDB)
        let data = JSON.stringify(characters)

        fs.writeFile("dcCharacters.json", data, function(err) {
            if (err) {
                console.log(err);
            }
        });
    }

    static saveMarvelCharacters(){
        let characters = ComicsQueries.characters(marvelDB)
        let data = JSON.stringify(characters)
        fs.writeFile("marvelCharacters.json", data, function(err) {
            if (err) {
                console.log(err);
            }
        });
    }

    static charactersTotalSkills(){
        let query = "SELECT c.char AS url, c.charLabel AS name, COUNT(DISTINCT a.ability) AS total\
                     FROM character c JOIN abilities a ON a.char = c.char\
                     GROUP BY c.char, c.charLabel\
                     ORDER BY total\
                     LIMIT 500"

        return {
            data: marvelDB.exec(query), 
            bandFunc: d=>d.name, 
            valueFunc: d=>d.total, 
            urlFunc: d=>d.url
        }
    }
    
    static skillsDistribution(){
        let query = "SELECT LOWER (a.abilityLabel) AS ability, COUNT(c.char) AS total, a.abilityDescription AS description\
                     FROM character c JOIN abilities a ON a.char = c.char\
                     GROUP BY LOWER (a.abilityLabel), a.abilityDescription\
                     ORDER BY total"

        return {
            data: marvelDB.exec(query), 
            bandFunc: d=>d.ability, 
            valueFunc: d=>d.total, 
            urlFunc: d=>d.url,
            descriptionFunc: d=>d.description
            }
    }

    static skillsDistributionByGender(){
        
        let query = `SELECT LOWER (a.abilityLabel) AS abilityLabel,\
                            a.abilityDescription   AS description,\
                            LOWER (g.genderLabel)  AS genderLabel,\
                            COUNT(c.char)          AS total\
                     FROM character c 
                            JOIN      abilities a ON a.char = c.char\
                            LEFT JOIN gender    g ON c.char = g.char\
                     GROUP BY LOWER (a.abilityLabel), a.abilityDescription, LOWER (g.genderLabel)\
                     ORDER BY abilityLabel`


        let data = marvelDB.exec(query)        
        let newData = {}
        let allGenders = new Set()
        let allGendersTotals = {}        
        data.forEach(row => {
            if (row.abilityLabel in newData){
                newData[row.abilityLabel].values[row.genderLabel] = row.total
            } else{
                let node = {values: {}, description: row.description}
                node.values[row.genderLabel] = row.total
                newData[row.abilityLabel] = node
            }

            !(row.genderLabel in allGenders) && allGenders.add(row.genderLabel)
            row.genderLabel in allGenders? allGendersTotals += row.total : allGendersTotals[row.genderLabel] = row.total
        });       

        // Sort by gender
        allGenders = Array.from(allGenders)
        allGenders.sort((a,b) =>allGendersTotals[b]-allGendersTotals[a])        

        let rows = []
        for (let ability in newData){
            let row = {description: newData[ability].description, ability: ability, values: []}
            for (let i in allGenders){
                let gender = allGenders[i]
                if (gender in newData[ability].values){
                    row.values.push(newData[ability].values[gender])
                }else{
                    row.values.push(0)
                }
            }
            rows.push(row)
        }
        
        // Sor by ability
        rows.sort((d1, d2) => d1.values.reduce((a,b)=>a+b) - d2.values.reduce((a,b)=>a+b))
        
        return {
            data: rows, 
            labels: allGenders,
            bandFunc: d=>d.ability, 
            valueFunc: d=>d.values, 
            urlFunc: d=>'',
            descriptionFunc: d=>d.description
        }
    }

    static findGenders(){
        let query = "SELECT DISTINCT genderLabel from gender"
        return {data: marvelDB.exec(query)}
        // == Result == kown = []
        // male     
        // male organism
        // female   
        // female organism
        // neutral sex
        // hermaphrodite
        // genderfluid
        // transgender female
        // agender
        // t1331922231
        // t1300761634
        // non-binary   
        // t1435955685
    }

}

export default ComicsQueries;