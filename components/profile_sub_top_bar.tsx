import Image from 'next/image';
import React from 'react';
import { BsGear } from 'react-icons/bs';

export default function ProfileSubTopBar(props: any) {
  const getIdList = () => {
    let idOptions: Array<any> = new Array();
    for (var i = 0; i < props.idList.length; i++) {
      idOptions.push(<option value={i}>{props.idList[i].address}</option>);
    }
    return idOptions;
  };

  return (
    <div className="flex flex-row mt-2 border-b-2 w-full items-center justify-center">
      <Image
        className="rounded-full h-24 w-24 mx-2"
        src={props.img_url}
        alt="profile_logo"
        width={30}
        height={30}
        quality={100}
      />
      <div className="flex items-center flex-col">
        <div className="flex flex-row items-center space-x-2">
          <div className="text-2xl font-semibold">{props.name}</div>
          <BsGear
            onClick={() => props.is_open_modal(true)}
            className="fill-gray-500 h-7 w-7"
          />
        </div>
        <div>Wallet Address</div>
        <div className="text-ellipsis overflow-hidden w-44 items-center flex">
          <select
            onChange={(event) => {
              props.setActingAccount(props.idList[event.target.value]);
              props.setIsCreatedFnRun(false);
              props.createProfile;
            }}
            className="w-32 items-center flex"
          >
            {props.idList !== undefined ? (
              getIdList()
            ) : (
              <option className="text-ellipsis overflow-hidden">
                no accounts
              </option>
            )}
          </select>
        </div>
        <div className="">{`${props.followingList.length} following ${props.followerList.length} follower `}</div>
      </div>
    </div>
  );
}
