import axios from "axios";
import { MovieInfo } from "../../interfaces/movie-info.interface";
import Dialog from "../dialog/dialog";
import MovieForm from "../movie-form/movie-form";
import { NavigateFunction, useParams } from "react-router-dom";
import { useCallback, useState } from "react";
import useFetch from "../../hooks/fetch";

export default function EditMovieForm({navigate}: {navigate: NavigateFunction}) {
  const { movieId } = useParams();

  const [movieInfo, setMovieInfo] = useState(null);
  const { loading, error} = useFetch(`http://localhost:4000/movies/${movieId}`, [setMovieInfo, movieId], setMovieInfo )
  
  const editMovie = async (data: MovieInfo) => {
    try {
      console.log(data);
      
      const response = await axios.put(`http://localhost:4000/movies`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log('Movie edited successfully:', response.data);
      navigate('/')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error submitting movie:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  }

  const closeDialog = useCallback(() => {
    console.log('closing');
    
    navigate('/')
  }, [])


  if (loading) {
    return <div>Loading...</div>;
  }

  if(error) {
    return <div>Error</div>;
  }

  return(
    <Dialog title="Edit Movie" children={[<MovieForm handleFormSubmit={editMovie} initialMovie={movieInfo as unknown as  MovieInfo}/>]} handleClose={closeDialog}/>
  )
}