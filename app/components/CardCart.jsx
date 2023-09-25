import React from "react";

const CardCart = ({ index, user, quantity, amount, discount }) => {
	return (
		<div className="mb-8">
			<h1 className="text-lg font-semibold">Carts {index}</h1>
			<div className="mt-8 flex flex-col gap-2">
				<h2>Details</h2>
				<div className="bg-[#27272a] w-full p-8 rounded-lg flex flex-col gap-3 md:flex-row md:justify-between">
					<div className="md:w-1/2 flex flex-col gap-3 md:gap-5">
						<p>User ID: {user}</p>
						<p># of Items: {quantity}</p>
					</div>
					<div className="md:w-1/2 flex flex-col gap-3 md:gap-5">
						<p>Total Discounted: $ {discount}</p>
						<p>
							Total Amount: ${" "}
							<span className="text-lg font-bold">{amount}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardCart;
