import React  from "react";
import style from "./Pagination.module.css";

const Pagination =({recipesPerPage,allRecipes,paginated,prevPage, nextPage})=>{

    const numberPage = [];
    
    for(let i=0; i<Math.ceil(allRecipes / recipesPerPage); i++){
        numberPage.push(i +1);
    }

    return (
        <nav>
            <ul className={style.container}>
            <li onClick={prevPage} className={style.prev_next}>Prev</li>
                {numberPage && numberPage.map(number =>(
                        <li key={number} onClick={()=>paginated(number)}>{number}</li>
                ))} 
            <li onClick={nextPage} className={style.prev_next}>Next</li>
            </ul>
    
        </nav>
    )
}

export default Pagination;