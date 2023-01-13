import { Pokemon } from "../models/pokemon.m";

export async function getPokemons(): Promise<Pokemon[]> {
    // Llamado de ApiRest
    const response = await fetch('https://unpkg.com/pokemons@1.1.0/pokemons.json');

    const data = await response.json();
    const pokemons = data.results.map((pokemon: any) => ({
        name: pokemon.name,
        id: pokemon.national_number,
        imgGif: corregirNombre(pokemon.sprites['animated']),
        imgLarge: corregirNombre(pokemon.sprites['large']),
        imgNormal: corregirNombre(pokemon.sprites['normal']),
        total: pokemon.total,
        hp: pokemon.hp,
        attack: pokemon.attack,
        defense: pokemon.defense,
        sp_attack: pokemon.sp_atk,
        sp_defense: pokemon.sp_def,
        speed: pokemon.speed,
        type: pokemon.type[0]
    }));

    const filtroRepetidos = pokemons.filter(
        (pokemon: any, index: number) => 
        pokemons.findIndex((other: any) => other.id === pokemon.id) === index
    );

    return filtroRepetidos;
}

export function corregirNombre(name: string): string {
    
    if(name.includes("farfetch'd")) {
        return name.replace("farfetch'd", 'farfetchd');
    } else if (name.includes('mr.-mime')) {
        return name.replace('mr.-mime', 'mr-mime');
    } else if (name.includes('nidoran♀')) {
        return name.replace('nidoran♀', 'nidoran-f');
    } else if (name.includes('nidoran♂')) {
        return name.replace('nidoran♂', 'nidoran-m');
    }else if (name.includes('mime-jr.')) {
        return name.replace('mime-jr.', 'mime-jr');
    } else {
        return name;
    }
}