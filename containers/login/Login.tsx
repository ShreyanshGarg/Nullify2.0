'use client';

import { Button } from "antd";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/friends"); // Redirect to /friends when authenticated
    }
  }, [status, router]);

  return (
    <div className="bg-custom p-4 flex-1 pt-20 mt-4">
      {status === "unauthenticated" && (
        <Button type="primary" onClick={() => signIn("google")}>
          Login with Google
        </Button>
      )}
    </div>
  );
};

export default LoginPage;
