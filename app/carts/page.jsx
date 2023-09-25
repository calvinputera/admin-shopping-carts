"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import SideNav from "../components/SideNav";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
} from "@nextui-org/react";
import CardCart from "../components/CardCart";
import ButtonBackToTop from "../components/ButtonBackToTop";

const Carts = () => {
	const [carts, setCarts] = useState([]);
	const [idCart, setIdCart] = useState(0);
	const [userId, setUserId] = useState(0);
	const [quantity, setQuantity] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);
	const [discount, setDiscount] = useState(0);
	const [indexCart, setIndexCart] = useState(0);
	const [showButton, setShowButton] = useState(false);

	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.pageYOffset > 300) {
				setShowButton(true);
			} else {
				setShowButton(false);
			}
		});
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		axios
			.get("https://dummyjson.com/carts")
			.then((resp) => {
				console.log(resp.data.carts.products);
				setCarts(resp.data.carts);
			})
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		axios
			.get(`https://dummyjson.com/carts/${idCart}`)
			.then((resp) => console.log(resp))
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className="md:flex md:justify-between ">
			<SideNav />
			<div className="p-10 flex flex-col w-full mt-14 md:mt-0">
				{userId > 0 && (
					<CardCart
						user={userId}
						quantity={quantity}
						amount={totalPrice}
						discount={discount}
						index={indexCart}
					/>
				)}
				<Table aria-label="Example table with dynamic content">
					<TableHeader>
						<TableColumn>Carts</TableColumn>
						<TableColumn>Products</TableColumn>
						<TableColumn>Total Product</TableColumn>
						<TableColumn>Total Quantity</TableColumn>
						<TableColumn>Total Price</TableColumn>
					</TableHeader>
					<TableBody>
						{carts.map((item, index) => (
							<TableRow
								key={index}
								onClick={() => {
									axios
										.get(`https://dummyjson.com/carts/${item.id}`)
										.then((resp) => {
											// console.log(resp.data);
											setUserId(resp.data.userId);
											setQuantity(resp.data.totalQuantity);
											setTotalPrice(resp.data.total);
											setDiscount(resp.data.discountedTotal);
											setIndexCart(index + 1);
											scrollToTop();
										})
										.catch((err) => console.log(err));
								}}
								key={index}
								className="hover:bg-[#27272a] duration-100 cursor-pointer"
							>
								<TableCell>Carts {index + 1}</TableCell>
								<TableCell>
									{item.products.map((i) => (
										<p>{i.title}</p>
									))}
								</TableCell>
								<TableCell>{item.totalProducts}</TableCell>
								<TableCell>{item.totalQuantity}</TableCell>
								<TableCell>$ {item.total}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			{showButton && <ButtonBackToTop toTop={scrollToTop} />}
		</div>
	);
};

export default Carts;
