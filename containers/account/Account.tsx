'use client'
import { Button, List, Typography, Avatar, Input, Space, GetProps } from "antd";
import { signOut } from "next-auth/react";
const { Title } = Typography;

const AccountPage = () => {

    return (
        <div className="bg-custom p-4 pt-0 flex-1">
            <Title level={4} className="mt-8">
                Account
            </Title>

            <div className="text-center mt-6">
                <Button type="primary" onClick={() => signOut({ callbackUrl: '/login' })}>
                    Logout
                </Button>

            </div>
        </div>
    );
};

export default AccountPage;
