import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import InitialPage from './components/initialPage';
import ArticlesAdmin from './components/articles';
import HomePage from './components/homePage';
import ArticleCard from './components/article_card';
import Login from './components/login';
import Register from './components/register';
import Formulario from './components/formulario';
import Offers from './components/offers';
import OfferAdmin from './components/addoffers';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<InitialPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/form" element={<Formulario />} />
            <Route path="/welcome" element={<PrivateRoute><HomePage /></PrivateRoute>} />
            <Route path="/articles" element={<PrivateRoute><ArticlesAdmin /></PrivateRoute>} />
            <Route path="/tarjet" element={<PrivateRoute><ArticleCard /></PrivateRoute>} />
            <Route path="/offers" element={<PrivateRoute><Offers/></PrivateRoute>} />
            <Route path="/addoffers" element={<PrivateRoute><OfferAdmin /></PrivateRoute>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
