import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddProduct from "./components/AddProducts";
const App = () => {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<AddProduct />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
