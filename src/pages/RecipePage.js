import React from 'react'
import {useParams} from "react-router-dom"
import RecipeCard from '../components/RecipeCard'

const RecipePage = () => {
  const {id} = useParams()
  return (
    <RecipeCard idRecipe={id} />
  )
}

export default RecipePage