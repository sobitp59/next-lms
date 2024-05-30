import { Metadata } from "next";

import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard page for the user in the Next.js LMS app created by Denis Tagaev",
};

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>): JSX.Element => {
  return (
    <main className="h-full w-full">
        <nav className="h-[80px] md:pl-52 fixed inset-y-0 w-full z-50">
            <Navbar/>
        </nav>
        <aside className="hidden md:flex h-full w-52 flex-col fixed inset-y-0 z-99">
            <Sidebar/>
        </aside>
        <section className="md:pl-52 pt-[80px] h-full">
            {children}
        </section>
    </main>
  )
}

export default DashboardLayout;