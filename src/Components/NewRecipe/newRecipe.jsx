import React , {useEffect, useState} from "react";
import NavBar from "../NavBar/NavBar";
import style from "./newRecipe.module.css";
import { getDiets ,createRecipes} from "../../Redux/actions/actions";

import { useDispatch,useSelector } from "react-redux";


const words = new RegExp(/^[a-zA-Z ]+$/);
const numbers = new RegExp(/^[0-9]+$/);


function validate(input){
    const errors ={};


    if(!input.name ) errors.name = 'El nombre es obligatorio';
    else if(!words.test(input.name)) errors.name ="No se permiten símbolos";
    else if(!words.test(input.summary)) errors.summary ="No se permiten símbolos";
    else if(!input.summary) errors.summary = 'El resumen del plato es obligatorio';
    else if(input.healthScore < 1 || input.healthScore >100) errors.healthScore = "El nivel de comida saludable tiene que ser entre uno y cien";
    else if(!numbers.test(input.healthScore)) errors.healthScore = "El valor ingresado tiene que ser numerico";
    else if(!input.steps.length || input.steps.length > 3000 ) errors.steps = "Los pasos de su receta deben tener entre uno y tres mil caracteres";

    return errors;

}

function NewRecipe(){

    const dispatch = useDispatch();
    const [errors, setError] = useState({});

    useEffect(()=>{
        dispatch(getDiets())
    },[dispatch])

    const diets = useSelector(state=> state.diets);
   
    //?----------------Form---------------------------//    }
    const [inputForm, setInputForm] = useState(
        {
            name: '',
            summary: '',
            healthScore: '',
            steps: '',
            dietId: [],
        }
    )
    const pushDietsId = (e)=>{
        const value = e.target.value;
        const valueState = inputForm.dietId;
        valueState.push(value);
        setInputForm(
            {...inputForm,dietId: valueState}
        )
    }

    const handleChangue =(e)=>{
        setInputForm((inputForm)=>{
            const newInput={
                ...inputForm,[e.target.name] : e.target.value

            }
            const validation = validate(newInput);
            setError(validation);

            return newInput;
        })
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(Object.values(errors).length > 0) {
            alert("Campos incompletos o con errores");
        }else if(
            inputForm.name === '' &&
            inputForm.summary === '' &&
            inputForm.healthScore === '' &&
            inputForm.steps === ''
            ){      
            alert("Campos incompletos o con errores")
        }else{
            dispatch(createRecipes(inputForm));
            alert(`La receta ${inputForm.name} fue creada con éxito`);
            setInputForm({
                name: '',
                summary: '',
                healthScore: '',
                steps: '',
                dietId: [],
            })
        }
    }

    return (
        <div>
            <NavBar></NavBar>
            <h1>Crear nueva receta</h1>

            <div className={style.container}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label>Nombre: </label>
                        <input type="text" name="name" value={inputForm.name} onChange={(e)=>handleChangue(e) } />
                        {errors.name && (<span>{errors.name}</span>)}
                  
                   </div> 
                    <div>
                        <label>Resumen del plato: </label>
                        <input type="text" name="summary" value={inputForm.summary} onChange={(e)=>handleChangue(e)}></input>
                        {
                          errors.summary && (<span>{errors.summary}</span>)  
                        }
                    </div>
                    <div>
                        <label>Health Score: </label>
                        <input type="number" name="healthScore" value={inputForm.healthScore} onChange={(e)=>handleChangue(e)}/>
                        {
                            errors.healthScore && (<span>{errors.healthScore}</span>)
                        }
                  
                    </div>
                    <div className={style.text_select}>
                        <label>Paso a paso: </label>
                        <textarea rows="10" cols="10" name="steps" value={inputForm.steps} onChange={(e)=>handleChangue(e)}></textarea>
                        {
                            errors.steps && (<span>{errors.steps}</span>)
                        }
                    </div>
                    <div className={style.text_select}>
                        <label>Tipos de dietas: </label>
                        <select  name="dietId" value={inputForm.dietId} onChange={(e)=>pushDietsId(e)} multiple={true}>
                            {
                                diets.map(d=> <option key={d.id} value={d.id}>{d.name}</option>)
                            }
                        </select>
                        {
                            errors.dietId && (<span>{errors.dietId}</span>)
                        }
                    </div>
                    <div>
                        <input type="submit" value="Crear" className={style.create}></input>
                    </div>
                </form>
            </div>
        </div>

    )

}

export default NewRecipe;