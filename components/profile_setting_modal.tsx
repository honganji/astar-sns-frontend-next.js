import React from 'react';
import Modal from 'react-modal';

export default function ProfileSettingModal(props: any) {
  const submit = async (event: any) => {
    event.preventDefault();
    await props.setProfileInfo(
      event.target.img_url.value,
      event.target.name.value
    );
    await props.getProfile;
    props.afterOpenFn(false);
    alert(
      `img_url: ${event.target.img_url.value}\nname: ${event.target.name.value}`
    );
  };
  return (
    <Modal
      className="flex items-center justify-center h-screen"
      isOpen={props.is_open}
    >
      <form
        onSubmit={submit}
        className="h-1/2 w-1/5 bg-gray-200 flex flex-col items-center justify-center"
      >
        <div className="font-bold text-2xl pt-4">input profile info!</div>
        <div className="flex flex-row justify-start my-4">
          <div className="mr-2 text-2xl">Image URL:</div>
          <input
            id="img_url"
            name="img_url"
            type="text"
            className="w-24 bg-white"
          />
        </div>
        <div className="flex flex-row justify-start my-4">
          <div className="mr-2 text-2xl">Name:</div>
          <input id="name" name="name" type="text" className="w-24 bg-white" />
        </div>
        <div className="flex flex-row space-x-1">
          <button
            onClick={() => props.afterOpenFn(false)}
            className="rounded-3xl h-10 w-32 bg-[#003AD0] text-white"
          >
            Close
          </button>
          <button
            className="rounded-3xl h-10 w-32 bg-[#003AD0] text-white"
            type="submit"
          >
            Set!
          </button>
        </div>
      </form>
    </Modal>
  );
}
