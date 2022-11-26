import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./Routers/router";

function App() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            background: "#d4d1db",
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://media0.giphy.com/media/2tOsjtp4xFgD6pc48U/giphy.gif"
            alt=""
          />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
