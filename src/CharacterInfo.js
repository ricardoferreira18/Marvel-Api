import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Accordion, Icon, Item } from 'semantic-ui-react'

const API_ENDPOINT = `https://gateway.marvel.com:443/v1/public/characters`;
const API_KEY = `ba4cc10a4ba741b298548efa0ceec9ef`;

//
const CharacterInfo = ({ match }) => {
const [characterData, setCharacterData] = useState([]);
const [activeIndex, setActiveIndex] = useState(0);

const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = setActiveIndex;
    const newIndex = activeIndex === index ? -1 : index

    setActiveIndex(newIndex)
}


//fetch do único personagem que irá ser mostrado (match)
useEffect(() => {
const getData = async () => {
    const { data } = await axios.get(
    `${API_ENDPOINT}/${match.params.id}?apikey=${API_KEY}`
    );
    setCharacterData(data.data.results[0]);
    };
getData();
}, []);



//Criar render para séries

const renderSeries = () =>
characterData.series && characterData.series.items.map((series) => {
    return (
    <div className='ui list'>
        <div className='item' key={series.name}>{series.name}</div>
    </div>
    )
})

  //Criar render para stories

const renderStories = () =>
characterData.stories && characterData.stories.items.map((stories) => {
    return (
    <div className='ui list'>
        <div className='item' key={stories.name}>
        {stories.name}
        </div>
    </div>
    )
})


//Criar render para eventos

const renderEvents = () =>
characterData.events && characterData.events.items.map((events) => {
    return (
    <div key={characterData.name} className='ui list'>
        <div  className='item' key={events.name}>
        {events.name}
        </div>
    </div>
    )
})


//Criar render para comics

const renderComics = () =>
characterData.comics && characterData.comics.items.map((comics) => {
    return (
    <div key={characterData.name} className='ui list'>
        <div  className='item' key={comics.name}>
        {comics.name}
        </div>
    </div>
    )
    })


return (
<div>
    <Item.Group>  
<Item >
    <Item.Image size='medium' 
    
    src={`${characterData.thumbnail && characterData.thumbnail.path}/portrait_medium.jpg`} 
    />

    <Item.Content>
    <Item.Header as='a'
    >
        <h1 className=''>{characterData.name}</h1></Item.Header>
    <Item.Meta><h2>Description</h2></Item.Meta>
    <Item.Description>
        <p>
        {characterData.description ? `${characterData.description}` : 'No description was found'}
    </p>
    </Item.Description>
    <Item.Extra></Item.Extra>
    </Item.Content>
</Item>
</Item.Group>
    <Accordion fluid styled
    
    >
    <Accordion.Title
        active={activeIndex === 0}
        index={0}
        onClick={handleClick}
    >
        <Icon name='dropdown' />
        What are the series?
    </Accordion.Title>
    <Accordion.Content active={activeIndex === 0}>
        <div>
        {renderSeries()}
        </div>
    </Accordion.Content>

    <Accordion.Title
        active={activeIndex === 1}
        index={1}
        onClick={handleClick}
    >
        <Icon name='dropdown' />
        What are the stories?
    </Accordion.Title>
    <Accordion.Content active={activeIndex === 1}>
        <div>
        {renderStories()}
        </div>
    </Accordion.Content>

    <Accordion.Title
        active={activeIndex === 2}
        index={2}
        onClick={handleClick}
    >
        <Icon name='dropdown' />
        What are the events?
    </Accordion.Title>
    <Accordion.Content active={activeIndex === 2}>
        {renderEvents()}
    </Accordion.Content>
    <Accordion.Title
        active={activeIndex === 3}
        index={3}
        onClick={handleClick}
    >
        <Icon name='dropdown' />
        What are the comics?
    </Accordion.Title>
    <Accordion.Content active={activeIndex === 3}>

        {renderComics()}

    </Accordion.Content>
    </Accordion>
</div>);
};

export default CharacterInfo;
