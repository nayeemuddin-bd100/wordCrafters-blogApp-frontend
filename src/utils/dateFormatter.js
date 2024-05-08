export const DateMonth = (dateStr) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const parts = dateStr.split(" ");
  const day = parts[0];
  const month = months[new Date(`${parts[2]} ${parts[1]} 1`).getMonth()];
  const year = parts[2];

  return `${day} ${month}`;
};

const dateFormatter = (inputDate) => {
  const date = new Date(inputDate);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  const formattedDate = `${day} ${month} ${year}`;
  return formattedDate;
};

export default dateFormatter;
