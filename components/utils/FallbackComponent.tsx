import { useRouter } from "next/router";

export const Fallback = () => {
  const router = useRouter();

  return (
    <div className="p-12 h-screen w-screen">
      <div className="flex flex-col m-2 items-center justify-center h-4/5">
        <h1 className="font-bold text-5xl sm:text-5xl 2xl:text-7xl text-red-500">
          Ups... Something went wrong
        </h1>
        <div className="flex text-[18px] mt-10">
          <p className="text-custom-text">Go back to main page: </p>
          <button
            className="ml-2 underline text-custom-link"
            onClick={() => {
              if (router.pathname === "/") window.location.reload();
              else router.push("/");
            }}
          >
            Click here
          </button>
        </div>
      </div>
    </div>
  );
};

// export default Fallback;
