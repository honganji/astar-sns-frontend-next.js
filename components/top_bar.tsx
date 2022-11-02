import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Header from "./organisms/header";

export default function TopBar(props: any) {
  const router = useRouter();
  const [witchScreen, setWitchScreen] = useState(
    router.pathname.replace(/[/]/g, ""),
  );
  return (
    <Header
      selectedScreen={witchScreen}
      imgUrl={props.imgUrl}
      idList={props.idList}
      setActingAccount={props.setActingAccount}
    />
  );
}
