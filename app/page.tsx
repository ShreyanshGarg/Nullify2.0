"use client";

// import AppBar from "@/components/AppBar";
// import BottomNav from "@/components/BottomNav";
import InstallButton from "@/components/InstallButton";
import dynamic from "next/dynamic";

// const AlarmButton = dynamic(() => import("@/components/AlarmButton"), {
//   ssr: false, // 서버 사이드 렌더링을 하지 않도록 설정
// });

const Home = () => {
  return (
    <div>
      {/* <AppBar> */}
      {/* <AlarmButton /> */}
      <InstallButton />
      {/* </AppBar> */}
      {/* <BottomNav /> */}
    </div>
  );
};

export default Home;
