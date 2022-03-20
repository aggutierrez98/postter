import { useRouter } from "next/router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { UserInterface } from "interfaces";
import { UserInfo, TabsShowPostwitts } from "components";

interface Props {
  userData: UserInterface;
}

export const Profile = ({ userData }: Props) => {
  const router = useRouter();

  return (
    <div className="border-l border-r border-custom-secondary min-h-full">
      <div
        className="flex items-center px-1.5 py-2 border-b border-custom-secondary text-custom-text font-semibold 
          text-xl gap-x-4 sticky top-0 z-50 bg-custom-primary"
      >
        <div
          className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
          onClick={() => {
            router.back();
            router.push("/");
          }}
        >
          <ArrowBackIcon className="h-5 text-custom-text" />
        </div>
        {userData.name}
      </div>
      <UserInfo userInfo={userData} />
      <TabsShowPostwitts userData={userData} />
    </div>
  );
};
