import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';


export const ServicesCarousel = () => {

    const [items, setItems] = useState([]);
    
    useEffect(() => {
        const getImageSlide = async () => {
            try {
                const resp = await axios.get("http://localhost:8081/api/v1/imagesSlide");
                setItems(resp.data);
                console.log(resp.data);
            } catch (e) {
                console.log(e);
            }
        };
        getImageSlide();
    }, []);

    return (
        <Carousel
            next={ (next, active) => console.log(`we left ${active}, and are now at ${next}`) }
            prev={ (prev, active) => console.log(`we left ${active}, and are now at ${prev}`) }
            interval={5000}
        >
            
            {
                items.map( ({description, imageLink, title}, i) => 
                    <Item 
                        key={i}  
                        description={description}
                        title={title}
                        imageLink={imageLink}
                    /> 
                )
            }
        </Carousel>
    );
};

function Item({description, imageLink, title})
{
    return (
        <Paper>
            <h2>{title}</h2>
            <p>{description}</p>

            
            <img 
                src={imageLink} 
                alt={title}
                className="image"
            />
        </Paper>
    )
}
