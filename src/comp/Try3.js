import React, { useState, useEffect } from "react";

const Try3 = () => {
  const [Matrix, setMatrix] = useState([]);
  const [LastData, setLastData] = useState(null);

  useEffect(() => {
    let matrix = [];
    for (let i = 0; i < 10; i++) {
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
    let reverse = false;
    let row = start[0];

    if (StartEndNum[0].value > StartEndNum[1].value) {
      reverse = true;
    }

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
          if (reverse) {
            currentData[row][e].arrow = "left";
          } else {
            currentData[row][e].arrow = "right";
          }
        }
      }
      if (reverse) {
        row--;
      } else {
        row++;
      }
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
          if (reverse) {
            currentData[row][e].arrow = "left";
          } else {
            currentData[row][e].arrow = "right";
          }
        }
      }
      if (reverse) {
        row--;
      } else {
        row++;
      }
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
            if (reverse) {
              currentData[row][j].arrow = "left";
            } else {
              currentData[row][j].arrow = "right";
            }
          }
        }
      } else {
        for (let j = 0; j < RowLen; j++) {
          if (MD[row][j] === StartEndNum[1]) {
            currentData[row][j].end = true;
            break;
          }
          currentData[row][j].light = true;
          currentData[row][j].arrow = "down";
          if (j === RowLen - 1) {
            if (reverse) {
              currentData[row][j].arrow = "left";
            } else {
              currentData[row][j].arrow = "right";
            }
          }
        }
      }

      toggle = !toggle;
      if (reverse) {
        row--;
        if (row < end[0]) {
          flag = false;
        }
      } else {
        row++;
        if (row > end[0]) {
          flag = false;
        }
      }
    }

    setMatrix(currentData);
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
    setLastData({ StartEnd: StartEnd, StartEndNum: StartEndNum });
    setStartEnd([null, null]);
    setStartEndNum([null, null]);
    clearLights();
  };

  const handleLastMission = () => {
    if (LastData) {
      setStartEnd(LastData.StartEnd);
      setStartEndNum(LastData.StartEndNum);
    } else {
      alert("last mission not found!");
    }
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
      <div className="line">
        <div className="box" style={{ border: "none" }}></div>

        {Matrix.map((m, mi) => (
          <div className="box" style={{ border: "none" }}>
            {mi}
          </div>
        ))}
      </div>

      {Matrix.map((m, mi) => {
        return (
          <div className="line" key={`k${mi}`}>
            <div>{mi}</div>
            {m.map((n, ni) => {
              return (
                <div key={`k${mi}${ni}`}>
                  <div
                    onClick={() => handleBoxClick(mi, ni)}
                    className={`box ${n.light ? " light " : ""} ${
                      n.start ? " start " : ""
                    } ${n.end ? " end " : ""}`}>
                    <span style={{ fontSize: 14 }}>
                      {n.arrow && (
                        <img
                          src={`${n.arrow}.png`}
                          height="10px"
                          width="10px"
                        />
                      )}
                      {n.start && "S"}
                      {n.end && "E"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
      <div>
        <button className="btn" onClick={handleReset}>
          Reset
        </button>
      </div>
      <div>
        <button className="btn" onClick={() => setInc(!Inc)}>
          Direction
        </button>
      </div>

      <div>
        <button className="btn" onClick={handleLastMission}>
          Last Mission
        </button>
      </div>
    </div>
  );
};

export default Try3;
