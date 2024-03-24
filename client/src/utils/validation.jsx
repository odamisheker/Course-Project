import { z } from "zod";

export const User = z.object({
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, {
      message: "Password must contain at least one capital letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
});
