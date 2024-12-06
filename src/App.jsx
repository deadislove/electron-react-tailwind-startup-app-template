import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { setApiConfig } from './store/apiConfigSlice';
import HomePage from './pages/homePage';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {

  const dispatch = useDispatch()

  //const apiConfig = useSelector(state => state.api)
  const { url, auth_endpoint, secret_header } = useSelector((state) => state.apiConfig);


  useEffect(() => {
    if (!url) {
      apiConfigHandle()
    }
  }, [dispatch, url])

  const apiConfigHandle = async () => {
    const response = await window.api.getAPI()

    if (response) {
      const jsonObj = JSON.parse(response)
      const apiConfig = {
        api_url: jsonObj.url,
        auth_endpoint: jsonObj.auth,
        secret_header: jsonObj.secret
      }
      dispatch(setApiConfig(apiConfig))
    }
  }

  return (
    <Router basename={process.env.NODE_ENV === 'production' ? '.' : '/'}>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </Router>
  )
};

export default App;
