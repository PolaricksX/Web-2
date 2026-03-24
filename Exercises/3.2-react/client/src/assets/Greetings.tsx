import { useState } from "react";

export default function Greeting(props: {name: string, color: string}) {
    const [color, setColor] = useState<string>("Green");
      return (
    <div>
     <h1 style={{ color: color }}>Meet my {props.name}</h1>
      <button onClick={() => setColor(color === "green" ? "red" : "green")}>
             Toggle Colour
         </button>
    </div>
      );
}