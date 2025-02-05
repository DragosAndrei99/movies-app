import axios from "axios";
import { MovieInfo } from "../../interfaces/movie-info.interface";
import Dialog from "../dialog/dialog";
import MovieForm from "../movie-form/movie-form";
import { NavigateFunction } from "react-router-dom";
import { useCallback } from "react";

export default function AddMovieForm({navigate}: {navigate: NavigateFunction}) {

  const createMovie = async (data: MovieInfo) => {
    try {
      console.log(data);
      
      const response = await axios.post('http://localhost:4000/movies', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log('Movie submitted successfully:', response.data);
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



  return(
    <Dialog title="Add Movie" children={[<MovieForm handleFormSubmit={createMovie}/>]} handleClose={closeDialog}/>
  )
}