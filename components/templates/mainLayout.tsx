// メインとなるレイアウトの記述
// Header
// コントラクトとの接続ロジック
// children (中身 // propsとして渡す)
// Footer
//みたいな構成を記述する
import { Dispatch, FC } from "react";

import { Id } from "../molecules/headerProfile";
import Footer from "../organisms/footer";
import Header from "../organisms/header";

type Props = {
  selectedScreen: string;
  imgUrl: string;
  idList: Id[];
  setSelectedScreen: Dispatch<React.SetStateAction<string>>;

  setActingAccount: (id: Id) => Dispatch<React.SetStateAction<string>>;
  children: any;
};

const MainLayout: FC<Props> = (props: Props) => {
  return (
    <div>
      <Header
        selectedScreen={props.selectedScreen}
        imgUrl={props.imgUrl}
        idList={props.idList}
        setActingAccount={props.setActingAccount}
      />
      <props.children />
      <Footer
        selectedScreen={props.selectedScreen}
        setSelectedScreen={props.setSelectedScreen}
      />
    </div>
  );
};

export default MainLayout;
