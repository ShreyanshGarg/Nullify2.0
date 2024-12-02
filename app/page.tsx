"use client";

// import AppBar from "@/components/AppBar";
// import BottomNav from "@/components/BottomNav";
import InstallButton from "@/components/InstallButton";
import dynamic from "next/dynamic";

// const AlarmButton = dynamic(() => import("@/components/AlarmButton"), {
//   ssr: false, 
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
