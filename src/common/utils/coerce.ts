import { z } from "zod";

export const num = z.coerce.number();

export const int = num.int();

export const maybeInt = int.nullable().catch(null);
