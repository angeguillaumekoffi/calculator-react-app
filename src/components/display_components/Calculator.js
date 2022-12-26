import React, { useState } from 'react';
import OperationFactory from '../../bussiness_factory/Operation';
import CalculatorHeader from "./CalculatorHeader";
import CalculatorKeyboard from "./CalculatorKeyboard";
import CalculatorScreen from "./CalculatorScreen";


function useAsyncState(initialValue) {
  const [value, setValue] = useState(initialValue);
  const setter = x =>
    new Promise(resolve => {
      setValue(x);
      resolve(x);
    });
  return [value, setter];
}


function Calculator(props) {
  const [dataState, setdataState] = useAsyncState({
    isResultPrinted: false,
    operateur: null,
    inMemoryResult: 0,
    inMemoryInput: 0,
    displayedValue: 0,
    isAwaitingValue: true,
    isCommaActive: false
  });


  const buttons = {
    small_buttons: [
      { text: "7", value: 7, type: "input", className: 'sm_num_button' },
      { text: "8", value: 8, type: "input", className: 'sm_num_button' },
      { text: "9", value: 9, type: "input", className: 'sm_num_button' },
      { text: "DEL", value: "del", type: "commande", className: 'del_button' },
      { text: "4", value: 4, type: "input", className: 'sm_num_button' },
      { text: "5", value: 5, type: "input", className: 'sm_num_button' },
      { text: "6", value: 6, type: "input", className: 'sm_num_button' },
      { text: "+", value: "add", type: "operation", className: 'sm_num_button' },
      { text: "1", value: 1, type: "input", className: 'sm_num_button' },
      { text: "2", value: 2, type: "input", className: 'sm_num_button' },
      { text: "3", value: 3, type: "input", className: 'sm_num_button' },
      { text: "-", value: "sub", type: "operation", className: 'sm_num_button' },
      { text: ".", value: ".", type: "comma", className: 'sm_num_button' },
      { text: "0", value: 0, type: "input", className: 'sm_num_button' },
      { text: "/", value: "div", type: "operation", className: 'sm_num_button' },
      { text: "x", value: "mul", type: "operation", className: 'sm_num_button' }
    ],
    large_buttons: [
      { text: "RESET", value: "raz", type: "commande", className: 'reset_button' },
      { text: "=", value: "result", type: "output", className: 'result_button' }
    ]
  }


  const handleClick = (button) => {
    // Au clic d'un bouton, on recupere ses attribs puis on verifie son type avant d'executer l'action correspondante
    switch (button.type) {
      case "input":  // S'il est de type input 
        if (dataState.isResultPrinted) {
          setdataState({
            ...dataState,
            isResultPrinted: false,
            operateur: null,
            inMemoryResult: 0,
            inMemoryInput: `${button.value}`,
            displayedValue: `${button.value}`,
            //isCommaActive: false
          });

        }else {
          setdataState({
            ...dataState,
            displayedValue: Number(dataState.displayedValue) === 0 && !dataState.isCommaActive ? `${button.value}` : `${dataState.displayedValue}${button.value}`,
            inMemoryInput: Number(dataState.inMemoryInput) === 0 && !dataState.isCommaActive ? `${button.value}` : `${dataState.inMemoryInput}${button.value}`,
            isAwaitingValue: false,
            isResultPrinted: false,
            //isCommaActive: false
          })
        }

        break;

      case "operation":   // S'il est de type operateur
        if (!dataState.isAwaitingValue) {
          if (!dataState.operateur) {
            setdataState({
              ...dataState,
              inMemoryResult: Number(dataState.inMemoryResult) > 0 ? dataState.inMemoryResult : dataState.inMemoryInput,
              displayedValue: Number(dataState.inMemoryResult) > 0 ? `${dataState.inMemoryResult}${button.text}` : `${dataState.inMemoryInput}${button.text}`,
              inMemoryInput: 0,
              operateur: button.value,
              isAwaitingValue: true,
              isResultPrinted: false,
              isCommaActive: false
            });

          } else {

            setdataState({
              ...dataState,
              inMemoryResult: new OperationFactory(dataState.operateur, { value1: Number(dataState.inMemoryResult), value2: Number(dataState.inMemoryInput) }).calculate()
            }).then(dataState =>
              setdataState({
                ...dataState,
                displayedValue: dataState.isResultPrinted ? `${dataState.inMemoryResult}${button.text}` : Number(dataState.displayedValue) === 0 ? `${button.text}` : `${dataState.displayedValue}${button.text}`,
                inMemoryInput: 0,
                operateur: button.value,
                isAwaitingValue: true,
                isResultPrinted: false,
                isCommaActive: false
              })
            );
          }
        }
        break;

      case "commande":   // S'il est de type commande
        switch (button.value) {
          case 'raz':
            setdataState({
              ...dataState,
              isResultPrinted: false,
              operateur: null,
              inMemoryResult: 0,
              inMemoryInput: 0,
              displayedValue: 0,
              isAwaitingValue: true,
              isCommaActive: false
            })
            break;

          case 'del':
            if (Number(dataState.inMemoryInput) !== 0 && String(dataState.inMemoryInput).length > 0) {
              setdataState({
                ...dataState,
                displayedValue: dataState.displayedValue.slice(0, -1),
                inMemoryInput: dataState.inMemoryInput.slice(0, -1),
              })
            } else if (Number(dataState.inMemoryResult) !== 0 && String(dataState.inMemoryResult).length > 0) {
              setdataState({
                ...dataState,
                displayedValue: dataState.displayedValue.slice(0, -1),
                inMemoryResult: Number(String(dataState.inMemoryResult).slice(0, -1)),
              })
            } else {
              setdataState({
                ...dataState,
                displayedValue: 0,
                inMemoryResult: 0,
                inMemoryInput: 0,
              })
            }
            break;

          default:
            break;
        }
        break;

      case "comma":
        if (!dataState.isCommaActive && !dataState.isResultPrinted) {
          setdataState({
            ...dataState,
            displayedValue: `${dataState.displayedValue}${button.value}`,
            inMemoryInput: `${dataState.inMemoryInput}${button.value}`,
            isAwaitingValue: false,
            isResultPrinted: false,
            isCommaActive: true
          })
        }
        break;

      case "output":
        if (!dataState.isResultPrinted && !dataState.isAwaitingValue) {
          if (dataState.operateur === "div" && Number(dataState.inMemoryInput) === 0) {
            alert("Erreur la division par zero n'est pas autorisée !")
          } else {
            setdataState({
              ...dataState,
              inMemoryResult: new OperationFactory(dataState.operateur, { value1: Number(dataState.inMemoryResult), value2: Number(dataState.inMemoryInput) }).calculate()
            }).then(dataState =>
              setdataState({
                ...dataState,
                displayedValue: `${dataState.displayedValue} = ${dataState.inMemoryResult}`,
                inMemoryInput: 0,
                operateur: null,
                isAwaitingValue: false,
                isResultPrinted: true,
                isCommaActive: false
              })
            );
          }

          console.log(dataState);
        }
        break;

      default:
        break;
    }
  }

  return (
    <div className="calculator">
      <CalculatorHeader />
      <CalculatorScreen value={dataState.displayedValue} />
      <CalculatorKeyboard small_buttons={buttons.small_buttons} large_buttons={buttons.large_buttons} onClick={(button) => handleClick(button)} />
    </div>
  );
}

export default Calculator;