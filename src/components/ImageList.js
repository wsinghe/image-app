import React from 'react';
import { Link } from "react-router-dom";
import ImageCard from "./ImageCard";
import PaginateItem from "./PaginateItem";

class ImageList extends React.Component {
    state = {
        search: ""
    }

    render() {
        const deleteImageHandler = (id) => {
            this.props.getImageID(id);
        };

        const searchByTitle = (e) => {
            this.setState({search: e.target.value})
            this.props.searchImage(this.state.search)

            return this.state.search;
        }

        const renderImageList = this.props.images.map((image) => {
            return (
                <ImageCard image={image} deleteImageHandler={deleteImageHandler}/>
            );
        });


        /*const renderPagination = this.props.pagination.links.map((item) => {
            return (
                <PaginateItem pagination={item}/>
            );
        });*/

        return (
            <div className="ui container image-list">
                <div className="ui header">
                    <span>All Images</span>

                    <Link to="/add">
                        <button className="ui button blue right">
                            Add Image
                        </button>
                    </Link>
                </div>

                <div >
                    <div className="ui icon input loading search">
                        <input type="text"
                               name="search"
                               placeholder="Search by Title"
                               value={this.state.search}
                               onChange={ searchByTitle } />
                        <i className="search icon"></i>
                    </div>
                </div>
                <table className="ui attached inverted table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>###</th>
                    </tr>
                    </thead>
                    <tbody>
                        { renderImageList }
                    </tbody>
                </table>
                <div className="ui pagination menu">
                    {/*{renderPagination}*/}
                </div>
            </div>
        );
    }
}

export default ImageList;