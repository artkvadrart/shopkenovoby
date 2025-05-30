import { z, ZodTypeAny } from "zod";

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
  typefield: "textarea" | "checkbox" | "input" | "switch" | "number" | "url" | "file" | "select",
}

export interface INameFieldFormZod {
  [key: string]: ZodTypeAny;
}

