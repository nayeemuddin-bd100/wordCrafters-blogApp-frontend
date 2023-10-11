import { format, parseISO } from "date-fns";

 const dateFormatter = (date) => {
  return format(parseISO(date), "dd MMM yyyy");
}

export default dateFormatter