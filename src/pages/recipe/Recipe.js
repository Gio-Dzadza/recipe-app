import {useParams, useHistory} from 'react-router-dom'
import {projectFirestore} from '../../firebase/config'
import { useEffect, useState } from 'react';

import './Recipe.css'
import { useTheme } from '../../hooks/useTheme';


export default function Recipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(()=>{
    setIsPending(true);
    const unsub = projectFirestore.collection('recipes').doc(id).onSnapshot((doc)=>{
      if(doc.exists){
        setIsPending(false);
        setRecipe(doc.data());
      } else {
        setIsPending(false)
        setError('Could not find that recipe')
      }
    })
    return ()=>{
      unsub()
    }
  },[id])

  const history = useHistory()
  const goBack = ()=>{
      history.goBack();
  }

  const { mode } = useTheme();

  useEffect(()=>{
    if(error){
        setTimeout(()=>{
            history.push("/")
        },2000)
    }
  },[error, history])

  const handleClick = ()=>{
    projectFirestore.collection('recipes').doc(id).update({
      title: 'Something completely different'
    })
  }

  return (
    <div className={`recipe ${mode}`}>
        {isPending && <p className='loading'>Loading...</p>}
        {error && <p className='error'>{error}</p>}
        {recipe && (
          <>
            <button onClick={goBack}>Go Back</button>
            <h2 className='page-title'>{recipe.title}</h2>
            <p>Time {recipe.cookingTime} to cook.</p>
            <ul>
              {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
            </ul>
            <p className='method'>{recipe.method}</p>
            <button onClick={()=>{handleClick()}}>Update</button>
          </>
        )}
    </div>
  )
}
