import {useEffect} from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import AOS from "aos";
import NavScrollTop from './components/NavScrollTop';
// CSS File Here
import "aos/dist/aos.css";
import 'react-modal-video/scss/modal-video.scss';
import './assets/scss/style.scss';
import CrearSeguro from "pages/seguros/views/crear";
import ListadoSeguros from "pages/seguros/views/listado";
import EditarSeguro from "pages/seguros/views/editar";

function App() {
  useEffect(() => {
    AOS.init({
        offset: 80,
        duration: 1000,
        once: true,
        easing: 'ease',
    });
    AOS.refresh();
    
  }, [])

  return (
    <Router>
      <NavScrollTop>
        <Switch>
          <Route exact path={`${process.env.PUBLIC_URL + '/list'}`} component={ListadoSeguros} />
          <Route exact path={`${process.env.PUBLIC_URL + '/'}`} component={CrearSeguro} />
          <Route exact path={`${process.env.PUBLIC_URL + '/edit'}`} component={EditarSeguro} />
          {/* <Route component ={NotFound} /> */}
        </Switch>
      </NavScrollTop>
    </Router>
  );
}

export default App;
