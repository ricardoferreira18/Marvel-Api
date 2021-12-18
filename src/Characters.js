import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import { Button, Grid } from 'semantic-ui-react';
import Card from './components/Cards';
import './style.css'
const API_ENDPOINT = `https://gateway.marvel.com:443/v1/public/characters?`;
const API_KEY = `ba4cc10a4ba741b298548efa0ceec9ef`;

const Characters = () => {
  const [searchItem, setSearchItem] = useState('');

  // charactersData é para onde os termos da api num objeto
  const [charactersData, setCharactersData] = useState();

//Serve para mudar de página
  let history = useHistory();

// searchTerm utilizado para a pesquisa de termos - usando props do SearchBar.js
// fazendo update ao mesmo
  const searchTerm = (searchItem) => {
    setSearchItem(searchItem);
  };


// ao clicar no butao faz o fetch da API e retorna apenas o termo pesquisado isto se encontrado algum termo 

  const searchChars = () => {
    if (searchItem) {
      axios
        .get(`${API_ENDPOINT}name=${searchItem}&apikey=${API_KEY}`)
        .then((response) => {
          setCharactersData(response.data.data.results);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

//Se não houver nenhum item de pesquisa, faz render novamente a api e mostra os cards todos
  useEffect(() => {
    if (searchItem === '') {
      axios
        .get(`${API_ENDPOINT}&apikey=${API_KEY}`)
        .then((response) => {
          setCharactersData(response.data.data.results);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [searchItem]);


//Função que determina o randomCharacter - sendo que faz o "math.random()" sob o tamanho completo do charactersData(id) e muda para a página em questão

const randomChar = () => {
    if (charactersData) {
      const id =
        charactersData &&
        charactersData[Math.floor(Math.random() * charactersData.length)].id;
      history.push(`/marvel/${id}`);
    }
  };

  return (
    <div>
      <SearchBar searchTerm={searchTerm} />
      <div className='search-button'>
        <Button onClick={randomChar} color='red' size='huge'>
          Random
        </Button>
        <Button onClick={searchChars} color='red' size='huge'>
          Search
        </Button>
      </div>
      <Grid columns={3}>
        <Grid.Row>
          {charactersData &&
            charactersData.map((item) => {
              return (
                <Grid.Column key={item.id}>
                  <Card
                    id={item.id}
                    image={item.thumbnail.path}
                    header={item.name}
                    description={item.description}
                  />
                </Grid.Column>
              );
            })}
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Characters;
