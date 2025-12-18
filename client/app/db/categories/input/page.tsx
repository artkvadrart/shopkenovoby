import React from "react";
import FormFieldsCyclic from "./components/form-fields-cyclic";
import { getActiveLanguages, getBaseLanguage } from "@/utils/get-languages";
import { getPathsCategories} from "@/utils/get-categories"

function InputCategoryPage( 
) {

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


