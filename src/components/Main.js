import React, { Component } from 'react';
import Form from './Form';
import TrendingMovie from './TrendingMovie';
import '../App.css';

const Main = () => {
  return (
    <div className="wrapper">
      <Form />
      <TrendingMovie />
    </div>
  );
};

export default Main;
