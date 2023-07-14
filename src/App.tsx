import React, { useCallback, useEffect, useMemo } from "react";
import logo from "./logo.svg";
import "./App.css";

declare const android: {
  passValue: (value: string) => void;
  getValue: () => void;
};

declare global {
  interface Window {
    Android: typeof android;
  }
}

const utils = (): typeof android => {
  return {
    passValue: (value: string) => {
      if (window.Android) {
        window.Android.passValue(value);
      } else {
        console.log("window.Android is not defined", ", util: passValue");
      }
    },
    getValue: () => {
      if (window.Android) {
        console.log("GET VALUE", window.Android.getValue());
      } else {
        console.log("window.Android is not defined", ", util: getValue");
      }
    },
  };
};

const CUSTOM_EVENT = "android-set-token";

function App() {
  const webviewUtils = useMemo(() => utils(), []);

  const handler = useCallback((e: any) => {
    console.log("DISPATCHED android set token", e);
  }, []);

  useEffect(() => {
    window.addEventListener(CUSTOM_EVENT, handler);

    return () => {
      window.removeEventListener(CUSTOM_EVENT, handler);
    };
  }, [handler]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div style={{ display: "flex", gap: "16px" }}>
          <button onClick={() => webviewUtils.passValue("HELLO WORLD, it comes from react app")}>Pass Value</button>
          <button onClick={() => webviewUtils.getValue()}>Get Value</button>
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
