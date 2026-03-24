import { z, ZodTypeAny } from "zod";
import { ITypeField } from "@/settings/product-input-form-fields";

export interface INameFieldForm {
  [key: string]:  string | number | boolean | string[] | number [];
}

export interface iArrayNameFormField {
  indexkey : string | number,
  languagename : string,
  sort : string | number,
  classhtml : string,
  namefield: string,
  namefieldlang: string,
  namefieldlangsort: string,
  labelfield: string,
  placeholderfield: string,
  descriptionfiled: string,
  defaultfield: string | number | boolean | string[] | number [],
  // zod: z.AnyZodObject | z.ZodString | z.ZodNumber | z.ZodBoolean | z.ZodTypeAny | z.ArrayCardinality ,
  zod: z.ZodTypeAny ,
  typefield: ITypeField["typefield"],
  src : string,
  srcThumb : string,
}

export interface INameFieldFormZod {
  [key: string]: ZodTypeAny;
}

