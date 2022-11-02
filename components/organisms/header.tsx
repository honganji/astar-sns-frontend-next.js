// call ppLogo to left upper area
import type { Dispatch, FC } from "react";

import AppLogo from "../atoms/appLogo";
import DisconnectButton from "../molecules/disconnectButton";
import HeaderProfile from "../molecules/headerProfile";
import type { Id } from "../molecules/headerProfile";

type Props = {
  selectedScreen: string;
  imgUrl: string;
  idList: Id[];
  setActingAccount: (id: Id) => Dispatch<React.SetStateAction<string>>;
};

const Header: FC<Props> = (props: Props) => {
  return (
    <div className="bg-[#ADE9F6] h-24 w-full flex items-center justify-center">
      <AppLogo />
      <div className="z-30 mt-24 flex-1 flex justify-center text-xl flex-col text-[#0009DC]"></div>
      {props.selectedScreen === "profile" ? (
        <DisconnectButton />
      ) : (
        <HeaderProfile
          imgUrl={props.imgUrl}
          idList={props.idList}
          setActingAccount={props.setActingAccount}
        />
      )}
    </div>
  );
};

export default Header;
