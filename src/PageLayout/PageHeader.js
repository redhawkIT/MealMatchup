import React, { Component } from 'react';
import './PageHeader.css';
import logo from 'public-encrypt';

class PageHeader extends Component {
    render(){
        return(
            <div className="page-container">
                <p className="page-title">{this.props.value}</p>
            </div>
        )
    }
}

export default PageHeader;