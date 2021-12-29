import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import NavScrollTop from './components/NavScrollTop';
import React from 'react'
// CSS File Here
import "aos/dist/aos.css";
import 'react-modal-video/scss/modal-video.scss';
import './assets/scss/style.scss';
import CrearPalabra from './pages/palabras/views/crear';
//import ListadoPalabras from "pages/palabras/views/listado";
//import EditarPalabra from "pages/palabras/views/editar";

function App() {
  return (
    <Router>
      <NavScrollTop>
        <Switch>
          <Route
            exact
            path={`${process.env.PUBLIC_URL + '/list'}`}
            component={() => {
              return <></>;
            }}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + '/'}`}
            component={CrearPalabra}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL + '/edit'}`}
            component={() => {
              return <></>;
            }}
          />
          {/* <Route component ={NotFound} /> */}
        </Switch>
      </NavScrollTop>
    </Router>
  );
}

export default App;
