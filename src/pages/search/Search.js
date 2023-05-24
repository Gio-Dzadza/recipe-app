import { useLocation} from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'

import  RecipeList  from '../../components/RecipeList'

import './Search.css'
import { useTheme } from '../../hooks/useTheme'


export default function Search() {
  const { mode } = useTheme();

  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get('q');

  const url = 'http://localhost:3000/recipes?q=' + query;

  const { data, error, isPending } = useFetch(url)
  return (
    <div>
        <h2 className={`page-title ${mode}`}>Recipes including "{query}"</h2>
        {error && <p className="error">{error}</p>}
        {isPending && <p className ="loading">Loading...</p>}
        {data && <RecipeList recipes={data}/>}
    </div>
  )
}
