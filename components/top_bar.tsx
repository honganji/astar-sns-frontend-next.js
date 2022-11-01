import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function TopBar(props: any) {
  const router = useRouter();
  const [witchScreen, setWitchScreen] = useState(
    router.pathname.replace(/[/]/g, '')
  );

  // const witchScreen = router.pathname.replace(/[/]/g, '');

  const getIdList = () => {
    let idOptions: Array<any> = new Array();
    for (var i = 0; i < props.idList.length; i++) {
      idOptions.push(<option value={i}>{props.idList[i].address}</option>);
    }
    return idOptions;
  };

  useEffect(() => {});

  return (
    <div className="bg-[#ADE9F6] h-24 w-full flex items-center justify-center">
      <p className="flex-row flex items-center ml-[30px]">
        <Image
          className="w-[70px] h-[70px]"
          src="/unchain_logo.png"
          alt="unchain_logo"
          width={30}
          height={30}
        />
        <Image
          className="w-[40px] h-[25px]"
          src="/cross_mark_2_logo-removebg.png"
          alt="cross_logo"
          width={30}
          height={30}
        />
        <Image
          className="w-[70px] h-[70px]"
          src="/Astar_logo.png"
          alt="astar_logo"
          width={30}
          height={30}
        />
      </p>
      <p className="z-30 mt-24 flex-1 flex justify-center text-xl flex-col text-[#0009DC]"></p>
      {witchScreen === 'profile' ? (
        <button
          className="z-10 text-xl text-white items-center flex justify-center h-14 bg-[#003AD0] hover:bg-blue-700  py-2 px-4 rounded-full mr-4"
          onClick={() => {
            router.push('/');
          }}
        >
          Disconnect Wallet
        </button>
      ) : (
        <p className="flex-row flex items-center">
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
                props.setActingAccount(props.idList[event.target.value]);
              }}
              className="w-32"
            >
              {props.idList !== null ? (
                getIdList()
              ) : (
                <option className="text-ellipsis overflow-hidden">
                  no accounts
                </option>
              )}
            </select>
          </p>
        </p>
      )}
    </div>
  );
  // ) : null;
}
