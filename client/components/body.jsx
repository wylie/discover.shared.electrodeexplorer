import React from "react";
import Header from "./header";
import SearchBar from "./search-bar";
import Menu from "./menu";

const Body = (props) => {
  return (
    <div className="explorer">
      <Header/>
      <SearchBar/>
      <div className="explorer-body">
        <Menu/>
        {props.children}
      </div>
    </div>
  );
};

Body.propTypes = {
  children: React.PropTypes.node
};

export default Body;
