import React from 'react';

const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            resolve(fileReader.result);
        }
        fileReader.onerror = (error) => {
            reject(error);
        }
    })
}

class AddImage extends React.Component {
    state = {
        title: "",
        image: null,
        description: ""
    }

    changeHandler = async (event) => {
        const file = event.target.files[0]
        const base64 = await convertBase64(file)
        console.log(base64);
        this.setState({'image': base64})
    };

    handleSubmission = (event) => {
        event.preventDefault();
        console.log(event.target.image);
        const formData = new FormData();
        if(this.state.title === "" || this.state.description === "") {
            alert("All fields need to be fill..");
            return;
        }
        this.props.addImageHandler(this.state);
        this.setState({title:"", image: null, description:""});
        this.props.history.push("/");
    };

    render() {
        return (
            <div className="ui main add-contact">
                <div className="ui container">
                    <div className="ui header">Add Image</div>
                    <form className="ui form" onSubmit={this.handleSubmission}  enctype="multipart/form-data">
                        <div className="field">
                            <label>Title</label>
                            <input type="text"
                                   name="title"
                                   placeholder="Title"
                                   value={ this.state.title }
                                   onChange={ (e) => this.setState({title: e.target.value}) } />
                        </div>
                        <div className="field">
                            <label>Image</label>
                            <input type="file"
                                   name="image"
                                   onChange={this.changeHandler}/>
                        </div>
                        <div className="field">
                            <label>Description</label>
                            <textarea name="description"
                                      cols="30"
                                      rows="10"
                                      onChange={ (e) => this.setState({description: e.target.value}) } >
                                { this.state.description }
                            </textarea>
                        </div>
                        <button className="ui button blue" type="submit" >Add</button>
                        <button className="ui button" to="/" >Back</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddImage;
