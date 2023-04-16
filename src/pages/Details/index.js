import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { APIKey } from "../../config/key";
import { Container } from "./styles";

function Details(){

    const {id} = useParams();
    const [movie, setMovie] = useState({})
    const image_path = 'https://image.tmdb.org/t/p/w500'

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${APIKey}&language=en-US&page=1`)
            .then(response => response.json())
            .then(data => {


                //convertendo data de 2022-02-13 para 13/02/2022
                // let dateFromAmerican = data.release_date;
                // let dateToBrazil = dateFromAmerican.split('-').reverse().join('/');

                console.log(data)
                const movie = {
                    id,
                    title: data.title,
                    sinopse: data.overview,
                    image: `${image_path}${data.poster_path}`,
                    releaseDate: data.release_date
                }
                console.log(movie)
                setMovie(movie)
            })

    }, [id])

   


    return (
        <Container>
            <div className="movie">
                <img src={movie.image} alt={movie.sinopse}/>
                <div className="details">
                    <h1>{movie.title}</h1>
                    <span>Sinopse: {movie.sinopse}</span>
                    <span className="release-date">Relese Date: {movie.releaseDate}</span>
                    <Link to="/"><button>Go back</button></Link>
                </div>
            </div>
        </Container>
    )
}

export default Details;