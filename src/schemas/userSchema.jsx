import { z } from "zod";

const userSchema = z.object({
  username: z.string().nonempty("Preencha este campo"),
  email: z.email("Email inválido").nonempty("Preencha este campo"),
  password: z.string().nonempty("Preencha este campo"),
  passwordConfirmation: z.string().nonempty("Preencha este campo"),
})
.refine(( data ) => data.password === data.passwordConfirmation, {
    error: "As senhas precisam ser iguais",
    path: ["passwordConfirmation"],
});

export default userSchema;