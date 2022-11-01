import Modal from 'react-modal';

export default function PostModal(props: any) {
  const submit = async (event: any) => {
    event.preventDefault();
    await props.releasePost(
      event.target.img_url.value,
      event.target.description.value
    );
    props.afterOpenFn(false);
    alert(
      `img_url: ${event.target.img_url.value}\ndescription: ${event.target.description.value}`
    );
  };
  return (
    <Modal
      className="flex items-center justify-center h-screen"
      isOpen={props.is_open}
    >
      <form
        onSubmit={submit}
        className="h-1/2 w-1/5 bg-gray-200 flex flex-col items-center justify-start"
      >
        <div className="font-bold text-2xl pt-4">input post info!</div>
        <div className="flex flex-row justify-start my-4">
          <div className="mr-2 text-2xl">Image URL:</div>
          <input
            id="img_url"
            name="img_url"
            type="text"
            className="w-24 bg-white"
          />
        </div>
        <div className="flex flex-col items-start w-full my-4">
          <div className="mr-2 text-2xl ml-[32px]">Description:</div>
          <input
            id="description"
            name="description"
            type="text"
            className="w-64 h-32 bg-white flex ml-4"
          />
        </div>
        <div className="flex flex-row space-x-1">
          <button
            className="rounded-3xl h-10 w-32 bg-[#003AD0] text-white"
            onClick={() => props.afterOpenFn(false)}
          >
            Close
          </button>
          <button
            className="rounded-3xl h-10 w-32 bg-[#003AD0] text-white"
            type="submit"
          >
            Post!
          </button>
        </div>
      </form>
    </Modal>
  );
}