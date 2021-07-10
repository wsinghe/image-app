import React from 'react'
import { Link } from "react-router-dom";

class ImageCard extends React.Component {
    render() {
        const {id, title, description, image} = this.props.image;
        return (
            <tr>
                <td>{ id }</td>
                <td><img src={image} alt="{ title }" className="image" /> </td>
                <td>{ title }</td>
                <td>{ description }</td>
                <td>
                    <Link to={{pathname: `image/${id}`, state: {image: this.props.image}}}>
                        <i className="edit alternate outline icon"
                           style={{color: 'yellow'}}></i>
                    </Link>
                    <i className="trash alternate outline icon"
                       style={{color: 'red'}} onClick={() => this.props.deleteImageHandler(this.props.image.id)}></i>
                </td>
            </tr>
        );
    }
}

export default ImageCard;