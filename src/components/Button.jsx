import React from "react";
import "./Button.css";

function Button({ listView, handleClick }) {
  return (
    <button onClick={() => handleClick(!listView)}>{listView ? "Grid" : "List"}</button>
  );
}

export default Button;
