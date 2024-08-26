import React from "react";
import Header from "./albums/Header";
import PhotoGrid from "./albums/PhotoGrid";

const ShowAlbums = () => {
    return (
        <div>
            <Header />
            <div style={{marginTop: '20px' , padding: '2opx'}}>
                <PhotoGrid />
            </div>
        </div>
    );
}; 


export default ShowAlbums; 