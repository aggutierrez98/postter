import { useRouter } from "next/router";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { signIn, getSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { AuthLayout } from "components";
import { emailPattern } from "helpers";
import { useTranslation } from "hooks";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const router = useRouter();
  const { t } = useTranslation();

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
          message: t("email error_already_in_use"),
        });
      }
    } else {
      router.replace("/");
    }
  };

  return (
    <AuthLayout title={t("register_page")}>
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
            placeholder={t("name")}
            className={`custom-input text-black w-full h-12 p-4 focus:outline-hidden focus-visible:outline-hidden outline-0 placeholder-gray-300 
              placeholder-opacity-0 basic-3 ${
                errors.name ? "basic-3-error" : ""
              }`}
            {...register("name", {
              required: {
                value: true,
                message: t("nombre error_is_required"),
              },
              minLength: {
                value: 6,
                message: t("nombre error_low_length"),
              },
              maxLength: {
                value: 30,
                message: t("nombre error_high_length"),
              },
            })}
          />
          <span
            className={`${
              errors.name ? "text-red-600" : "text-custom-terciary"
            }  text-opacity-80 absolute left-3 top-3 px-1 transition duration-200 input-text`}
          >
            {t("name")}
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
            placeholder={t("email")}
            className={`custom-input text-black w-full h-12 p-4 focus:outline-hidden focus-visible:outline-hidden outline-0 placeholder-gray-300 
              placeholder-opacity-0 basic-3 ${
                errors.email ? "basic-3-error" : ""
              }`}
            {...register("email", {
              required: {
                value: true,
                message: t("email error_is_required"),
              },
              pattern: {
                value: emailPattern,
                message: t("email error_not_valid"),
              },
            })}
          />
          <span
            className={`${
              errors.email ? "text-red-600" : "text-custom-terciary"
            }  text-opacity-80 absolute left-3 top-3 px-1 transition duration-200 input-text`}
          >
            {t("email")}
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
            placeholder={t("password")}
            className={`custom-input text-black w-full h-12 p-4 focus:outline-hidden focus-visible:outline-hidden outline-0 placeholder-gray-300 
              placeholder-opacity-0 basic-3 ${
                errors.password ? "basic-3-error" : ""
              }`}
            {...register("password", {
              required: {
                value: true,
                message: t("password error_is_required"),
              },
              minLength: {
                value: 6,
                message: t("password error_low_length"),
              },
              maxLength: {
                value: 30,
                message: t("password error_high_length"),
              },
            })}
          />
          <span
            className={`${
              errors.password ? "text-red-600" : "text-custom-terciary"
            }  text-opacity-80 absolute left-3 top-3 px-1 transition duration-200 input-text`}
          >
            {t("password")}
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
          {t("register")}
        </button>

        <div className="self-end flex text-[18px] mt-8">
          <Link href="/auth/login" passHref>
            <a
              className="ml-2 underline dark:text-custom-link text-custom-link mb-8 focus-visible:outline-custom-light dark:focus-visible:outline-custom-dark 
              hover:opacity-70"
            >
              {t("already_have_account")}
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
