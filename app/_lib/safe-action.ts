//Biblioteca para nos ajudar a debugar erros nas server action

import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient();

