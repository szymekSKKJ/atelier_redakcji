import { userActivateAccount } from "@/app/api/user/activateAccount/[uuid]/route";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    googleBot: {
      index: false,
    },
  },
};

interface componentProps {
  params: { uuid: string };
}

const activateAccountPage = async ({ params: { uuid } }: componentProps) => {
  const activatedAccountResponseData = await userActivateAccount(uuid);

  return <>{activatedAccountResponseData.data ? <p>{activatedAccountResponseData.data.message}</p> : <p>{activatedAccountResponseData.error}</p>}</>;
};

export default activateAccountPage;
