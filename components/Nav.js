import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import ThemeChangerButton from "./ThemeChangerButton";
import { useStateContext } from "../context/context";
import { useSession, signIn, signOut } from "next-auth/react";
export default function Nav() {
	const { data: session } = useSession();
	const router = useRouter();
	const { loginPopOpen, setLoginPopOpen } = useStateContext();
	const [menuIsOpen, setMenuIsOpen] = useState(false);

	const [scrollY, setScrollY] = useState(0);
	const loginPop = {
		initial: {
			x: 120,
			y: -35,
			opacity: 0,
			scale: 0,
			transition: {
				duration: 0.1,
				type: "spring",
				damping: 20,
				stiffness: 100,
			},
		},
		animate: {
			x: 0,
			y: 0,
			scale: 1,
			opacity: 1,
			transition: {
				duration: 0.1,
				type: "spring",
				damping: 20,
				stiffness: 100,
			},
		},
	};

	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY);
		};

		handleScroll();

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);
	console.log(session);
	return (
		<nav
			className={`flex  items-center fixed text-white top-0 py-2 left-0 right-0 z-20 px-[1rem] lg:px-[5rem]   transition-colors duration-300  ease-in-out ${
				scrollY > 500 ? "text-white bg-[#000000]" : ""
			} justify-between ${router.route !== "/" ? "bg-black" : ""}`}
		>
			<div
				className={`fixed overflow-hidden lg:hidden left-0 right-0 bg-black -z-10 bottom-[35rem] transition-all duration-300 ease-in-out ${
					menuIsOpen ? "top-[0%]" : "top-[50%]"
				}`}
			></div>
			<div className="flex items-center gap-16">
				<div className="cursor-pointer ">
					<Link href={"/"}>
						<div className="w-[70px] h-[70px] relative">
							<Image layout="fill" src={"/logo.png"} alt="logo" />
						</div>
					</Link>
				</div>
				<div
					id="linkz"
					className={` fixed flex-col gap-16 leading-[5rem] text-center items-center left-0 right-0 top-20 lg:flex-row lg:flex lg:static bg-black  transition-[bottom] duration-300  overflow-hidden lg:bg-transparent  ${
						menuIsOpen ? "bottom-[0%] " : "bottom-[100%]"
					}`}
				>
					<div className="cursor-pointer ">
						<Link href={"/"}>
							<p>Home </p>
						</Link>
					</div>
					<div className="cursor-pointer ">
						<Link href={"/"}>
							<p>Movies</p>
						</Link>
					</div>
					<div className="cursor-pointer ">
						<Link href={"/"}>
							<p>Schedule</p>
						</Link>
					</div>
					<div className="cursor-pointer ">
						<Link href={"/"}>
							<p>Promos</p>
						</Link>
					</div>
				</div>
			</div>

			{/* <form action="" className="hidden lg:block ">
				<div className="relative w-full h-full">
					<input
						type="text"
						className="h-7 w-[15rem] py-1 pl-3 pr-7 rounded-xl text-black"
					/>
					<div className="absolute text-black top-1.5 right-2">
						<AiOutlineSearch />
					</div>
				</div>
			</form> */}

			<div className="items-center hidden gap-10 lg:flex">
				{/* <div className="w-[30px] h-[30px] bg-white rounded-full"></div>
				<div className="">John Doe</div> */}
				<div className="relative">
					{session ? (
						<div
							className="flex gap-2 transition duration-300 cursor-pointer hover:opacity-80"
							onClick={() => setLoginPopOpen(!loginPopOpen)}
						>
							<div className="relative w-6 h-6 rounded-[50%] overflow-hidden ">
								<Image
									src={session.user.image}
									layout="fill"
									alt="user_image"
								/>
							</div>
							<p>{session.user.name.split(" ")[0]}</p>
						</div>
					) : (
						<p
							className="transition duration-300 cursor-pointer hover:opacity-80 "
							onClick={() => signIn()}
						>
							Login
						</p>
					)}
				</div>
				<ThemeChangerButton />
			</div>
			<div className="flex gap-3 text-3xl cursor-pointer lg:hidden">
				<div className="text-sm">
					<ThemeChangerButton />
				</div>
				<div className="" onClick={() => setMenuIsOpen(!menuIsOpen)}>
					{!menuIsOpen && (
						<motion.div
							initial={{ scale: 0.3 }}
							animate={{ scale: 1 }}
							className=""
						>
							<HiMenuAlt3 />
						</motion.div>
					)}
					{menuIsOpen && (
						<motion.div
							initial={{ scale: 0.3 }}
							animate={{ scale: 1 }}
							className=""
						>
							<CgClose />
						</motion.div>
					)}
				</div>
			</div>
		</nav>
	);
}
