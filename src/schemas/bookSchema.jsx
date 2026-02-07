import { z } from "zod";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const stringSchema = z
  .string()
  .nonempty("Preencha este campo")
  .min(3, "Esse campo precisa de no mínimo 3 caracteres")
  .trim()
  .refine( (value) => value !== "", {message: "Preencha este campo"})

const dateSchema = z
  .string()
  .nonempty("Preencha este campo")
  .refine( (value) => dayjs( value, ["DD/MM/YYYY", "DD-MM-YYYY"], true).isValid(),
  {message: "Tente o formato 01/01/2001 ou 01-01-2001"}
  )
  .transform( (value) => dayjs(value, ["DD/MM/YYYY", "DD-MM-YYYY"], true).format("YYYY-MM-DD")
);

const bookSchema = z.object({
  title: stringSchema,
  written_by: stringSchema,
  description: stringSchema,
  first_published: dateSchema,
  url_img: stringSchema
});

export default bookSchema;