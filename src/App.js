import { Container } from "semantic-ui-react";
import React from "react";
import {BrowserRouter, Route, Link} from 'react-router-dom';
import CharacterInfo from "./CharacterInfo";
import Marvel_Logo_RGB from '../src/assets/Marvel_Logo_RGB.png'
import Characters from "./Characters";


const App = () => {
  return (
    <Container >
      <BrowserRouter>
        <Link to="/" style={{ display: 'flex', flexDirection: 'row', justifyContent:'center'}}>
          <img src={Marvel_Logo_RGB} style={{ width: '300px', margin: '2rem'}}/>
        </Link>
        <Route path='/marvel/:id' exact component={CharacterInfo} />
        <Route path='/' exact component={Characters} />
      </BrowserRouter>
    </Container>
  );
};

export default App;