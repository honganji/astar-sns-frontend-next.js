import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BiHomeSmile, BiUser, BiCommentEdit } from 'react-icons/bi';

export default function BottomNavigation(props: any) {
  const router = useRouter();
  const [witchScreen, setWitchScreen] = useState(
    router.pathname.replace(/[/]/g, '')
  );

  return (
    <div className="text-xl bg-[#D9D9D9] h-20 space-x-28 flex-row items-center justify-center flex px-10">
      <Link
        onClick={() => {
          setWitchScreen('home');
        }}
        href={{
          pathname: '/home',
        }}
        className="flex-1 flex items-center justify-center flex-col"
      >
        <BiHomeSmile
          className={
            'h-12 w-12 ' +
            (witchScreen === 'home' ? 'fill-[#0009DC]' : 'fill-gray-500')
          }
        />
        {witchScreen === 'home' ? (
          <p className="pb-1 text-[#0009DC]">home</p>
        ) : (
          <></>
        )}
      </Link>
      <Link
        onClick={() => {
          setWitchScreen('profile');
        }}
        href="/profile"
        className="flex-1 flex items-center justify-center flex-col"
      >
        <BiUser
          className={
            'h-12 w-12 ' +
            (witchScreen === 'profile' ? 'fill-[#0009DC]' : 'fill-gray-500')
          }
        />
        {witchScreen === 'profile' ? (
          <p className="pb-1 text-[#0009DC]">profile</p>
        ) : (
          <></>
        )}
      </Link>
      <Link
        onClick={() => {
          setWitchScreen('message');
        }}
        href="/message"
        className="flex-1 flex items-center justify-center flex-col"
      >
        <BiCommentEdit
          className={
            'h-12 w-12 ' +
            (witchScreen === 'message' ? 'fill-[#0009DC]' : 'fill-gray-500')
          }
        />
        {witchScreen === 'message' ? (
          <p className="pb-1 text-[#0009DC]">message</p>
        ) : (
          <></>
        )}
      </Link>
    </div>
  );
}
