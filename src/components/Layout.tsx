import {
  CalendarBlank,
  HouseSimple,
  MicrophoneStage,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import Head from "next/head";

const menuItems = [
  { title: "Home", icon: HouseSimple, link: "/" },
  { title: "Kits", icon: MicrophoneStage, link: "/kits" },
  { title: "Agenda", icon: CalendarBlank, link: "/agenda" },
];

function Layout({
  submenu = false,
  title = "Coral Jovem de Londrina",
  children,
}: {
  submenu?: boolean;
  title?: string;
  children: ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[url(/images/coral.webp)] bg-no-repeat bg-cover bg-center">
      <Head>
        <title>{title}</title>
      </Head>
      <div className="bg-black/60 h-screen flex justify-center items-center">
        <div className="max-w-3xl h-screen container">
          <div className="w-full h-full p-5 flex flex-col items-center gap-5">
            <header className="w-full flex justify-center">
              <Link href="/">
                <Image
                  src={
                    submenu ? "/images/logo-branca.webp" : "/images/logo.webp"
                  }
                  alt="Logo do Coral Jovem de Londrina"
                  className="w-auto"
                  style={{ height: submenu ? "28px" : "44px" }}
                  width={submenu ? "78" : "107"}
                  height={submenu ? "28" : "44"}
                />
              </Link>
            </header>

            <main className="flex-1 w-full flex overflow-auto">{children}</main>

            {!submenu && (
              <footer className="fixed bottom-6 w-3/4 md:w-1/2 z-50 bg-gray-900 rounded-3xl flex">
                {menuItems.map((item) => {
                  const IconComponent = item.icon;

                  return (
                    <Link
                      key={item.link}
                      href={item.link}
                      className={`w-full flex flex-col items-center justify-items-center gap-1 px-4 py-3 ${
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
              </footer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
