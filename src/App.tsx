
import {BrowserRouter}  from "react-router-dom";
import AppRoute         from "./routes/appRouter";
import './assets/style.scss';

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
    </>
  );
}

export default App;
