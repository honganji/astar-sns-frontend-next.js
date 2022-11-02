import Image from "next/image";
import React from "react";
import { BiSend } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";

import Message from "../components/message";
import { sendMessage } from "../hooks/messageFunction";

export default function MessageRoom(props: any) {
  const makeMessageUI = () => {
    console.log(props);
    const messageUIList: Array<any> = new Array();
    let messageList = props.messageList;
    if (messageList !== null) {
      for (var i = 0; i < messageList.length; i++) {
        messageUIList.push(
          <div>
            <Message
              account_id={props.myUserId}
              img_url={
                props.myUserId == messageList[i].senderId
                  ? props.myImgUrl
                  : props.userImgUrl
              }
              time={messageList[i].createdTime}
              message={messageList[i].message}
              senderId={messageList[i].senderId}
            />
          </div>,
        );
      }
    }
    return messageUIList;
  };

  const submit = async (event: any) => {
    event.preventDefault();
    await sendMessage({
      api: props.api,
      actingAccount: props.actingAccount,
      message: event.target.message.value,
      id: props.messageListId,
    });
    event.target.message.value = "";
  };

  return (
    <div className="flex justify-center items-center bg-gray-200 w-screen h-screen ">
      <main className="items-center h-screen w-1/3 flex bg-white flex-col">
        <div className="bg-[#ADE9F6] h-24 w-full flex flex-row items-center justify-center">
          <Image
            className="rounded-full h-16 w-16 mx-2"
            src={props.userImgUrl}
            alt="profile_logo"
            width={30}
            height={30}
            quality={100}
          />
          <p className="font-semibold text-4xl text-ellipsis overflow-hidden w-[200px]  items-center  justify-center">
            {props.userName}
          </p>
        </div>
        <BsArrowLeft
          className="absolute top-8 left-[500px] h-12 w-12"
          onClick={() => props.setShowMessageModal(false)}
        />
        <div className="flex-1 overflow-scroll w-full">{makeMessageUI()}</div>
        <div className="bottom-0 h-20 w-full bg-gray-300 items-center flex justify-center flex-row ">
          <form
            onSubmit={submit}
            className="flex flex-row space-x-3 px-3 w-full"
          >
            <input
              id="message"
              name="message"
              type="text"
              className="flex-1 h-11 bg-white"
            ></input>
            <button type="submit">
              <BiSend className="w-11 h-11" />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
