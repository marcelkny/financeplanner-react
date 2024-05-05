import { useCallback, useEffect, useState } from "react";
import { StatusApi } from "../../client/board-api";

export default function InitialView() {
  const [count, setCount] = useState(0);
  const reloadCallback = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new StatusApi().statusPing().then((obj: any) => {
      console.log("obj: ", obj);
    });
  }, []);
  useEffect(() => {
    reloadCallback();
  }, [reloadCallback]);
  return (
    <div className="w-3/4 mx-auto">
      <div>
        <a href="https://vitejs.dev" target="_blank"></a>
        <a href="https://react.dev" target="_blank"></a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
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
