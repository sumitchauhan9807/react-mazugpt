import { Routes, Route } from "react-router-dom";

import Home from "src/views/Home";
import Translation from "src/views/Translation";
import Test from 'src/components/test'
function MazugptRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/translation" element={<Translation />} />
      <Route exact path="/test" element={<Test />} />
    </Routes>
  );
}

export default MazugptRoutes;
