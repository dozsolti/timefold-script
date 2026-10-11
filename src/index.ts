import { generateEvents } from "./events";
export { parseGrammar } from "./parser";

const result = generateEvents("Fun: monday, friday 20:00", 2026);

export { generateEvents };

// hour -> hours to match date-fns?
