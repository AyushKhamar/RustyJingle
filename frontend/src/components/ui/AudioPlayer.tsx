import { usePlayStore } from "@/stores/usePlayStore.ts";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  //todo to play audio we need the html audio element. It doesnt matter where we put it because it wont take up any space for the same.
  const audioRef = useRef<HTMLAudioElement>(null);
  //todo this ref means that I can control the referenced elements functions, manipulate it from this particular variable however I want.
  const prevSongRef = useRef<string | null>(null);
  const { currentSong, isPlaying, playNext } = usePlayStore();

  //play pause of the song in general
  useEffect(() => {
    if (isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [isPlaying]);

  //next track
  useEffect(() => {
    const audio = audioRef.current;
    const handleAudioEnd = () => {
      playNext();
    };
    audio?.addEventListener("ended", handleAudioEnd);
    //todo imp concept, if i return it normally, the event li stener is removed right away in the use effect hook, thus it is never active however because I return a function this cleanup function will be executed when the component is unmounted/when the hoook runs again and because of that the listener remains active all the time in between. if i return it right away then the album wont play next songs.
    return () => audio?.removeEventListener("ended", handleAudioEnd);
  }, [playNext]);

  //user operated next/prev/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;
    //check if its a new song
    const isSongChange = prevSongRef.current !== currentSong?.audioURL;
    if (isSongChange) {
      audio.src = currentSong?.audioURL;
      audio.currentTime = 0;
      prevSongRef.current = currentSong?.audioURL;
      if (isPlaying) audio.play();
    }
  }, [currentSong, isPlaying]);

  return <audio ref={audioRef} />;
};

export default AudioPlayer;
