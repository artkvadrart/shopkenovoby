import React from "react";
import FormFieldsCyclic from "./components/form-fields-cyclic";
import { getActiveLanguages, getBaseLanguage, iActiveLanguages, iBaseLanguages } from "@/utils/get-languages";
import { getPathsCategories} from "@/utils/get-categories"
import { fail } from "assert";

function InputCategoryPage( 
) {

  const inverter : boolean = false;  
  return (
    <div>      
      <FormFieldsCyclic 
       activeLanguagesProps={getActiveLanguages()}  
       baseLanguageProps={getBaseLanguage()}  
       getPathsCategoriesProps={getPathsCategories()}
      />
    </div>
  );
}
export default InputCategoryPage;


