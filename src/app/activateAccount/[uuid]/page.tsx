import { userActivateAccount } from "@/app/api/user/activateAccount/[uuid]/route";

interface componentProps {
  params: { uuid: string };
}

const activateAccountPage = async ({ params: { uuid } }: componentProps) => {
  const activatedAccountResponseData = await userActivateAccount(uuid);

  console.log(activatedAccountResponseData);

  return <>{activatedAccountResponseData.data ? <p>{activatedAccountResponseData.data.message}</p> : <p>{activatedAccountResponseData.error}</p>}</>;
};

export default activateAccountPage;
