import { NextRequest } from "next/server";
import prisma from "../../../../../../prisma/prisma";
import { createResponse, response } from "@/app/api/response";

const POST = async (request: NextRequest, { params: { uuid } }: { params: { uuid: string } }) => {
  try {
    const foundAccount = await prisma.user.findFirst({
      where: {
        dataToActivate: uuid,
      },
    });

    if (foundAccount) {
      await prisma.user.update({
        where: {
          id: foundAccount.id,
        },
        data: {
          dataToActivate: null,
          isActivated: true,
        },
      });

      return createResponse(200, null, {
        message: `Konto zostało aktywowane`,
        activatedAccountEmail: foundAccount.email,
      });
    } else {
      throw new Error("Coś poszło nie tak");
    }
  } catch (e) {
    const error = e as Error;
    return createResponse(500, error.message, null);
  }
};

export { POST };

const userActivateAccount = async (uuid: string): Promise<response<{ message: string; activatedAccountEmail: string | undefined } | null>> => {
  const request = new NextRequest(`${process.env.NEXT_PUBLIC_URL}/api/user/activateAccount/${uuid}`);

  return await POST(request, { params: { uuid: uuid } }).then((response) => response.json());
};

export { userActivateAccount };
