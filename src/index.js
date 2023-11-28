import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ZoomMtg } from '@zoomus/websdk'


ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

ZoomMtg.i18n.load('en-US')
ZoomMtg.i18n.reload('en-US')

ZoomMtg.setZoomJSLib("https://source.zoom.us/2.17.0/lib", "/av");

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
