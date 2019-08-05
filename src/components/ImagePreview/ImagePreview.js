import React from "react";
import './ImagePreview.css';

class ImagePreview extends React.Component {
  constructor(props) {
    super(props);
    this.imgEl = React.createRef();
    this.state = { span: 1 };
  }

  componentDidMount() {
    this.imgEl.current.addEventListener("load", this.calcSpace);
  }

  calcSpace = () => {
    if (!this.imgEl.current) return;
    const span = Math.ceil(this.imgEl.current.clientHeight / 10 + 4);
    this.setState({ span });
  };

  render() {
    const currImg = this.props.img;
    const picSrc = `https://farm${currImg.farm}.staticflickr.com/${currImg.server}/${currImg.id}_${currImg.secret}.jpg`;
    return (
      <div  className="img-container" style={{ gridRowEnd: ` span ${this.state.span}` }}>
        <a href={picSrc} target="_blank" rel="noopener noreferrer">
          <img className="img-disp" ref={this.imgEl} src={picSrc} alt={currImg.title} />
        </a>
        <p className="img-desc">{currImg.title.slice(0,76)}</p>
      </div>
    );
  }
}

export default ImagePreview;
