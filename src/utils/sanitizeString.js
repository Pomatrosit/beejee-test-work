export const sanitizeString = (str) => str.replace(/<\/?[^>]+>/g, "")
