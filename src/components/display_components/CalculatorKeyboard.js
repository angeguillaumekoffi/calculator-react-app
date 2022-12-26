import React from 'react';
import Button from "../action_components/Button";

function CalculatorKeyboard (props) {
  const renderButton = (button, index) => {
    return (
      <Button key={index} value={[button.type, button.value]} className={button.className} onClick={() => props.onClick(button)} text={button.text} />
    );
  }

  return (
    <div className="calculator-keyboard">
      <div className="button_container sm_buton_container">
        {
          props.small_buttons.map((button, index) => (renderButton(button, index)))
        }
      </div>

      <div className="button_container lg_buton_container">
        {
          props.large_buttons.map((button, index) => (renderButton(button, index)))
        }
      </div>
    </div>
  )
}

export default CalculatorKeyboard;