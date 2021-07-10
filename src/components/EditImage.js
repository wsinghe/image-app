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

const isBase64 = (str) => {
    if (str ==='' || str.trim() ===''){ return false; }
    try {
        return btoa(atob(str)) == str;
    } catch (err) {
        return false;
    }
}

class EditImage extends React.Component {
    state = {
        id: this.props.location.state.image.id,
        title: this.props.location.state.image.title,
        image : this.props.location.state.image.image,
        description: this.props.location.state.image.description
    }
    changeHandler = async (event) => {
        const file = event.target.files[0]
        const base64 = await convertBase64(file)
        console.log(base64);
        this.setState({'image': base64})
    };

    handleSubmission = (event) => {
        event.preventDefault();

        const formData = new FormData();
        if(this.state.title === "" || this.state.description === "") {
            alert("All fields need to be fill..");
            return;
        }

        if(!isBase64(this.state.image)) {
            this.setState({image: null});

        }

        this.props.editImageHandler(this.state);
        this.setState({title:"", image: null, description:""});
        this.props.history.push("/");
    };

    render() {
        return (
            <div className="ui main edit-contact">
                <div className="ui container">
                    <div className="ui header">Edit Image - [{this.state.title}]</div>
                    <form className="ui form" onSubmit={this.handleSubmission}  enctype="multipart/form-data">
                        <div className="field">
                            <label>Title</label>
                            <input type="text"
                                   name="title"
                                   placeholder="Title"
                                   value={this.state.title}
                                   onChange={ (e) => this.setState({title: e.target.value}) } />
                        </div>
                        <div className="field">
                            <label>Image</label>
                            <input type="file"
                                   name="image"
                                   onChange={this.changeHandler}/>
                        </div>
                        <div className="field">
                            <img src={this.state.image} className="image" alt=""/>
                        </div>
                        <div className="field">
                            <label>Description</label>
                            <textarea name="description"
                                      cols="30"
                                      rows="10"
                                      onChange={ (e) => this.setState({description: e.target.value}) } >
                                {this.state.description}
                            </textarea>
                        </div>
                        <button className="ui button yellow" type="submit" >Update</button>
                        <button className="ui button " to="/" >Back</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default EditImage;
