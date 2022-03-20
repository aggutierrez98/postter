import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { signIn, getSession } from "next-auth/react";

import { useForm } from "react-hook-form";

import { AuthLayout } from "components/layouts/AuthLayout";
import { isEmail } from "utils/validations";
import Link from "next/link";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const RegisterPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  const onRegisterForm = async ({ name, email, password }: FormData) => {
    const res = await signIn("credentials", {
      email,
      password,
      name,
      redirect: false,
    });

    if (res.error) {
      if (res.error === "auth/email-already-in-use") {
        setError("email", {
          message: "Email already in use",
        });
      }
    } else {
      router.replace("/");
    }
  };

  return (
    <AuthLayout title={"Login page"}>
      <form
        className=" flex flex-col items-start w-4/5 sm:w-[550px] shadow-mh pt-10 px-5 border-[1px] border-[#1d9bf045] rounded-xl"
        onSubmit={handleSubmit(onRegisterForm)}
      >
        <label
          className={`w-full relative  ${errors.name ? "mb-20" : "mb-12"}`}
        >
          <input
            autoComplete="off"
            type="text"
            placeholder="Name"
            className={`custom-input text-black w-full h-12 p-4 focus:outline-hidden focus-visible:outline-hidden outline-0 placeholder-gray-300 
              placeholder-opacity-0 basic-3 ${
                errors.name ? "basic-3-error" : ""
              }`}
            {...register("name", {
              required: {
                value: true,
                message: "Name is required",
              },
              minLength: {
                value: 6,
                message: "Name should be more than 6 characters",
              },
              maxLength: {
                value: 30,
                message: "Name should be less than 30 characters",
              },
            })}
          />
          <span
            className={`${
              errors.name ? "text-red-600" : "text-custom-terciary"
            }  text-opacity-80 absolute left-3 top-3 px-1 transition duration-200 input-text`}
          >
            Name
          </span>
          {errors.name && (
            <p className="text-sm absolute text-red-600 dark:text-red-500 p-4 pt-1 truncate">
              {" "}
              {errors.name.message}
            </p>
          )}
        </label>
        <label
          className={`w-full relative  ${errors.email ? "mb-20" : "mb-12"}`}
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
          className={`w-full relative  ${errors.password ? "mb-20" : "mb-12"}`}
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
          className="self-center relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all
          bg-[#1d9bf0] group text-white rounded hover:bg-opacity-80"
          type="submit"
          //   disabled={isSubmitting}
        >
          REGISTER
        </button>

        <div className="self-end flex text-[18px] mt-8">
          <Link href="/auth/login" passHref>
            <a
              className="ml-2 underline dark:text-custom-link text-custom-link mb-8 focus-visible:outline-custom-light dark:focus-visible:outline-custom-dark 
              hover:opacity-70"
            >
              Already registered?
            </a>
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default RegisterPage;
