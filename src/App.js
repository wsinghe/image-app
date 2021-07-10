import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { uuid } from "uuidv4";
import api from "./api/Setup";
import Header from "./components/Header";
import AddImage from "./components/AddImage";
import EditImage from "./components/EditImage";
import ImageList from "./components/ImageList";

function App() {
  const [images, setImages] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [page, setPage] = useState(1);

  const retriveImages = async () => {
    const response = await api.get('api/images', { params: { page: page }});

    if(response.data.success == true) {
      return response.data.data;
    }
    return;
  }

  const addImageHandler = async (image) => {
    const response = await api.post('api/images', image);

    if(response.data.success == true) {
      const allImages = await retriveImages();

      if(allImages.data) {
        setImages(allImages.data);
        setPagination(allImages);
      }
      return response.data.data;
    }
    return;
  }

  const editImageHandler = async (image) => {
    const response = await api.post('api/images/' + image.id + "?_method=put", image);

    if(response.data.success == true) {
      const allImages = await retriveImages();

      if(allImages.data) {
        setImages(allImages.data);
        setPagination(allImages);
      }
      return response.data.data;
    }
    return;
  }

  const removeImageHandler = async (id) => {
    const response = await api.post('api/images/' + id + "?_method=delete");

    if(response.data.success == true) {
      const allImages = await retriveImages();

      if(allImages.data) {
        setImages(allImages.data);
        setPagination(allImages);
      }
      return response.data.data;
    }
    return;
  }

  const searchImageHandler = async (text) => {
    const response = await api.get('api/image-search?title=' + text);

    if(response.data.success == true) {
      if(response.data.data.data) {
        setImages(response.data.data.data);
        setPagination(response.data.data);
      }
      return response.data.data;
    }
    return;
  }

  useEffect(() => {
    const getAllImages = async () => {
      const allImages = await retriveImages();

      if(allImages.data) {
        setImages(allImages.data);
        setPagination(allImages);
      }
      console.log(pagination);
    }

    getAllImages();
  }, []);


  return (
      <div className="pusher">

        <Router>
          <Header/>
          <Switch>
            <Route path="/" exact
                   render={(props) => (
                       <ImageList
                           {...props}
                           images={images}
                           pagination={pagination}
                           getImageID={removeImageHandler}
                           searchImage={searchImageHandler}/>
                   )}/>
            <Route path="/add" exact
                   render={(props) => (
                       <AddImage
                           {...props}
                           addImageHandler={addImageHandler}/>
                   )}/>
            <Route path="/image/:id" exact
                   render={(props) => (
                       <EditImage
                           {...props}
                           editImageHandler={editImageHandler}/>
                   )}/>
          </Switch>

        </Router>

      </div>
  );
}

export default App;
