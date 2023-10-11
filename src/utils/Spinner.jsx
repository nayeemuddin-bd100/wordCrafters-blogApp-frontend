import { PulseLoader } from "react-spinners";

function Spinner() {


	return (
		<div className="flex justify-center items-center h-screen">

				<PulseLoader
					className=""
					color={"#36D7B7"}
					loading={true}
					size={15}
					margin={2}
				/>
			</div>

	);
}

export default Spinner;
