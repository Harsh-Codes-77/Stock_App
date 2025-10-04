// import {Button} from "@/components/ui/button";

import Header from "@/components/ui/Header";
import { ReactNode } from "react";

const Layout = ({ children }: { children : ReactNode}) => {
    return (
            <main className="min-h-screen text-gray-400">
                <Header></Header>
                <div className="container py-10">
                    {children}
                </div>
            </main>
    );
};

export default Layout;