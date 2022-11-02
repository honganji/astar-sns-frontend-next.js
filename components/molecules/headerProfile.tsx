import Image from "next/image";
import { FC } from "react";

export type Id = {
  address: string;
};

type Props = {
  imgUrl: string;
  idList: Id[];
  setActingAccount: (id: Id) => void;
};

const HeaderProfile: FC<Props> = (props) => {
  const getIdList = () => {
    const idOptions = props.idList.map((id, index) => (
      <option value={index}> {props.idList[index].address} </option>
    ));
    return idOptions;
  };

  return (
    <p className="flex-row flex items-center ml-[30px]">
      <Image
        className="w-[70px] h-[70px] rounded-full mr-3"
        src={props.imgUrl}
        alt="astar_logo"
        width={30}
        height={30}
      />
      <p className="mr-3">
        <p>wallet address</p>
        <select
          onChange={(event) => {
            props.setActingAccount(props.idList[Number(event.target.value)]);
          }}
          className="w-32"
        >
          {props.idList ? (
            getIdList()
          ) : (
            <option className="text-ellipsis overflow-hidden">
              no accounts
            </option>
          )}
        </select>
      </p>
    </p>
  );
};

export default HeaderProfile;