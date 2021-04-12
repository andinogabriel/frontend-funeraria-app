import React from 'react';
import { Col, Container, Jumbotron, Row } from 'react-bootstrap';


export const Home = () => {
    return (
        <Container>
            <Row>
                <Col lg={12} style={{marginTop: "10px"}}>
                    <Jumbotron>
                        <h1>Funeraria Nuñez y Hermanos</h1>
                        <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et iure modi nostrum. Culpa dignissimos laboriosam dolorem voluptas nihil fugit explicabo eaque eos cupiditate magnam a esse consectetur, libero voluptatum dolores.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab quo dolorum sapiente officia, adipisci corrupti odio maiores voluptate nulla mollitia accusantium! Beatae eaque dolorem vel consequuntur maiores cupiditate doloremque debitis.
                        </p>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    )
}
