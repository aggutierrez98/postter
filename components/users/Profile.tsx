import { UserInterface } from "interfaces";
import { UserInfo, TabsShowPostwitts } from "components";
import { Header } from "components";

interface Props {
  userData: UserInterface;
}

export const Profile = ({ userData }: Props) => {
  return (
    <div className="border-l border-r border-custom-secondary min-h-full">
      <Header title={userData.name} />
      <UserInfo userInfo={userData} />
      <TabsShowPostwitts userData={userData} />
    </div>
  );
};
