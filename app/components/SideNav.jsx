import Link from "next/link";

const SideNav = () => {
	return (
		<nav className="p-5 bg-[#27272a] flex gap-5 fixed top-0 md:relative md:w-80 md:z-0 md:flex-col md:h-auto w-full shadow-md z-40">
			<Link href="/">Products</Link>
			<Link href="/carts">Carts</Link>
		</nav>
	);
};

export default SideNav;
