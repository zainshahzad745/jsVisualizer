import Image from "next/image";
import EventLoop from "./components/EventLoop";
import EventLoopVisualizer from "./components/EventLoopNew";
import EventLoopPage from "./components/EventLoopPage";
export default function Home() {
  return (
    <div>
      {/* <EventLoopPage /> */}
      <EventLoopVisualizer />
    </div>
  );
}
