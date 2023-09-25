"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import SideNav from "./components/SideNav";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Input,
	Button,
	Select,
	SelectItem,
} from "@nextui-org/react";
import { BiSearch } from "react-icons/bi";

const MyTable = () => {
	const [products, setProducts] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const [category, setCategory] = useState([]);
	const [nameCategory, setNameCategory] = useState("");
	const [brandCategory, setBrandCategory] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;
	const totalPages = Math.ceil(products.length / itemsPerPage);

	const columns = [
		{
			key: "name",
			label: "PRODUCT NAME",
		},
		{
			key: "brand",
			label: "BRAND",
		},
		{
			key: "price",
			label: "PRICE",
		},
		{
			key: "stock",
			label: "STOCK",
		},
		{
			key: "category",
			label: "CATEGORY",
		},
	];

	useEffect(() => {
		const offset = (currentPage - 1) * itemsPerPage;
		axios
			.get(
				`https://dummyjson.com/products?limit=${itemsPerPage}&skip=${offset}&select=title,price,stock,category,brand`
			)
			.then((resp) => {
				// console.log(resp.data.products);
				setProducts(resp.data.products);
			})
			.catch((err) => console.log(err));
	}, [currentPage]);

	useEffect(() => {
		axios
			.get("https://dummyjson.com/products/categories")
			.then((resp) => {
				// console.log(resp.data);
				setCategory(resp.data);
			})
			.catch((err) => console.log(err));
	}, []);

	const search = () => {
		axios
			.get(`https://dummyjson.com/products/search?q=${searchInput}`)
			.then((resp) => {
				// console.log(resp.data.products);
				setProducts(resp.data.products);
			})
			.catch((err) => console.log(err));
	};

	const handleKeyPress = (e) => {
		if (e.keyCode === 13 || e.which === 13) {
			search();
		}
	};

	const filterNameCategory = () => {
		axios
			.get(`https://dummyjson.com/products/category/${nameCategory}`)
			.then((resp) => {
				// console.log(resp.data.products);
				setProducts(resp.data.products);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		filterNameCategory();
		// console.log(nameCategory);
	}, [nameCategory]);

	return (
		<div className="md:flex md:justify-between h-full">
			<SideNav />
			<div className="p-10 flex flex-col gap-8 w-full mt-14 md:mt-0">
				<div className="flex md:flex-wrap gap-3 md:justify-end">
					<Input
						onKeyPress={handleKeyPress}
						className="md:w-48 rounded-sm"
						size="lg"
						type="text"
						placeholder="Search.."
						labelPlacement="outside"
						onChange={(e) => setSearchInput(e.target.value)}
						endContent={
							<BiSearch size={20} className="cursor-pointer" onClick={search} />
						}
					/>
					<Select
						aria-label="Select Category"
						placeholder="Category"
						className="md:w-48 w-full"
						size="sm"
						onChange={(e) => setNameCategory(e.target.value)}
					>
						{category.map((item) => (
							<SelectItem key={item} value={item}>
								{item}
							</SelectItem>
						))}
					</Select>
				</div>

				<Table aria-label="Products Table">
					<TableHeader>
						{columns.map((item) => (
							<TableColumn key={item.key}>{item.label}</TableColumn>
						))}
					</TableHeader>
					{products.length === 0 ? (
						<TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
					) : (
						<TableBody>
							{products.map((item) => (
								<TableRow key={item.id}>
									<TableCell>{item.title}</TableCell>
									<TableCell>{item.brand}</TableCell>
									<TableCell>$ {item.price}</TableCell>
									<TableCell>{item.stock}</TableCell>
									<TableCell>{item.category}</TableCell>
								</TableRow>
							))}
						</TableBody>
					)}
				</Table>
				<div className="flex justify-end gap-5">
					<Button
						onClick={() => setCurrentPage(currentPage - 1)}
						variant={currentPage === 1 ? "bordered" : "solid"}
						disabled={currentPage === 1}
					>
						Previous
					</Button>
					<Button
						onClick={() => setCurrentPage(currentPage + 1)}
						variant={products.length === 0 ? "bordered" : "solid"}
						disabled={products.length === 0}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
};

export default MyTable;
