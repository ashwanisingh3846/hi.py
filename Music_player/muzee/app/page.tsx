import Appbar from "./components/Appbar";
import Body from "./components/body";

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-purple-700 to-purple-400 text-white h-screen">
      <Appbar/>
      <Body/>
    </div>
  );
}
