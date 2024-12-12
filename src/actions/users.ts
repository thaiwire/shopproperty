import prisma from "@/config/db";
import { currentUser } from "@clerk/nextjs/server";

export const GetCurrentUserFromMongoDB = async () => {
  try {
    // check if the user is already with clerk userid property
    const clerkUser = await currentUser();
    let mongoUser = null;
    mongoUser = await prisma.user.findUnique({
      where: {
        clerkUserId: clerkUser?.id ?? "",
      },
    });
    if (mongoUser) {
      return {
        data: mongoUser,
      };
    }

    // if the user is not found in the database, create a new user
    let username = clerkUser?.username;
    if (!username) {
      username = clerkUser?.firstName + " " + clerkUser?.lastName;
    }
    const newUser: any = {
      clerkUserId: clerkUser?.id,
      username,
      email: clerkUser?.emailAddresses[0].emailAddress,
      profilePic: clerkUser?.imageUrl,
    };
    const result = await prisma.user.create({
      data: newUser,
    });
    return {
      data: result,
    };
  } catch (error: any) {
    return error.message;
  }
};
