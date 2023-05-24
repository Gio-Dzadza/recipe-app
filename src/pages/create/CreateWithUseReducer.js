import { INITIAL_STATE, formReducer } from './formReducer'
import { useReducer,} from 'react';
import { projectFirestore } from '../../firebase/config'

// styles
import './Create.css'


export default function Create() {  
const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);



  const handleChange = (e)=>{
    dispatch({type: 'CHANGE_INPUT', payload: {name:e.target.name, value:e.target.value}})
  }



  const handleSubmit = async(e) => {
    e.preventDefault()

    try{
      await projectFirestore.collection('recipes').add(state);
    } catch(err){
      console.log(err)
    }
  }


  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>

        <label>
          <span>Recipe title:</span>
          <input 
            type="text"
            name='title'
            onChange={handleChange}
          />
        </label>
        <label>
          <span>Recipe Method:</span>
          <textarea 
            name='method'
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Cooking time (minutes):</span>
          <input 
            type="number" 
            name='cookingTime'
            onChange={handleChange}
            required 
          />
        </label>

        <button className="btn">submit</button>
      </form>
    </div>
  )
}
