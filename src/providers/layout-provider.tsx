"use client";
import React, { useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import { Button, Dropdown, message } from "antd";
import { GetCurrentUserFromMongoDB } from "@/actions/users";
import { currentUser } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import Loader from "@/components/loader";

const userMenu = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Properties",
    path: "/user/properties",
  },
  {
    name: "Account",
    path: "/user/account",
  },
  {
    name: "Subscriptions",
    path: "/user/subscriptions",
  },
];
const adminMenu = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Properties",
    path: "/admin/properties",
  },
  {
    name: "Users",
    path: "/admin/users",
  },
];

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [menuToShow, setMenuToShow] = React.useState<any>(userMenu); // userMenu or adminMenu
  const [currentUserData, setCurrentUserData] = React.useState<User | null>(
    null
  );
  const [loading = false, setLoading] = React.useState<boolean>(false);

  const pathname = usePathname();
  const isPublicRoute = ["/sign-in", "/sign-up"].includes(
    pathname.split("/")[1]
  );

  const getHeader = () => {
    console.log("currentUserData", currentUserData);
    console.log("isPublicRoute", isPublicRoute);
    if (isPublicRoute) return null;
    return (
      <div className="lg:px-20 px-5">
        <div className="bg-primary p-3 flex justify-between items-center rounded-b">
          <h1 className="text-2xl text-white font-bold">Shey Properties</h1>
          <div className="bg-white py-2 px-5 rounded-sm">
            {/* <span className="mr-3">{currentUserData?.username}</span> */}
            <Dropdown
              menu={{
                items: menuToShow.map((item: any) => ({
                  label: item.name,
                  onClick: () => {
                    router.push(item.path);
                  },
                })),
              }}
            >
              {/* <Button type="link">{currentUserData?.username}</Button> */}
              <Button className="text-primary hover:text-primary" type="link">
                jaruwat.twp
              </Button>
            </Dropdown>
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </div>
      </div>
    );
  };
  const getContent = () => {
    if (isPublicRoute) return children;
    if (loading) return <Loader />;
    return <div className="p-5 lg:px-20 px-5">{children}</div>;
  };

  const getCurrentUser = async () => {
    try {
      setLoading(true);
      //const response = await GetCurrentUserFromMongoDB();
      // const response = await currentUser();
      // if (!response) throw new Error("Failed to fetch current user");
      // // if (response.error) throw new Error(response.error.message);
      const response: any = {
        id: "1",
        username: "twp.Jruwat",
        email: "jruwat@sheyproperties",
        profilePic: "https://avatars.githubusercontent.com/u/77449506?v=4",
        isAdmin: false,
        isActive: true,
        clerkUserId: "clerkUserId",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setCurrentUserData(response.data);
      // console.log("response", response.data.isAdmin);
      // if (response.data.isAdmin)
      //setMenuToShow(adminMenu);
      setMenuToShow(userMenu);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isPublicRoute) getCurrentUser();
  }, []);

  return (
    <div>
      {loading && <Loader />}
      {getHeader()}
      {getContent()}
    </div>
  );
}

export default LayoutProvider;
