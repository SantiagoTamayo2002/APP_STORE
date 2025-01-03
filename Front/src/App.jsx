import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  initialPage  from '../src/components/initialPage';
import ArticlesAdmin from '../src/components/articles';
import HomePage  from './components/homePage';
import ArticleCard from './components/article_card';
import Login from './components/login';
import Register from './components/register';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/"           Component ={initialPage}/>
          <Route path="/login"      Component ={Login}/> 
          <Route path="/register"   Component ={Register}/> 
          <Route path="/welcome"    Component ={HomePage}/>
          <Route path="/articles"   Component ={ArticlesAdmin}/>
          <Route path="/tarjet"     Component ={ArticleCard}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
