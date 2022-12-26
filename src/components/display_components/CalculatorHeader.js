import React from "react";
import ThemeSwitcherButton from "../action_components/ThemeSwitcherButton";

function CalculatorHeader() {
    return (
      <div className="calculator-header">
          <div className="title">
            Calculator by Ange Guillaume Koffi
          </div>
          <ThemeSwitcherButton />
      </div>
    );
  }
  
  export default CalculatorHeader;