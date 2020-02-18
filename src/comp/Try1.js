import React, { useState } from "react";

const Try1 = () => {
  const [Matrix, setMatrix] = useState([
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
  ]);

  const [Inc, setInc] = useState(true);
  const [StartEnd, setStartEnd] = useState([null, null]);
  const [StartEndNum, setStartEndNum] = useState([null, null]);

  const handleBoxClick = (mi, ni) => {
    console.log("i ", mi, " ", ni);

    if (!StartEnd[0]) {
      setStartEnd([[mi, ni], null]);
      setStartEndNum([Matrix[mi][ni], null]);
    } else {
      setStartEnd([StartEnd[0], [mi, ni]]);
      setStartEndNum([StartEndNum[0], Matrix[mi][ni]]);
    }
  };

  const handleCheckBox = (m, n, mi, ni) => {
    if (StartEnd[0] && mi === StartEnd[0][0] && ni === StartEnd[0][1]) {
      return (
        <div onClick={() => handleBoxClick(mi, ni)} className="box highlight">
          {n}
        </div>
      );
    } else if (StartEnd[1] && mi === StartEnd[1][0] && ni === StartEnd[1][1]) {
      return (
        <div onClick={() => handleBoxClick(mi, ni)} className="box highlight">
          {n}
        </div>
      );
    } else if (
      StartEndNum[0] &&
      Matrix[mi][ni] > StartEndNum[0] &&
      StartEndNum[1] &&
      Matrix[mi][ni] < StartEndNum[1]
    ) {
      return (
        <div onClick={() => handleBoxClick(mi, ni)} className="box highlight2">
          {n}
        </div>
      );
    } else {
      return (
        <div onClick={() => handleBoxClick(mi, ni)} className="box">
          {n}
        </div>
      );
    }
  };

  const handleReset = () => {
    setStartEnd([null, null]);
    setStartEndNum([null, null]);
  };

  return (
    <div className="container">
      {Matrix.map((m, mi) => {
        return (
          <div className="line" key={`k${mi}`}>
            {m.map((n, ni) => {
              return (
                <div key={`k${mi}${ni}`}>{handleCheckBox(m, n, mi, ni)}</div>
              );
            })}
          </div>
        );
      })}
      <div>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Try1;
