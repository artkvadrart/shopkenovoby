import React from "react";
import FormFieldsCyclic from "./components/form-fields-cyclic";
import { getActiveLanguages } from "@/utils/get-active-languages";

function InputCategoryPage( 
) {
  // for (const key in formDefaultValues) {console.log(`key: ${key} - ${formDefaultValues[key]} `); }

  return (
    <div>      
      <FormFieldsCyclic 
       activeLanguagesProps={getActiveLanguages()}     
      />
    </div>
  );
}
export default InputCategoryPage;


