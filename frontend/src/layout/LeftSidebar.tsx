import { buttonVariants } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";
import { SignedIn } from "@clerk/clerk-react";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { HomeIcon, Library, MessageCircleIcon } from "lucide-react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PlayListSkeleton from "@/components/ui/PlayListSkeleton.tsx";
import { useMusicStore } from "@/stores/UseMusicStore.ts";

const LeftSidebar = () => {
  const { isLoading, albums, fetchAlbums } = useMusicStore();

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);
  console.log({ albums });
  return (
    <div className="h-full flex flex-col gap-2">
      <div className="rounded-lg bg-zinc-900 p-4">
        <div className="space-y-2">
          <Link
            to={"/"}
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-center text-white hover:bg-zinc-800",
              })
            )}
          >
            <HomeIcon className="mr-2 size-5" />
            <span className="hidden md:inline">Home</span>
          </Link>
          <SignedIn>
            <Link
              to={"/chat"}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className:
                    "w-full justify-center text-white hover:bg-zinc-800",
                })
              )}
            >
              <MessageCircleIcon className="mr-2 size-5" />
              <span className="hidden md:inline">Messages</span>
            </Link>
          </SignedIn>
        </div>
      </div>
      <div className="rounded-lg flex-1 bg-zinc-900 p-4">
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center px-2 text-white">
            <Library className="mr-2 size-5" />
            <span className="hidden md:inline">Library</span>
          </div>
        </div>
        <ScrollArea className="p-4 rounded-lg h-[calc(100vh-300px)]">
          <div className="space-y-4">
            {isLoading ? (
              <PlayListSkeleton />
            ) : (
              albums.map((album) => {
                return (
                  <Link
                    to={`/albums/${album._id}`}
                    key={album._id}
                    className="p-2 rounded-lg cursor-pointer hover:bg-zinc-800 flex items-center gap-3 group"
                  >
                    <img
                      src={album.imageURL}
                      alt="image"
                      className="size-12 rounded-lg flex-shrink-0 object-cover"
                    />
                    <div className="flex-1 min-w-0 hidden md:block">
                      <p className="font-medium truncate">{album.title}</p>
                      <p className="text-sm text-zinc-400 truncate">
                        {album.title + " - " + album.artist}
                      </p>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSidebar;
