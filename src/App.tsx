import React, { use, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
const Api_url = " http://localhost:5184/auth";

interface PuzzleType {
  fen: string;
  themes: string[];
  solution: string[];
  playerColor: "white" | "black";
  moveToWin: number;
}
function App() {
  const [logged, setLogged] = useState<boolean>(false);
  const [inputName, setInputName] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState("");
  const [game, setGame] = useState(new Chess());
  const [puzzle, setPuzzle] = useState<PuzzleType | null>(null);
  const [feedBack, setFeedback] = useState("");
  const [status, setStatus] = useState<
    "loading" | "solved" | "faied" | "playing"
  >("loading");
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLogIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");

    const response = await fetch(`${Api_url}/log`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName: inputName, password: inputPassword }),
    });

    if (!response.ok) {
      let errorMessage = "";
      if (response.status == 400) {
        errorMessage = "Invalid User Name or Password";
      } else {
        errorMessage = `Server issue: ${response.status}${response.statusText}`;
      }
      setError(errorMessage);
      console.log(error);
      return;
    }
    const data = await response.json();
    if (data.Token) {
      localStorage.setItem("token", data.token);
    }
    setLogged(true);
    console.log("user logged", data);
    return data;
  };

  const handleReg = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");

    const response = await fetch(`${Api_url}/reg`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Username: inputName, password: inputPassword }),
    });
    if (!response.ok) {
      let errorMessage = "";
      if (response.status === 400) {
        errorMessage = "Invalid User Name or Password";
      } else {
        errorMessage = `Server issue: ${response.status}${response.statusText}`;
      }
      setError(errorMessage);
      console.log(error);
      return;
    }
    const data = await response.json();
    console.log("user registered", data);
    return data;
  };
  return (
    <>
      {!logged && (
        <div>
          <div className="logBoxContainer">
            <h1>Chess puzzle game</h1>
            <div className="logBox">
              <h2>Log-in or register</h2>
              <input
                type="text"
                name="inputName"
                id=""
                placeholder="UserName..."
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
              />
              <input
                type="password"
                name=""
                id=""
                placeholder="Password..."
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
              />
              <div className="buttonBox">
                <button onClick={handleLogIn}>Log-in</button>
                <button onClick={handleReg}>Register</button>
              </div>
            </div>
          </div>
          <button onClick={() => setLogged(true)}></button>
        </div>
      )}
      {logged && (
        <div className="boadrBox">
          <div className="board">
            <Chessboard />
            You are logged in !!
            <button onClick={() => setLogged(false)}>Log Out</button>
          </div>
        </div>
      )}
    </>
  );
}
export default App;
