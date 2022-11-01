import Image from 'next/image';
import React from 'react';
import { AiFillHeart } from 'react-icons/ai';

export default function Post(props: any) {
  const follow = async () => {
    if (confirm('Would you like to follow this account?')) {
      await props.follow(props.userId);
    }
  };
  return (
    <div className="px-3 items-center border-b-2 py-1 ">
      <div className="flex flex-row justify-center">
        <div className="">
          <Image
            onClick={follow}
            className="rounded-full h-12 w-12 mx-2"
            src={props.user_img_url}
            alt="profile_logo"
            width={30}
            height={30}
            quality={100}
          />
        </div>
        <div className="flex items-center flex-col w-[400px]">
          <div className="flex flex-row items-center w-full ">
            <div className="mr-3 font-semibold text-xl">{props.name}</div>
            <div className="text-gray-400">{props.time}</div>
          </div>
          <div className="text-xl w-full">{props.description}</div>
          <Image
            className="mr-3"
            src={props.post_img_url}
            alt="profile_logo"
            width={250}
            height={250}
            quality={100}
          />
          <div className="flex flex-row w-full pl-[85px] items-center">
            <p className="text-xl mr-1">{props.num_of_likes}</p>
            <AiFillHeart
              onClick={() => {
                props.addLikes(props.postId);
              }}
              className="fill-[#FD3509] h-[30px] w-[30px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
