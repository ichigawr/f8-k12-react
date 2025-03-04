import React from "react";
import data from "../data";
import "./Grid.css";

function Grid() {
  return (
    <div id="grid" style={{ "--columnsCount": Math.min(data.length, 5) }}>
      {Array.isArray(data) &&
        data.length !== 0 &&
        data.map(({ id, title, price, description }) => (
          <div key={id}>
            <b>{title}</b>
            <span>{price}</span>
            <span>{description}</span>
          </div>
        ))}
    </div>
  );
}

export default Grid;
