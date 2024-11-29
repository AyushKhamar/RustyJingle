import FeaturedSection from "@/components/ui/FeaturedSection.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import SectionGrid from "@/components/ui/SectionGrid.tsx";
import Topbar from "@/components/ui/TopBar.tsx";
import { useMusicStore } from "@/stores/UseMusicStore.ts";
import { usePlayStore } from "@/stores/usePlayStore.ts";
import React, { useEffect } from "react";

const HomePage = () => {
  const {
    isLoading,
    error,
    trendingSongs,
    madeForYouSongs,
    featuredSongs,
    fetchFeaturedSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs,
  } = useMusicStore();

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        fetchFeaturedSongs(),
        fetchMadeForYouSongs(),
        fetchTrendingSongs(),
      ]);
    };
    fetchData();
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);
  console.log(featuredSongs, madeForYouSongs, trendingSongs);

  const { initialiseQueue } = usePlayStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

  useEffect(() => {
    if (
      madeForYouSongs.length > 0 &&
      featuredSongs.length > 0 &&
      trendingSongs.length > 0
    ) {
      const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];
      initialiseQueue(allSongs);
    }
  }, [initialiseQueue, madeForYouSongs, trendingSongs, featuredSongs]);

  return (
    <>
      <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
        <Topbar />
        <ScrollArea className="h-[calc(100vh-180px)]">
          <div className="p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6">
              Good afternoon
            </h1>
            <FeaturedSection />

            <div className="space-y-8">
              <SectionGrid
                title="Made For You"
                songs={madeForYouSongs}
                isLoading={isLoading}
              />
              <SectionGrid
                title="Trending"
                songs={trendingSongs}
                isLoading={isLoading}
              />
            </div>
          </div>
        </ScrollArea>
      </main>
    </>
  );
};

export default HomePage;
