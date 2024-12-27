import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  initialPage  from '../src/components/initialPage';
import Articles from '../src/components/articles';
import navbar from '../src/components/navbar';
import HomePage  from './components/homePage';
import ArticleCard from './components/article_card';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/"        Component ={initialPage}/>
          <Route path="/login"   Component ={initialPage}/> //esto lo cambian con los componentes que quieran pintar
          <Route path="/welcome" Component ={HomePage}/>
          <Route path="/articles" Component ={Articles}/>
          <Route path="/tarjet"   Component ={ArticleCard}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
