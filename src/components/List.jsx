import React from "react";
import data from "../data";
import "./List.css";

function List() {
  return (
    <table>
      <thead>
        <tr>
          <th>No.</th>
          <th>Title</th>
          <th>Price</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ id, title, price, description }, index) => (
          <tr key={id}>
            <td>{index}</td>
            <td>{title}</td>
            <td>{price}</td>
            <td>{description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default List;
