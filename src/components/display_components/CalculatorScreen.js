import React from "react";

function CalculatorScreen(props) {
    return (
        <div className="calculator-screen">
            <div id="displayedValue" className='screen-input'>{props.value}</div>
        </div>
    );
}

export default CalculatorScreen;