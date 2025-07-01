import { useEffect } from "react";

function Home() {
  useEffect(() => {
    console.log("페이지 로딩")
  }, [])

  return <div className="threadContainer">

  </div>;
}

export default Home;