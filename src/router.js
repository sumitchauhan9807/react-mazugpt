import { Routes, Route } from "react-router-dom";

import Home from "src/views/Home";
import Translation from "src/views/Translation";
function MazugptRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/translation" element={<Translation />} />
    </Routes>
  );
}

export default MazugptRoutes;
