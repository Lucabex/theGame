import { useState } from "react";

function App() {
  const [logged, setLogged] = useState<boolean>(false);

  return (
    <>
      {!logged && (
        <div>
          <div className="logBoxContainer">
            <h1>Chess puzzle game</h1>
            <div className="logBox">
              <h2>Log-in or register</h2>
              <input type="text" name="" id="" placeholder="UserName..." />
              <input type="password" name="" id="" placeholder="Password..." />
              <div className="buttonBox">
                <button>Log-in</button>
                <button>Register</button>
              </div>
            </div>
          </div>
          <button onClick={() => setLogged(true)}></button>
        </div>
      )}
      {logged && (
        <div>
          logged
          <button onClick={() => setLogged(false)}></button>
        </div>
      )}
    </>
  );
}
export default App;
