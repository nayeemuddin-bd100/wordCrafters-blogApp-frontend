import { PulseLoader } from "react-spinners";

const MiniSpinner = () => {
	return (
		<div className="flex justify-center items-center">
			<PulseLoader
				className=""
				color={"#36D7B7"}
				loading={true}
				size={10}
				margin={2}
			/>
		</div>
	);
};


export default MiniSpinner;