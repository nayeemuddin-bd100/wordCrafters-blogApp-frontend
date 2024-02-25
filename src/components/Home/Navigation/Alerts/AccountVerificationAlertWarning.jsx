import { ExclamationIcon } from "@heroicons/react/solid";
import { useDispatch } from 'react-redux';
import { verifyEmailAction } from "../../../../redux/slices/email-varification/emailVerificationSlices";

const AccountVerificationAlertWarning = () => {

  const dispatch = useDispatch()
  return (
		<div className="">
			<div className="bg-red-500 border-l-4 border-yellow-400 p-1 w-full">
				<div className="flex max-w-7xl mx-auto ">
					<div className="flex-shrink-0 md:ml-8">
						<ExclamationIcon
							className="h-5 w-5 text-yellow-500"
							aria-hidden="true"
						/>
					</div>
					<div className="ml-3">
						<p className="text-sm text-yellow-200">
							Your account is not verified.{" "}
							<button
								onClick={() => dispatch(verifyEmailAction())}
								className="font-medium underline text-white hover:text-yellow-600"
							>
								Click this link to verify
							</button>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
export default AccountVerificationAlertWarning;