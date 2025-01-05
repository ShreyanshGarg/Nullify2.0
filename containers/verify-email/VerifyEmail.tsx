"use client";

import { Button, Image } from "antd";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GoogleOutlined } from "@ant-design/icons";

const VerifyEmail = () => {


  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-custom mx-6">
      <Button
          size="large"
            className="mt-4 !bg-[#283039] !border-[#283039] w-full"
            // onClick={}
          >
           Verify Email
          </Button> 
      </div>
    </>
  );
};

export default VerifyEmail;
