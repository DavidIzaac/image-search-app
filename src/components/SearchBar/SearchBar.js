import "./SearchBar.css";
import React, { Component } from "react";

import SavedTerm from "../SavedTerm/SavedTerm";

class SearchBar extends Component {

  state = {
    savedTerms: [],
    termsSearch: []
  };
  
  onTermType = e => {
    this.props.onSubmit(e.target.value);
  };

  addToSavedList = () => { 
    if (!this.props.term) return;
    let terms = JSON.parse(localStorage.TermsList);
    
    if (!terms.includes(this.props.term)) {
      terms.push(this.props.term);
      localStorage.setItem("TermsList", JSON.stringify(terms));
      this.setState({ savedTerms: terms });
    }
  };

  componentDidMount() {
    if (!localStorage.TermsList) localStorage.TermsList = JSON.stringify([]);
    else this.setState({ savedTerms: JSON.parse(localStorage.TermsList) });
  }

  handleTermsSearch = term => {
    let markedWords = this.state.termsSearch;
    markedWords.includes(term)
      ? (markedWords = markedWords.filter(word => word !== term))
      : markedWords.push(term);

    this.setState({ termsSearch: markedWords });
    this.props.onSearch(markedWords.join("  "));
  };
  
  render() {

    let termsList = this.state.savedTerms;

    termsList = termsList.map(term => {
      return (
        <SavedTerm key={term} text={term} onSearch={this.handleTermsSearch} />
      );
    });

    return (
      <div className="search-container">
        <div className="search-head">
          <h1 className="search-title">
            Welcome to the image search app !
          </h1>
        </div>
        <div className="search-bar">
          <div className="wrapper">
            <input
              className="search-input"
              type="text"
              placeholder="Start typing..."
              value={this.props.termValue}
              onChange={this.onTermType}
            />
            <button className="save-btn" onClick={this.addToSavedList}>
              <span className="text-btn">
                Save keyword
              </span>
            </button>
          </div>
        </div>
        <div className="saved-container">
          {termsList.length > 0 && <div className="saved-words">{termsList}</div>}
        </div>
      </div>
    );
  }
}

export default SearchBar;
