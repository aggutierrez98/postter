import { GetServerSideProps } from "next";
import Nextink from "next/link";
import {
  signIn,
  getSession,
  getProviders,
  SessionProvider,
} from "next-auth/react";

import { useForm } from "react-hook-form";
import { isEmail } from "utils/validations";

import { useRouter } from "next/router";
import Link from "next/link";
import { AuthLayout } from "components/layouts/AuthLayout";

const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

type FormData = {
  email: string;
  password: string;
};

const LoginPage = ({ providers }: { providers: typeof SessionProvider }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  const onLoginUser = async ({ email, password }: FormData) => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res.ok) {
      router.replace("/");
    } else {
      setError("email", {
        type: "credentials",
        message: "Email/Password are incorrect",
      });
      setError("password", {
        type: "credentials",
        message: "Email/Password are incorrect",
      });
    }
  };

  return (
    <AuthLayout title={"Login page"}>
      <form
        className=" flex flex-col items-start w-4/5 sm:w-[550px] pt-10 shadow-mh px-5 border-[1px] border-[#1d9bf045] rounded-xl"
        onSubmit={handleSubmit(onLoginUser)}
      >
        <label
          className={`w-full relative  ${
            Object.keys(errors).length === 0 ? "mb-12" : "mb-16"
          }`}
        >
          <input
            autoComplete="off"
            type="text"
            placeholder="Email"
            className={`custom-input text-black w-full h-12 p-4 focus:outline-hidden focus-visible:outline-hidden outline-0 placeholder-gray-300 
              placeholder-opacity-0 basic-3 ${
                errors.email ? "basic-3-error" : ""
              }`}
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: emailPattern,
                message: "Email should be valid",
              },
            })}
          />
          <span
            className={`${
              errors.email ? "text-red-600" : "text-custom-terciary"
            }  text-opacity-80 absolute left-3 top-3 px-1 transition duration-200 input-text`}
          >
            Email
          </span>
          {errors.email && (
            <p className="text-sm absolute text-red-600 dark:text-red-500 p-4 pt-1 truncate">
              {" "}
              {errors.email.message}
            </p>
          )}
        </label>
        <label
          className={`w-full relative  ${
            Object.keys(errors).length === 0 ? "mb-12" : "mb-16"
          }`}
        >
          <input
            autoComplete="off"
            type="password"
            placeholder="Password"
            className={`custom-input text-black w-full h-12 p-4 focus:outline-hidden focus-visible:outline-hidden outline-0 placeholder-gray-300 
              placeholder-opacity-0 basic-3 ${
                errors.password ? "basic-3-error" : ""
              }`}
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
            })}
          />
          <span
            className={`${
              errors.password ? "text-red-600" : "text-custom-terciary"
            }  text-opacity-80 absolute left-3 top-3 px-1 transition duration-200 input-text`}
          >
            Password
          </span>
          {errors.password && (
            <p className="text-sm absolute text-red-600 dark:text-red-500 p-4 pt-1 truncate">
              {errors.password.message}
            </p>
          )}
        </label>

        <button
          className={`self-center relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all
          bg-[#1d9bf0] group text-white rounded hover:bg-opacity-80 ${
            Object.keys(errors).length === 0 ? "" : "mt-5"
          }`}
          type="submit"
          //   disabled={isSubmitting}
        >
          LOGIN
        </button>

        <div className="self-end flex text-[18px] mt-8">
          <Link href="/auth/register" passHref>
            <a
              className="ml-2 underline dark:text-custom-link text-custom-link mb-8 focus-visible:outline-custom-light dark:focus-visible:outline-custom-dark
              hover:opacity-70 transition-all"
            >
              Dont have account?
            </a>
          </Link>
        </div>
      </form>
      <div className="mt-5">
        {Object.values(providers).map((provider) => {
          if (provider.id === "credentials")
            return <div key="credentials"></div>;

          return (
            <div key={provider?.name}>
              <button
                className="mb-5 relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all
                bg-white rounded hover:bg-white group outline-1 outline-[#1d9bf055] outline-none"
                onClick={() => signIn(provider.id)}
              >
                <span
                  className="w-48 h-48 rounded rotate-[-40deg] bg-[#1d9bf0] absolute bottom-0 left-0 -translate-x-full ease-out
                    duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"
                ></span>
                <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                  Sign in with {provider?.name}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const providers = await getProviders();

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      providers,
    },
  };
};

export default LoginPage;
