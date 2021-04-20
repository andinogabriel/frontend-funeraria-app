import React from 'react';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Searcher = ({searchThing, setSearchName, thingToSearch}) => {

    const searchChange = event => {
        setSearchName(event.target.value);
    }

    const cancelSearch = () => {
        setSearchName('');
    };

    return (
        <InputGroup size="sm">
            <FormControl placeholder={`Buscar por ${thingToSearch}`} name="searchThing" value={searchThing} className="info-border bg-dark text-white" onChange={searchChange}
            />
            <InputGroup.Append>
                <Button size="sm" variant="outline-info" type="button">
                    <FontAwesomeIcon icon={['fas', 'search']}/>
                </Button>
                <Button size="sm" variant="outline-danger" type="button" onClick={cancelSearch}>
                    <FontAwesomeIcon icon={['fas', 'times']} />
                </Button>
            </InputGroup.Append>
        </InputGroup>
    );
};
