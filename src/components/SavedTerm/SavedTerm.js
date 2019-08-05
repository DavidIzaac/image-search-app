import "./SavedTerm.css";
import React from "react";

class SavedTerm extends React.Component {
  state = {
    isClikced: false
  };

  handleClick = () => {
    this.props.onSearch(this.props.text);
    this.setState({isClikced: !this.state.isClikced})
  };

  render() {
    return (
      <div className="saved-word">
        <button
          ref={this.termRef}
          className={`term-btn ${this.state.isClikced? 'clicked': ''}`}
          onClick={this.handleClick}
        >
          {this.props.text}
        </button>
      </div>
    );
  }
}
export default SavedTerm;
