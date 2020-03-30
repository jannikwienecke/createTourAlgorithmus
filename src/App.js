import React from "react";
import "./styles.css";

import Paletts from "./Pallets";
import { LKW, LoadingZone } from "./styles";
import { DELIVERY } from "./data";

export default function App() {
  return (
    <div className="App">
      <h1>TOUR ALGORITHMUS</h1>
      {/* <LKW>
        <LoadingZone> */}
      <Paletts delivery={JSON.parse(JSON.stringify(DELIVERY))} />
      {/* </LoadingZone>
      </LKW> */}
    </div>
  );
}
