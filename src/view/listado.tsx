import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Figure from 'react-bootstrap/Figure';

import { getPokemons } from '../controller/getpokemon';
import { Pokemon } from '../models/pokemon.m';


const Listado = () => {

    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const obtenerTodos = async() => {
            const allPokemons = await getPokemons();

            setPokemons(allPokemons);
        };

        obtenerTodos();
    });

    const filtrarPokemon = pokemons?.slice(0, 415).filter((pokemon) => {
        return pokemon.name.toLowerCase().match(query.toLowerCase());
    })

    return (
        <>
            <h1 style={{ marginLeft: '10px' }}>
                <Figure.Image width={35} height={35} src="https://cdn-icons-png.flaticon.com/512/1033/1033032.png"/>                
                PokeDex
            </h1>

            <header style={{ marginBottom: '10px', marginLeft: '10px' }}>
                <input type="text" value={query} placeholder="Buscar Pokemon" onChange={(event) => setQuery(event.target.value.trim())}/>
                <Figure.Image width={35} height={35} src="https://cdn-icons-png.flaticon.com/512/188/188937.png"/>
            </header>

            <div className='content-wrapper'>
                <div className='content'>
                    <div className='row gx-0'>

                        {filtrarPokemon?.slice(0, 415).map((pokemon) => (

                            <Card className='mx-auto' style={{ width: '18rem', marginBottom: '10px' }}>
                                <Card.Header style={{ background: '#000', color: '#fff', textAlign: 'center', marginBottom: '10px' }}><b>Tipo:</b> {pokemon.type}</Card.Header>

                                <Card.Img style={{ width: '80px', height: '80px' }} className='mx-auto' variant="top" src={pokemon.imgLarge} />

                                <Card.Body>
                                    <Card.Title className='text-center'>{pokemon.name}</Card.Title>
                                    <Card.Subtitle className='text-center text-muted'>{pokemon.id}</Card.Subtitle>

                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Figure.Image width={15} height={15} src="https://cdn-icons-png.flaticon.com/128/833/833472.png"/>
                                            <b> Hp:</b> {pokemon.hp}
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Figure.Image width={15} height={15} src="https://cdn-icons-png.flaticon.com/128/1006/1006952.png"/>
                                            <b> Ataque:</b> {pokemon.attack}
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Figure.Image width={15} height={15} src="https://cdn-icons-png.flaticon.com/128/306/306771.png"/>
                                            <b> Defensa:</b> {pokemon.defense}
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Figure.Image width={15} height={15} src="https://cdn-icons-png.flaticon.com/128/3311/3311830.png"/>
                                            <b> E. Ataque:</b> {pokemon.sp_attack}
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Figure.Image width={15} height={15} src="https://cdn-icons-png.flaticon.com/128/3311/3311830.png"/>
                                            <b> E. Defensa:</b> {pokemon.sp_defense}
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Figure.Image width={15} height={15} src="https://cdn-icons-png.flaticon.com/128/4779/4779199.png"/>
                                            <b> Velocidad:</b> {pokemon.speed}
                                        </ListGroup.Item>

                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Listado;