import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  initialPage  from '../src/components/initialPage';
import Articles from '../src/components/articles';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/"        Component ={initialPage}/>
          <Route path="/login"   Component ={initialPage}/> //esto lo cambian con los componentes que quieran pintar
          <Route path="/welcome" Component ={Articles}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
