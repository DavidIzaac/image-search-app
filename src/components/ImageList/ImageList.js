import "./ImageList.css";
import ImagePreview from "../ImagePreview/ImagePreview";
import React from "react";

const ImageList = props => {
  const imgsDisp = props.imgs;
  const imgs = imgsDisp.map(img => {
    return <ImagePreview key={img.id} img={img} />;
  });
  return <div className="image-list">{imgs}</div>;
};

export default ImageList;
