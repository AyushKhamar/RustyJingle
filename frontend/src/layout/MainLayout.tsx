import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable.tsx";
import React from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./LeftSidebar.tsx";
import FriendsActivity from "./FriendsActivity.tsx";
const MainLayout = () => {
  const isMobile = false;
  return (
    <div className="h-screen bg-black flex flex-col text-white">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1 flex overflow-hidden h-full p-2"
      >
        <ResizablePanel
          defaultSize={20}
          minSize={isMobile ? 0 : 10}
          maxSize={30}
        >
          <LeftSidebar />
        </ResizablePanel>
        <ResizableHandle className="w-2 bg-black transition-colors rounded-lg" />
        <ResizablePanel
          defaultSize={isMobile ? 80 : 60}
          //todo Now, Since we have added an element inside of this in the routes part, where and how to render that nested element ? Its with the outlet component. It will render the nested component in routes as it is from react router dom
        >
          <Outlet />
        </ResizablePanel>
        <ResizableHandle className="w-2 bg-black transition-colors rounded-lg" />

        <ResizablePanel
          defaultSize={20}
          minSize={0}
          maxSize={25}
          collapsedSize={0}
        >
          <FriendsActivity />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MainLayout;
