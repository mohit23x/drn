import React, { useState, useEffect } from "react";

const Try2 = () => {
  const [Matrix, setMatrix] = useState([]);

  useEffect(() => {
    let matrix = [];
    for (let i = 0; i < 5; i++) {
      let col = [];
      for (let j = 1; j < 11; j++) {
        col.push({
          value: i * 10 + j,
          light: false,
          start: false,
          end: false,
          arrow: null
        });
      }
      matrix.push(col);
    }
    setMatrix(matrix);
    console.log(matrix);
  }, []);

  const [Inc, setInc] = useState(true);
  const [StartEnd, setStartEnd] = useState([null, null]);
  const [StartEndNum, setStartEndNum] = useState([null, null]);

  const RowLen = 10;
  const ColLen = 5;

  const handleBoxClick = (mi, ni) => {
    if (!StartEnd[0]) {
      let currentData = [...Matrix];
      setStartEnd([[mi, ni], null]);
      setStartEndNum([Matrix[mi][ni], null]);
      currentData[mi][ni].start = true;
      setMatrix(currentData);
    } else if (!StartEnd[1]) {
      let currentData = [...Matrix];
      setStartEnd([StartEnd[0], [mi, ni]]);
      setStartEndNum([StartEndNum[0], Matrix[mi][ni]]);
      currentData[mi][ni].end = true;
      setMatrix(currentData);
    }
  };

  const handleHighlight = () => {
    let currentData = [...Matrix];
    let MD = [...Matrix];

    let start = StartEnd[0];
    let end = StartEnd[1];
    let index = null;

    let flag = true;
    let toggle = Inc;
    let row = start[0];

    if (toggle || end[0] === row) {
      for (let e = start[1]; e < MD[row].length; e++) {
        if (MD[row][e] === StartEndNum[1]) {
          currentData[row][e].end = true;
          flag = false;
          break;
        } else if (currentData[row][e] === StartEndNum[0]) {
          currentData[row][e].start = true;
          continue;
        }
        currentData[row][e].light = true;
        currentData[row][e].arrow = "down";
        if (e === RowLen - 1) {
          currentData[row][e].arrow = "right";
        }
      }
      row++;
    } else {
      for (let e = start[1]; e >= 0; e--) {
        if (MD[row][e] === StartEndNum[1]) {
          flag = false;
          currentData[row][e].end = true;
          break;
        } else if (currentData[row][e] === StartEndNum[0]) {
          currentData[row][e].start = true;
          continue;
        }
        currentData[row][e].light = true;
        currentData[row][e].arrow = "upup";
        if (e === 0) {
          currentData[row][e].arrow = "right";
        }
      }
      row++;
    }

    while (flag) {
      if (toggle) {
        for (let j = RowLen - 1; j >= 0; j--) {
          if (MD[row][j] === StartEndNum[1]) {
            currentData[row][j].end = true;
            break;
          }
          currentData[row][j].light = true;
          currentData[row][j].arrow = "upup";
          if (j === 0) {
            console.log("i run 0");
            currentData[row][j].arrow = "right";
          }
          console.log(currentData[row][j]);
        }
      } else {
        for (let j = 0; j < RowLen; j++) {
          console.log(MD[row][j]);
          if (MD[row][j] === StartEndNum[1]) {
            currentData[row][j].end = true;
            break;
          }
          currentData[row][j].light = true;
          currentData[row][j].arrow = "down";
          if (j === RowLen - 1) {
            currentData[row][j].arrow = "right";
          }
          console.log(currentData[row][j]);
        }
      }

      toggle = !toggle;
      row++;
      if (row > end[0]) {
        console.log("i run");
        // console.log("row greater than end ka row");
        flag = false;
      }
    }

    setMatrix(currentData);

    /*
    // currentData[start[0]].forEach((d, di) => {
    //   if (di >= start[1] && di < currentData[start[0]].length) {
    //     d.light = true;
    //     index = di;
    //   }
    // });

    // currentData[start[0] + 1].forEach((d, di) => {});

    // console.log("last index ", index);
    // setMatrix(currentData);
    */
  };

  const clearLights = () => {
    let currentData = [...Matrix];
    currentData.forEach((m, mi) => {
      m.forEach(n => {
        n.start = false;
        n.end = false;
        n.light = false;
        n.arrow = null;
      });
    });
    setMatrix(currentData);
  };

  const handleReset = () => {
    setStartEnd([null, null]);
    setStartEndNum([null, null]);
    clearLights();
  };

  useEffect(() => {
    if (StartEnd[0] && StartEnd[1]) {
      clearLights();
      handleHighlight();
    }
    return () => {};
  }, [StartEnd, Inc]);

  return (
    <div className="container">
      {Matrix.map((m, mi) => {
        return (
          <div className="line" key={`k${mi}`}>
            {m.map((n, ni) => {
              return (
                <div key={`k${mi}${ni}`}>
                  <div
                    onClick={() => handleBoxClick(mi, ni)}
                    className={`box ${n.light ? " light " : ""} ${
                      n.start ? " start " : ""
                    } ${n.end ? " end " : ""}`}>
                    <span style={{ fontSize: 14 }}>{n.value}</span>
                    <span style={{ fontSize: 14 }}>&nbsp;{n.arrow}</span>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
      <div>
        <button onClick={handleReset}>Reset</button>
        <button onClick={() => setInc(!Inc)}>Direction</button>
      </div>
    </div>
  );
};

export default Try2;
