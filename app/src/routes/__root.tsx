import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ChatSidebar } from "@/components/organisms/ChatSidebar";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <Outlet />
      <ChatSidebar />
    </>
  );
}
