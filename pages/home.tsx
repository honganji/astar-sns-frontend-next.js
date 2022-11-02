import { ApiPromise } from "@polkadot/api";
import type { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import React, { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";

import BottomNavigation from "../components/bottom_navigation";
import Post from "../components/post";
import TopBar from "../components/top_bar";
import { connectToContract } from "../hooks/connect";
import type { PostType } from "../hooks/postFunction";
import { getGeneralPost } from "../hooks/postFunction";
import {
  checkCreatedInfo,
  createProfile,
  getProfileForHome,
} from "../hooks/profileFunction";
import PostModal from "./post-modal";

export default function home() {
  const [api, setApi] = useState<ApiPromise>();

  const [isCreatedProfile, setIsCreatedProfile] = useState(true);
  const [isCreatedFnRun, setIsCreatedFnRun] = useState(false);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [isSetup, setIsSetup] = useState(false);

  const [imgUrl, setImgUrl] = useState("");
  const [accountList, setAccountList] = useState<InjectedAccountWithMeta[]>([]);
  const [actingAccount, setActingAccount] = useState<InjectedAccountWithMeta>();
  const [generalPostList, setGeneralPostList] = useState<PostType[]>([]);

  const getPostList = () => {
    let postList: Array<any> = new Array();
    for (var i = 0; i < generalPostList.length; i++) {
      postList.push(
        <Post
          name={generalPostList[i].name}
          time={generalPostList[i].createdTime}
          description={generalPostList[i].description}
          num_of_likes={generalPostList[i].numOfLikes}
          user_img_url={generalPostList[i].userImgUrl}
          post_img_url={generalPostList[i].imgUrl}
          userId={generalPostList[i].userId}
          postId={generalPostList[i].postId}
          actingAccount={actingAccount}
          api={api}
        />,
      );
    }
    return postList.reverse();
  };

  useEffect(() => {
    connectToContract({
      api: api,
      accountList: accountList,
      actingAccount: actingAccount!,
      isSetup: isSetup,
      setApi: setApi,
      setAccountList: setAccountList,
      setActingAccount: setActingAccount!,
      setIsSetup: setIsSetup,
    });
    if (!isSetup) return;
    getProfileForHome({
      api: api!,
      userId: actingAccount?.address!,
      setImgUrl: setImgUrl,
    });
    getGeneralPost({ api: api!, setGeneralPostList: setGeneralPostList });
    if (isCreatedFnRun) return;
    checkCreatedInfo({
      api: api,
      userId: actingAccount?.address!,
      setIsCreatedProfile: setIsCreatedProfile,
    });
    if (isCreatedProfile) return;
    createProfile({ api: api, actingAccount: actingAccount! });
    setIsCreatedFnRun(true);
  });

  return (
    <div className="flex justify-center items-center bg-gray-200 w-screen h-screen relative">
      <main className="items-center justify-center h-screen w-1/3 flex bg-white flex-col">
        <PostModal
          isOpen={showNewPostModal}
          afterOpenFn={setShowNewPostModal}
          api={api!}
          actingAccount={actingAccount!}
        />
        <TopBar
          idList={accountList}
          imgUrl={imgUrl}
          setActingAccount={setActingAccount}
        />
        <div className="flex-1 overflow-scroll">{getPostList()}</div>
        <div className="w-full">
          <BottomNavigation api={api} />
        </div>
        <button
          onClick={() => {
            setShowNewPostModal(true);
          }}
          className="rounded-full h-14 w-14 bg-[#003AD0] absolute bottom-24 right-1/3 mr-5 items-center flex justify-center"
        >
          <BsPlusLg className="h-9 w-9" />
        </button>
      </main>
    </div>
  );
}
