import React from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

//Created a card component to be able to reuse

export default function Cards({ id, image, header, description }) {
return (
    <Card id="card" style={{ background: "rgb(240, 19, 30)" }}>
        <Image
            src={   
            image   
                ? `${image}/portrait_medium.jpg`
                : `http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_medium.jpg`
            }
            wrapped
            ui={false}
        />
        <Card.Content>
            <Card.Header>{header}</Card.Header>
            <Card.Meta style={{ color: "white" }}>
            {description ? `${description}` : "No description was found"}
            </Card.Meta>
        </Card.Content>
        <Card.Content extra>
            <Link to={`/marvel/${id}`}>
            <Button color="inverted">Show me more about this superhero</Button>
            </Link>
        </Card.Content>
    </Card>
    );
}
