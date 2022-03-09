import { UserInterface } from "../interfaces/index";
import { useRouter } from "next/router";
import { UserInfo } from "./UserInfo";
import { TabsShowPostwitts } from "./TabsShowPostwitts";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface Props {
  userData: UserInterface;
}

export const Profile = ({ userData }: Props) => {
  const router = useRouter();

  return (
    <div className="border-l border-r border-secondary min-h-full">
      <div
        className="flex items-center px-1.5 py-2 border-b border-secondary text-white font-semibold 
          text-xl gap-x-4 sticky top-0 z-50 bg-primary"
      >
        <div
          className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
          onClick={() => {
            router.back();
            router.push("/");
          }}
        >
          <ArrowBackIcon className="h-5 text-white" />
        </div>
        {userData.name}
      </div>
      <UserInfo userInfo={userData} />
      <TabsShowPostwitts userData={userData} />
    </div>
  );
};
