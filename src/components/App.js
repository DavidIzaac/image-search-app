import flickr from "../api/flickr";
import SearchBar from "./SearchBar/SearchBar";
import ImageList from "./ImageList/ImageList";
import "./App.css";
import React from "react";

const API_KEY = "bac9f1ccfd854f27894fd47c4f01b1e8";
const NUM_OF_IMGS = 40;

class App extends React.Component {
  state = { imgs: [], index: 1, term: "" };

  onSearchSubmit = async term => {
    this.setState({ term });
    if (!term) this.setState({ imgs: [] });
    else {
      const res = await flickr.get(
        "services/rest/?method=flickr.photos.search",
        {
          params: {
            text: term,
            safe_search: 1,
            format: "json",
            nojsoncallback: 1,
            api_key: API_KEY,
            content_type: 1,
            is_getty: 1,
            per_page: NUM_OF_IMGS
          }
        }
      );
      this.setState({ imgs: res.data.photos.photo });
    }
  };

  render() {
    return (
      <div className="app-container">
        <SearchBar onSubmit={this.onSearchSubmit} termValue={this.state.term} term={this.state.term} onSearch={this.onSearchSubmit}/>
        <ImageList imgs={this.state.imgs} />
      </div>
    );
  }
}

export default App;
