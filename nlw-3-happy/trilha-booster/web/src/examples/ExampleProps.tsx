import React from "react";

interface TitleProp {
  text: string;
}

function Title(props: TitleProp) {
  return <h1>{props.text}</h1>;
}

function ExampleProps() {
  return (
    <div className="App">
      <Title text="Titulo 1" />
      <Title text="Titulo 2" />
      <Title text="Titulo 3" />
      <Title text="Titulo 4" />
    </div>
  );
}

export default ExampleProps;
