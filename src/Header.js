import React, { Component} from 'react';
import PropTypes from 'prop-types';
import logo from '../static/images/logo.svg';

import "./Header.css"

/**
 * The header of the website
 *
 * @version 1.0.0
 * @author [Henry Heberle](https://github.com/heberleh)
 */
class Header extends Component{
    static propTypes = {
        /**
         * The title of the webpage
         */
        title: PropTypes.string.isRequired,
        /**
         * The author of the webpage
         */
        author: PropTypes.string,
        /** 
         * The author's webpage
         */
        authorUrl: PropTypes.string

        // React Style Guide: https://react-styleguidist.js.org/docs/documenting.html
    }

    render(){
        return(
            <div className="header d-flex justify-content-center align-self-stretch">
                <div className=" d-flex justify-content-center align-items-center">
                    {/* <img src={logo} className="logo" alt="logo" /> */}
                    <span>{this.props.title}</span>
                </div>                
                <div className="d-flex justify-content-right align-items-center">
                    <span className="author">
                        by {' '}
                        <a href={this.props.authorUrl}>
                            {this.props.author} 
                        </a>
                    </span>
                </div>
            </div>           
        );
    }

}

export default Header;