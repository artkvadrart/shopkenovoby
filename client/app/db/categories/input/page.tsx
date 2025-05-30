import React from "react";
import FormFieldsCyclic from "./components/form-fields-cyclic";
import { getActiveLanguages, getBaseLanguage } from "@/utils/get-active-languages";
import { getPathsCategories} from "@/utils/get-categories"

function InputCategoryPage( 
) {
  // for (const key in formDefaultValues) {console.log(`key: ${key} - ${formDefaultValues[key]} `); }

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


