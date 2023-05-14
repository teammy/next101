import { useSession,signOut } from "next-auth/react";
import Link from "next/link";
import Router from "next/router";
import { useEffect } from "react";

function SecretPage() {
  const { data } = useSession(); 
  
  useEffect(() => {
    if (data===null) {
      Router.push("/login");
    }
  }, [data]);

  return (
    <div>
      Secret Page
      <p onClick={()=>signOut({callbackUr:'/login'})}>
        ออกจากระบบ
      </p>
    </div> 
  );
}

export default SecretPage;