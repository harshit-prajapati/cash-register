import React, { useState } from "react";
import "./styles.css";

let noteBank = {
  1: "",
  5: "",
  10: "",
  20: "",
  100: "",
  500: "",
  2000: ""
};
let billAmount = "";
let cashAmount = "";

function App() {
  const [notes, setNotes] = useState(noteBank);
  const [next_btn_visible, setnext_btn_visible] = useState("none");
  const [cashGiven, setcashGiven] = useState("none");
  const [checkBtn, setcheckBtn] = useState("none");
  const [summary, setSummary] = useState("none");
  const [output, setOutput] = useState("none");

  const noteBankArray = Object.keys(notes).sort(function (a, b) {
    return b - a;
  });

  const next_btn_visibleHandler = (e) => {
    setnext_btn_visible("initial");
    billAmount = Number(e.target.value);
  };

  const nextBtnHandler = () => {
    if (billAmount < 0) alert("Bill Amount should be greater than 0");
    else setcashGiven("initial");
  };
  const checkBtnVisible = (e) => {
    cashAmount = Number(e.target.value);
    setcheckBtn("initial");
  };

  const checkBtnHandler = () => {
    if (cashAmount < billAmount)
      alert("Cash Given should be more than Bill Amount");
    else changeHandler();
    calculateNotes(cashAmount, billAmount);
  };
  const changeHandler = () => {
    setSummary("initial");
    setOutput("initial");
  };

  function calculateNotes(cash, bill) {
    let diff = cash - bill;
    noteBankArray.forEach((note) => {
      let noteNo = Number(note);
      if (diff >= noteNo) {
        let count = Math.floor(diff / noteNo);
        diff = diff - noteNo * count;
        noteBank[noteNo] = count;
      } else {
        noteBank[noteNo] = "-";
      }
    });
    setNotes(noteBank);
  }

  return (
    <div className="App">
      <h1>Cash Register</h1>
      <p className="max-width">
        Enter the bill amount and cash given by the customer and know minimum
        number of notes to return.
      </p>
      <br />
      <br />
      <input
        type="number"
        id="bill-amt"
        placeholder="Enter Bill Amount"
        onChange={next_btn_visibleHandler}
      ></input>
      <br />
      <br />
      <button
        id="nxt-btn"
        className="btn"
        style={{ display: `${next_btn_visible}` }}
        onClick={nextBtnHandler}
      >
        {" "}
        Next
      </button>
      <br />
      <br />
      <input
        id="cash-given"
        style={{ display: `${cashGiven}` }}
        type="number"
        placeholder="Enter amount given by customer"
        onChange={checkBtnVisible}
      />
      <br />
      <br />
      <button
        id="return-change"
        className="btn"
        style={{ display: `${checkBtn}` }}
        onClick={checkBtnHandler}
      >
        Return Change
      </button>
      <br />
      <br />
      <div>
        <div className="summary" style={{ display: `${summary}` }}>
          <span>Bill Amount: {billAmount}</span>
          <span style={{ marginLeft: "2rem" }}>Cash Given: {cashAmount}</span>
        </div>
        <div className="output" style={{ display: `${output}` }}>
          <br />
          <br />
          <p>Return Change : {cashAmount - billAmount}</p>
          <table className="output-table">
            <tbody>
              <tr>
                <th>No.of Notes</th>
                {noteBankArray.map((note) => {
                  return (
                    <td className="notes" key={note}>
                      {notes[note]}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <th>Note</th>
                {noteBankArray.map((note) => {
                  return <td key={note}>{note}</td>;
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default App;
