import { BiChevronUp } from "react-icons/bi";

const ButtonBackToTop = ({ toTop }) => {
	return (
		<div
			className="fixed bottom-10 right-5 p-5 rounded-full bg-[#27272a] border border-[#303034] shadow-2xl hover:bg-[#353538] duration-100 cursor-pointer"
			onClick={toTop}
		>
			<BiChevronUp size={40} color="#ffffff" />
		</div>
	);
};

export default ButtonBackToTop;
