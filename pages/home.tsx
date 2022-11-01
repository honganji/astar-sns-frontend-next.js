import React, { useEffect, useState } from 'react';
import BottomNavigation from '../components/bottom_navigation';
import Post from '../components/post';
import TopBar from '../components/top_bar';
import PostModal from './post-modal';
import { BsPlusLg } from 'react-icons/bs';
import { ApiPromise, WsProvider } from '@polkadot/api';
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { ContractPromise } from '@polkadot/api-contract';
import abi from '../metadata.json';

export default function home() {
  // valiable for RPC connection
  const contractAddress: string = process.env
    .NEXT_PUBLIC_CONTRACT_ADDRESS as string;
  const blockchainUrl = 'ws://127.0.0.1:9944';
  const [api, setApi] = useState<any>();

  const [isCreatedProfile, setIsCreatedProfile] = useState(true);
  const [isCreatedFnRun, setIsCreatedFnRun] = useState(false);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [isSetup, setIsSetup] = useState(false);

  const [imgUrl, setImgUrl] = useState('');
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [actingAccount, setActingAccount] = useState<InjectedAccountWithMeta>();
  const [generalPostList, setGeneralPostList] = useState([]);

  // connect wallet function
  const setup = async () => {
    const wsProvider = new WsProvider(blockchainUrl);
    const api = await ApiPromise.create({ provider: wsProvider });
    console.log('run setup');
    setApi(api);
    await extensionSetup();
  };

  const extensionSetup = async () => {
    const { web3Accounts, web3Enable } = await import(
      '@polkadot/extension-dapp'
    );
    const extensions = await web3Enable('Polk4NET');
    if (extensions.length === 0) {
      return;
    }
    const account = await web3Accounts();
    setAccounts(account);
    setActingAccount(account[0]);
    setIsSetup(true);
  };

  // get profile(query)
  const getProfile = async (userId: any) => {
    const contract = new ContractPromise(api, abi, contractAddress);
    const { gasConsumed, result, output } = await contract.query.getProfileInfo(
      '',
      {
        value: 0,
        gasLimit: -1,
      },
      userId
    );
    if (output !== undefined && output !== null) {
      setImgUrl(
        output.toHuman().imgUrl == null
          ? 'data:image/png;base64,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'
          : output.toHuman()?.imgUrl.toString()
      );
    }
  };

  // check already created profile(query)
  const checkCreatedInfo = async (userId: any) => {
    const contract = new ContractPromise(api, abi, contractAddress);
    const { gasConsumed, result, output } =
      await contract.query.checkCreatedInfo(
        '',
        {
          value: 0,
          gasLimit: -1,
        },
        userId
      );
    if (output !== undefined && output !== null) {
      setIsCreatedProfile(output.toHuman());
    }
  };

  // create profile function(transaction)
  const createProfile = async () => {
    const { web3FromSource } = await import('@polkadot/extension-dapp');
    const contract = new ContractPromise(api, abi, contractAddress);
    const performingAccount = actingAccount;
    const injector = await web3FromSource(performingAccount.meta.source);
    const create_profile = await contract.tx.createProfile(
      {
        value: 0,
        gasLimit: 18850000000,
      },
      actingAccount.address
    );
    if (injector !== undefined) {
      create_profile.signAndSend(
        performingAccount.address,
        { signer: injector.signer },
        (result) => {}
      );
    }
  };

  // release post(transaction)
  const releasePost = async (imgUrl: string, description: string) => {
    const { web3FromSource } = await import('@polkadot/extension-dapp');
    const contract = new ContractPromise(api, abi, contractAddress);
    const performingAccount = actingAccount;
    const injector = await web3FromSource(performingAccount.meta.source);
    const date = new Date();
    const release_post = await contract.tx.releasePost(
      {
        value: 0,
        gasLimit: 35000000000,
      },
      actingAccount?.address,
      description,
      [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-') +
        ' ' +
        [
          date.getHours().toString().padStart(2, '0'),
          date.getMinutes().toString().padStart(2, '0'),
        ].join(':'),
      imgUrl
    );
    if (injector !== undefined) {
      release_post.signAndSend(
        performingAccount.address,
        { signer: injector.signer },
        (result) => {}
      );
    }
  };

  // get general post(query)
  const getGeneralPost = async () => {
    const contract = new ContractPromise(api, abi, contractAddress);
    const { gasConsumed, result, output } = await contract.query.getGeneralPost(
      '',
      {
        value: 0,
        gasLimit: -1,
      },
      1
    );
    if (output !== undefined && output !== null) {
      if (output !== undefined && output !== null) {
        setGeneralPostList(output.toHuman() == null ? [] : output.toHuman());
      }
    }
  };

  // add likes(transaction)
  const addLikes = async (postId: number) => {
    const { web3FromSource } = await import('@polkadot/extension-dapp');
    const contract = new ContractPromise(api, abi, contractAddress);
    const performingAccount = actingAccount;
    const injector = await web3FromSource(performingAccount.meta.source);
    const add_likes = await contract.tx.addLikes(
      {
        value: 0,
        gasLimit: 18850000000,
      },
      postId
    );
    if (injector !== undefined) {
      add_likes.signAndSend(
        performingAccount.address,
        { signer: injector.signer },
        (result) => {}
      );
    }
  };

  // send message(transaction)
  const follow = async (followedId: any) => {
    const { web3FromSource } = await import('@polkadot/extension-dapp');
    const contract = new ContractPromise(api, abi, contractAddress);
    const performingAccount = actingAccount;
    const injector = await web3FromSource(performingAccount!.meta.source);
    const add_likes = await contract.tx.follow(
      {
        value: 0,
        gasLimit: 100000000000,
      },
      actingAccount!.address,
      followedId
    );
    if (injector !== undefined) {
      add_likes.signAndSend(
        performingAccount!.address,
        { signer: injector.signer },
        (result) => {}
      );
    }
  };

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
          follow={follow}
          postId={generalPostList[i].postId}
          addLikes={addLikes}
        />
      );
    }
    return postList.reverse();
  };

  useEffect(() => {
    setup();
    if (!isSetup) return;
    getProfile(actingAccount?.address);
    getGeneralPost();
    if (isCreatedFnRun) return;
    checkCreatedInfo(actingAccount?.address);
    if (isCreatedProfile) return;
    createProfile();
    setIsCreatedFnRun(true);
  });

  return (
    <div className="flex justify-center items-center bg-gray-200 w-screen h-screen relative">
      <main className="items-center justify-center h-screen w-1/3 flex bg-white flex-col">
        <PostModal
          is_open={showNewPostModal}
          afterOpenFn={setShowNewPostModal}
          releasePost={releasePost}
        />
        <TopBar
          idList={accounts}
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
