import React, {Component} from 'react'
import Galaxy from '../galaxy/Galaxy'
import ComicsQueries from '../../dataset/ComicsQueries'

class Universe extends Component{

    render(){
        return (
            <div id="universe">
                <Galaxy data={ComicsQueries.marvelCharacters()} />
                <Galaxy data={ComicsQueries.dcCharacters()} />
            </div>
        )
    }

}

export default Universe