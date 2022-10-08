import React from "react";

const style = {
  border: "3px solid #ffdaec",
  fontSize: "40px",
  backgroundColor: "#fff0fa",
  color: "#56354d",
};
const Box = (props) => (
  <button style={style} onClick={() => props.onClick(props.index)}>
    {props.value}
  </button>
);

export default Box;
