import { z, ZodTypeAny } from "zod";

export interface INameFieldForm {
  [key: string]:  string | number | boolean ;
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
  defaultfield: string | number | boolean,
  zod: z.AnyZodObject | z.ZodString | z.ZodNumber | z.ZodBoolean,
  typefield: "textarea" | "checkbox" | "input" | "number" | "url" | "file" | "select" ,
}

export interface INameFieldFormZod {
  [key: string]: ZodTypeAny;
}

