import { useState } from "react";
import { ReactComponent as AccountSvg } from "./assets/account.svg";
import "./App.css";
import { Button } from "./stories/Button";

function App() {
      const [count, setCount] = useState(0);

      return (
            <div className="App">
                  <div>
                        <a href="https://vitejs.dev" target="_blank">
                              <img
                                    src="/vite.svg"
                                    className="logo"
                                    alt="Vite logo"
                              />
                        </a>
                  </div>
                  <h1>Vite + React</h1>
                  <div className="card">
                        <Button primary label="Test">
                              <AccountSvg />
                        </Button>
                        <p>
                              Edit <code>src/App.tsx</code> and save to test HMR
                        </p>
                  </div>
                  <p className="read-the-docs">
                        Click on the Vite and React logos to learn more
                  </p>
            </div>
      );
}

export default App;
