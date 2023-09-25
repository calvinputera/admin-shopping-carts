import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Admin Dashboard",
	description: "Products and Carts",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="dark">
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
