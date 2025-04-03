import {
  CalendarBlank,
  HouseSimple,
  MicrophoneStage,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

const menuItens = [
  { title: "Home", icon: HouseSimple, link: "/" },
  { title: "Kits", icon: MicrophoneStage, link: "/kits" },
  { title: "Agenda", icon: CalendarBlank, link: "/agenda" },
];

function Layout({
  submenu = false,
  children,
}: {
  submenu?: boolean;
  children: ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="h-screen bg-[url(/images/coral.png)] bg-no-repeat bg-cover bg-center">
      <div className="bg-black/60 h-full flex justify-center items-center">
        <div className="container h-full p-[20px] flex flex-col items-center gap-[20px]">
          <div className="w-full flex justify-center">
            <Link href="/">
              <Image
                src={submenu ? "/images/logo-branca.png" : "/images/logo.png"}
                alt="Logo do Coral Jovem de Londrina"
                className="w-auto"
                style={{ height: submenu ? "28px" : "44px" }}
                width={submenu ? "78" : "107"}
                height={submenu ? "28" : "44"}
              />
            </Link>
          </div>

          <div className="flex-1 w-full h-full">{children}</div>

          {!submenu && (
            <div className="flex w-full bg-gray-900 rounded-3xl">
              {menuItens.map((item) => {
                const IconComponent = item.icon;

                return (
                  <Link
                    key={item.link}
                    href={item.link}
                    className={`w-full flex flex-col items-center justify-items-center gap-[4px] px-[16px] py-[10px] ${
                      router.pathname === item.link ? "active" : ""
                    }`}
                  >
                    <IconComponent
                      weight={
                        router.pathname === item.link ? "fill" : "regular"
                      }
                      size={24}
                    />
                    <p
                      className={
                        router.pathname === item.link ? "font-bold" : ""
                      }
                    >
                      {item.title}
                    </p>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Layout;
