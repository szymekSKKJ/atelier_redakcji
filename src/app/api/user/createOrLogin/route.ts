import { NextRequest } from "next/server";
import prisma from "../../../../../prisma/prisma";
import { createResponse, response } from "../../response";
import sendVereficationLink from "./sendVereficationLink";
import { compareSync, genSaltSync, hashSync } from "bcryptjs";

const POST = async (request: NextRequest) => {
  try {
    const { cookies } = await import("next/headers");

    const formData = await request.formData();

    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;

    const userDataCookie = cookies().get("user");

    if (userDataCookie) {
      const userDataFromCookie = JSON.parse(cookies().get("user")!.value) as {
        id: string;
      };

      const userFromCookie = await prisma.user.findUnique({
        where: {
          id: userDataFromCookie.id,
        },
      });

      if (userFromCookie) {
        return createResponse(200, null, {
          user: {
            isActivated: userFromCookie.isActivated,
          },
        });
      } else {
        throw new Error("Wystąpił nieoczekiwany błąd");
      }
    } else if (email && password) {
      const regexForEmail = /\S+@\S+\.\S+/;

      const isEmialValid = regexForEmail.test(email);

      if (isEmialValid) {
        const doesUserAlreadyExists = await prisma.user.findFirst({
          where: {
            email: email,
          },
        });

        if (doesUserAlreadyExists !== null) {
          const existingUser = doesUserAlreadyExists;

          const isAuthenticated = compareSync(password, existingUser.password);

          if (isAuthenticated) {
            if (doesUserAlreadyExists.isActivated) {
              if (cookies().get("user")) {
                return createResponse(200, null, {
                  user: {
                    isActivated: existingUser.isActivated,
                  },
                });
              } else {
                const cookieExpireDate = new Date();

                cookieExpireDate.setMonth(cookieExpireDate.getMonth() + 1);

                const userDataToSaveInCookie = {
                  id: existingUser.id,
                };

                cookies().set("user", JSON.stringify(userDataToSaveInCookie), { expires: cookieExpireDate, secure: true, httpOnly: true });

                await prisma.user.update({
                  where: {
                    id: existingUser.id,
                  },
                  data: {
                    cookieExpireDate: cookieExpireDate,
                  },
                });

                return createResponse(200, null, {
                  user: {
                    isActivated: existingUser.isActivated,
                  },
                });
              }
            } else {
              return createResponse(200, null, {
                message: "To konto oczekuje na akceptację przez administratora",
              });
            }
          } else {
            return createResponse(200, null, {
              message: "Hasło jest nieprawidłowe",
            });
          }
        } else {
          const isCreatingAccount = formData.get("isCreatingAccount") === "true" ? true : false;

          if (isCreatingAccount) {
            const generatedUUID = crypto.randomUUID();

            const hashedPassword = hashSync(password, genSaltSync(10));

            await prisma.user.create({
              data: {
                email: email,
                password: hashedPassword,
                dataToActivate: generatedUUID,
              },
            });

            await sendVereficationLink(email, generatedUUID);

            return createResponse(200, null, {
              message: "Konto zostało utworzone. Poczekaj aż administrator je zatwierdzi",
            });
          } else {
            return createResponse(200, null, {
              message: "Konto o podanym adresie email nie istnieje",
            });
          }
        }
      } else {
        return createResponse(200, null, {
          message: "Email jest niepoprawny",
        });
      }
    } else {
      return createResponse(200, null, null);
    }
  } catch (e) {
    const error = e as Error;
    return createResponse(500, error.message, null);
  }
};

export { POST };

const userCreateOrLogin = async (
  isCreatingAccount: boolean = false,
  email?: string,
  password?: string
): Promise<
  response<{
    message: string | null | undefined;
    user:
      | {
          isActivated: boolean;
        }
      | undefined;
  } | null>
> => {
  const formData = new FormData();

  formData.set("isCreatingAccount", `${isCreatingAccount}`);

  if (email) {
    formData.set("email", email);
  }

  if (password) {
    formData.set("password", password);
  }

  return fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/createOrLogin`, {
    method: "POST",
    cache: "no-store",
    body: formData,
  }).then((response) => response.json()) as Promise<
    response<{
      message: string | null | undefined;
      user:
        | {
            isActivated: boolean;
          }
        | undefined;
    } | null>
  >;
};

export { userCreateOrLogin };
