import React from 'react';
import { Link } from "react-router-dom";

class Header extends React.Component {
    render() {
        return (
            <div className="ui inverted menu">
                <div className="ui container">
                    <a href="#" className="header item">
                        Image Library App
                    </a>
                    <a href="/" className="item">Home</a>
                    <a href="/add" className="item">Add Image</a>
                </div>
            </div>
        );
    }
}

export default Header;
