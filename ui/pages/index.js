import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/channels/UC_hwKJdF3KRAy4QIaiCSMgQ");
  }, []);

  return <div></div>;
}
