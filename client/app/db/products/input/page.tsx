import React from "react";
import FormFieldsCyclic from "./components/form-fields-cyclic";
import { getActiveLanguages, getBaseLanguage, iActiveLanguages, iBaseLanguages } from "@/utils/get-languages";
import { getActiveCurrency} from "@/utils/get-curency"
import { getCategories, getCategoriesNameJsonNameSetParametrsJson} from "@/utils/get-categories"
import { getProducts } from "@/utils/get-products"
import { id } from "zod/v4/locales";



function InputProductPage( 
) {

  return (
    <div>      
      <FormFieldsCyclic 
       activeLanguagesProps={getActiveLanguages()}  
       baseLanguageProps={getBaseLanguage()}  
       getActiveCurrencyProps={getActiveCurrency()}
       getCategoriesProps={getCategories()}
       getProductsProps={getProducts()}      
       getCategoriesNameJsonNameSetParametrsJsonProps={getCategoriesNameJsonNameSetParametrsJson()}     
      />
    </div>
  );
}
export default InputProductPage;


