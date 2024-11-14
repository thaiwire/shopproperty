import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const loggedInUser = await currentUser();
  console.log(loggedInUser);
  let username = loggedInUser?.username;
  if (!username) {
    username = loggedInUser?.firstName + " " + loggedInUser?.lastName;
  }

  username = username.replace("null", "");

  return (
    <div className=" flex items-center justify-center flex-col gap-10 h-screen">
      <UserButton afterSignOutUrl="/" />
      <h1>Clerk user id : {loggedInUser?.id}</h1>
      <h1>Username : {username}</h1>
      <h1>email :{loggedInUser?.emailAddresses[0]?.emailAddress}</h1>
    </div>
  );
}
