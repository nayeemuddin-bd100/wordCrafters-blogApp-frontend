
 const dateFormatter = (inputDate) => {
		const date = new Date(inputDate);

		const day = date.getDate();
		const month = date.toLocaleString("default", { month: "short" });
		const year = date.getFullYear();

		const formattedDate = `${day} ${month} ${year}`;
		return formattedDate;
 };

export default dateFormatter
