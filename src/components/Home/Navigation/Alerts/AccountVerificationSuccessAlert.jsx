import { CheckCircleIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";

const AccountVerificationSuccessAlert = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {visible && (
        <div className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircleIcon
                className="h-5 w-5 text-green-500"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-500">
                Email is successfully sent to your Email
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountVerificationSuccessAlert;
