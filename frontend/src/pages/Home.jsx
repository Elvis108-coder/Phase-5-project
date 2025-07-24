import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import homepageVideo from "../assets/homepage.mp4";
import perfumeVideo from "../assets/perfumes.mp4";
import hairVideo from "../assets/hair.mp4";
import faceVideo from "../assets/face.mp4";
import bodyVideo from "../assets/body.mp4";
import ArganOil from "../assets/images/ArganOil.jpg"
import GlowBoostMask from "../assets/images/GlowBoostMask.jpg"
import HydratingCream from "../assets/images/HydratingCream.jpg"
import MatteLipstick from "../assets/images/MatteLipstick.jpg"
import ShimmerPallette from "../assets/images/ShimmerPallette.jpg"
import SilkTouch from "../assets/images/SilkTouch.jpg"
import SilkenTouch from "../assets/images/SilkenTouch.jpg"
import VelvetRose from "../assets/images/VelvetRose.jpg"
import VitaminCSerum from "../assets/images/VitaminCSerum.jpg"
import NailPolish from "../assets/images/NailPolish.webp"
import Perfume from "../assets/images/Perfumes.webp"

const Home = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleExplore = () => {
        if (!user) {
            navigate("/login");
        } else {
            console.log("Exploring more features...");
        }
    };

    const [showOffers, setShowOffers] = useState(false);

    const handleClick = () => {
        setShowOffers(!showOffers);
    };


    return (
        <div className="relative w-full h-[500px] bg-fuchsia-50">
            {/* Background Video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
            >
                <source src={homepageVideo} type="video/mp4" />
            </video>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-purple-200 drop-shadow-lg">
                    Afrique Essence
                </h1>
                <p className="mt-4 text-lg md:text-xl text-gray-200">
                    Elevate your glow – where beauty meets luxury.
                </p>
                <button
                    onClick={handleExplore}
                    className="mt-6 px-6 py-2 bg-purple-800 text-white rounded-full hover:bg-violet-800 transition"
                >
                    Explore Now
                </button>
            </div>

            <div className="py-16 bg-white text-gray-700">
                {/* Section Title */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-serif text-purple-800">Meet Our Team</h1>
                    <div className="w-24 h-1 bg-purple-800 mx-auto mt-2 rounded"></div>
                </div>

                {/* Cards */}
                <div className="flex flex-col lg:flex-row flex-wrap justify-center items-center gap-10">
                    {/* Card 1 */}
                    <div className="flex flex-col items-center text-center max-w-sm px-4 w-[250px]">
                        <div className="w-[140px] h-[140px] rounded-full bg-purple-200 flex items-center justify-center">
                            <svg className="w-12 h-12 text-purple-800" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 100 16A8 8 0 008 0z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-garamond mt-4 text-purple-800">Ray</h2>
                        <p className="mt-2"><strong>Manager.</strong><br /> "Leading with style, managing with grace."</p>

                    </div>

                    {/* Card 2 */}
                    <div className="flex flex-col items-center text-center max-w-sm px-4 w-[250px]">
                        <div className="w-[140px] h-[140px] rounded-full bg-purple-200 flex items-center justify-center">
                            <svg className="w-12 h-12 text-purple-800" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 100 16A8 8 0 008 0z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-garamond mt-4 text-purple-800">Milka</h2>
                        <p className="mt-2"><strong>Beautician.</strong><br /> "Creating beauty, enhancing confidence."</p>

                    </div>

                    {/* Card 3 */}
                    <div className="flex flex-col items-center text-center max-w-sm px-4 w-[250px]">
                        <div className="w-[140px] h-[140px] rounded-full bg-purple-200 flex items-center justify-center">
                            <svg className="w-12 h-12 text-purple-800" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 100 16A8 8 0 008 0z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-garamond mt-4 text-purple-800">Elvis</h2>
                        <p className="mt-2"><strong>Sales Associate.</strong><br />"Closing deals with charm and finesse."</p>

                    </div>

                    {/* Card 4 */}
                    <div className="flex flex-col items-center text-center max-w-sm px-4 w-[250px]">
                        <div className="w-[140px] h-[140px] rounded-full bg-purple-200 flex items-center justify-center">
                            <svg className="w-12 h-12 text-purple-800" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 100 16A8 8 0 008 0z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-garamond mt-4 text-purple-800">Natalie</h2>
                        <p className="mt-2"><strong>Front Desk Assistant.</strong><br /> "The face of our salon, welcoming all with a smile."</p>

                    </div>
                </div>
            </div>

            <div className="bg-fuchsia-50 py-20">
                <div className="mb-16">
                    <h1 className="text-3xl md:text-3xl font-serif text-purple-800 text-center">
                        Unwrap Your Glam – Special <strong className="font-bold text-5xl">Offers!!!</strong>  Just for You!
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-20 text-center">
                    {/* Skin Care */}
                    <div
                        onClick={handleClick}
                        className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:scale-110 transition-transform cursor-pointer"
                    >
                        <div className="relative h-60 w-full">
                            <img
                                src="https://media.istockphoto.com/id/1286329777/photo/preparing-self-care-package-seasonal-gift-box-with-plastic-free-zero-waste-cosmetics-products.jpg?s=612x612&amp;w=0&amp;k=20&amp;c=Gf95cjUUALqlYw8KREMw4H0brjGOtjJrl-aIWUn_iQU="
                                className="h-full w-full object-cover"
                                alt="Skincare Offer"
                            />
                            <div className="absolute inset-0 bg-black/30"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h2 className="text-white text-4xl font-serif">Skin Care</h2>
                            </div>
                        </div>

                        {!showOffers ? (
                            <div className="p-6">
                                <h1 className="text-4xl font-bold text-[#4B145B]">
                                    15% off <span className="text-gray-500 font-light text-2xl">(Jul-Sep)</span>
                                </h1>
                                <ul className="mt-6 mb-6 space-y-2 text-2xl text-[#333] font-extralight">
                                    <li>Cerave Hydrating Cream</li>
                                    <li>Garnier Vitamin C Serum</li>
                                    <li>Cerave Face Scrub</li>
                                    <li>Garnier Sunscreen</li>
                                </ul>
                            </div>
                        ) : (
                            <div className="p-6 space-y-4">
                                <h2 className="text-2xl font-semibold text-purple-900">Offers:</h2>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex justify-between">
                                        <span>Cerave Hydrating Cream</span>
                                        <span>
                                            <s className="text-gray-400">KSh 1,200</s> <span className="text-green-600 font-semibold">KSh 1,020</span>
                                        </span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Garnier Vitamin C Serum</span>
                                        <span>
                                            <s className="text-gray-400">KSh 1,800</s> <span className="text-green-600 font-semibold">KSh 1,530</span>
                                        </span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Cerave Face Scrub</span>
                                        <span>
                                            <s className="text-gray-400">KSh 950</s> <span className="text-green-600 font-semibold">KSh 807</span>
                                        </span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Garnier Sunscreen</span>
                                        <span>
                                            <s className="text-gray-400">KSh 1,400</s> <span className="text-green-600 font-semibold">KSh 1,190</span>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                    {/* Hair Care */}
                   
                    <div
                        onClick={handleClick}
                        className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:scale-110 transition-transform cursor-pointer"
                    >
                        <div className="relative h-60 w-full">
                            <img
                                src="https://www.shutterstock.com/image-photo/different-hair-products-towel-brush-260nw-1935530938.jpg"
                                className="h-full w-full object-cover"
                                alt="Hair care offer"
                            />
                            <div className="absolute inset-0 bg-black/30"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h2 className="text-white text-4xl font-serif">Hair Care</h2>
                            </div>
                        </div>

                        {!showOffers ? (
                            <div className="p-6">
                                <h1 className="text-4xl font-bold text-[#4B145B]">
                                    25% off <span className="text-gray-500 font-light text-2xl">(Jul–Sep)</span>
                                </h1>
                                <ul className="mt-6 mb-6 space-y-2 text-2xl text-[#333] font-extralight">
                                    <li>Argan Hair Oil</li>
                                    <li>Hair Sprays</li>
                                    <li>Darling Shampoo</li>
                                    <li>Miadi Hair Treatment</li>
                                </ul>
                            </div>
                        ) : (
                            <div className="p-6 space-y-4">
                                <h2 className="text-2xl font-semibold text-purple-900">Offers:</h2>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex justify-between">
                                        <span>Argan Hair Oil</span>
                                        <span>
                                            <s className="text-gray-400">KSh 6,000</s>{' '}
                                            <span className="text-green-600 font-semibold">KSh 4,500</span>
                                        </span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Hair Sprays</span>
                                        <span>
                                            <s className="text-gray-400">KSh 2,500</s>{' '}
                                            <span className="text-green-600 font-semibold">KSh 1,875</span>
                                        </span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Miadi Hair Treatment</span>
                                        <span>
                                            <s className="text-gray-400">KSh 950</s>{' '}
                                            <span className="text-green-600 font-semibold">KSh 713</span>
                                        </span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Darling Shampoo</span>
                                        <span>
                                            <s className="text-gray-400">KSh 2,200</s>{' '}
                                            <span className="text-green-600 font-semibold">KSh 1,650</span>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                    
                    {/*Fragrance*/}
                    <div
                        onClick={handleClick}
                        className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:scale-110 transition-transform cursor-pointer"
                    >
                        <div className="relative h-60 w-full">
                            <img
                                src={Perfume}
                                className="h-full w-full object-cover"
                                alt="Hair care offer"
                            />
                            <div className="absolute inset-0 bg-black/30"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h2 className="text-white text-4xl font-serif">Fragrance</h2>
                            </div>
                        </div>

                        {!showOffers ? (
                            <div className="p-6">
                                <h1 className="text-4xl font-bold text-[#4B145B]">
                                    5% off <span className="text-gray-500 font-light text-2xl">(Jul–Sep)</span>
                                </h1>
                                <ul className="mt-6 mb-6 space-y-2 text-2xl text-[#333] font-extralight">
                                    <li>Midnight Fantasy</li>
                                    <li>Side Effect</li>
                                    <li>Coco Chanel</li>
                                    <li>One Million</li>
                                </ul>
                            </div>
                        ) : (
                            <div className="p-6 space-y-4">
                                <h2 className="text-2xl font-semibold text-purple-900">Offers:</h2>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex justify-between">
                                        <span>Midnight Fantasy</span>
                                        <span>
                                            <s className="text-gray-400">KSh 7,000</s>{' '}
                                            <span className="text-green-600 font-semibold">KSh 6,650</span>
                                        </span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Side Effect</span>
                                        <span>
                                            <s className="text-gray-400">KSh 10,000</s>{' '}
                                            <span className="text-green-600 font-semibold">KSh 9,500</span>
                                        </span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Coco Chanel</span>
                                        <span>
                                            <s className="text-gray-400">KSh 5,000</s>{' '}
                                            <span className="text-green-600 font-semibold">KSh 4,750</span>
                                        </span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>One Million</span>
                                        <span>
                                            <s className="text-gray-400">KSh 15,000</s>{' '}
                                            <span className="text-green-600 font-semibold">KSh 14,250</span>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>



            {/*Best sellers*/}
            <div className="bg-white py-16">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-serif text-purple-800 mb-4">Best Sellers</h1>
                    <p className="text-gray-600">Explore our top-rated beauty products.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6 bg-white">

                    <div className="bg-white overflow-hidden flex flex-col">
                        <div className="w-full h-[250px] bg-purple-800 flex items-center justify-center text-white text-sm">
                            <img src={ArganOil} alt="Argan Oil" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-xl font-semibold text-purple-800 mb-2">Argan Hair Oil</h2>
                            <p className="text-gray-700 text-sm mb-4">Nourishes and strengthens dry, frizzy hair.</p>
                            <div className="mt-auto flex justify-between items-center">

                                <strong className="text-gray-500 text-xs">⭐⭐⭐⭐✩  5712 reviews</strong>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white overflow-hidden flex flex-col">
                        <div className="w-full h-[250px] bg-purple-800 flex items-center justify-center text-white text-sm">
                            <img src={MatteLipstick} alt="Matte Lipstick" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-xl font-semibold text-purple-800 mb-2">Matte Lipstick</h2>
                            <p className="text-gray-700 text-sm mb-4">Long-lasting, bold color for every occasion.</p>
                            <div className="mt-auto flex justify-between items-center">

                                <strong className="text-gray-500 text-xs">⭐⭐⭐⭐⭐ 8342 reviews</strong>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white overflow-hidden flex flex-col">
                        <div className="w-full h-[250px] bg-purple-800 flex items-center justify-center text-white text-sm">
                            <img src={HydratingCream} alt="hydrating cream" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-xl font-semibold text-purple-800 mb-2">Hydrating Cream</h2>
                            <p className="text-gray-700 text-sm mb-4">Deep moisture for radiant, glowing skin.</p>
                            <div className="mt-auto flex justify-between items-center">

                                <strong className="text-gray-500 text-xs">⭐⭐⭐⭐✩  6787 reviews</strong>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white overflow-hidden flex flex-col">
                        <div className="w-full h-[250px] bg-purple-800 flex items-center justify-center text-white text-sm">
                            <img src={VelvetRose} alt="Velvet Rose Perfume" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-xl font-semibold text-purple-800 mb-2">Velvet Rose</h2>
                            <p className="text-gray-700 text-sm mb-4">Luxury fragrance with hints of jasmine & rose.</p>
                            <div className="mt-auto flex justify-between items-center">

                                <strong className="text-gray-500 text-xs">⭐⭐⭐⭐⭐ 7497 reviews</strong>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden flex flex-col">
                        <div className="w-full h-[250px] bg-purple-800 flex items-center justify-center text-white text-sm">
                            <img src={NailPolish} alt="pink nail polish" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-xl font-semibold text-purple-800 mb-2">Glossy Pink NailPolish</h2>
                            <p className="text-gray-700 text-sm mb-4">Chip-resistant, high-shine nail polish.</p>
                            <div className="mt-auto flex justify-between items-center">

                                <strong className="text-gray-500 text-xs">⭐⭐⭐⭐⭐ 9794 reviews</strong>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white overflow-hidden flex flex-col">
                        <div className="w-full h-[250px] bg-purple-800 flex items-center justify-center text-white text-sm">
                            <img src={SilkTouch} alt="Foundation" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-xl font-semibold text-purple-800 mb-2">Silk Touch</h2>
                            <p className="text-gray-700 text-sm mb-4">Lightweight foundation with full coverage.</p>
                            <div className="mt-auto flex justify-between items-center">

                                <strong className="text-gray-500 text-xs">⭐⭐⭐⭐✩  6787 reviews</strong>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white overflow-hidden flex flex-col">
                        <div className="w-full h-[250px] bg-purple-800 flex items-center justify-center text-white text-sm">
                            <img src={GlowBoostMask} alt="Glow boost mask" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-xl font-semibold text-purple-800 mb-2">Glow Boost Mask</h2>
                            <p className="text-gray-700 text-sm mb-4">Brightens skin and reduces dullness instantly.</p>
                            <div className="mt-auto flex justify-between items-center">

                                <strong className="text-gray-500 text-xs">⭐⭐⭐⭐✩  4569 reviews</strong>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white  overflow-hidden flex flex-col">
                        <div className="w-full h-[250px] bg-purple-800 flex items-center justify-center text-white text-sm">
                            <img src={SilkenTouch} alt="silken touch body lotion" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-xl font-semibold text-purple-800 mb-2">Silken Touch</h2>
                            <p className="text-gray-700 text-sm mb-4">Smooth and soft skin all day long.</p>
                            <div className="mt-auto flex justify-between items-center">

                                <strong className="text-gray-500 text-xs">⭐⭐⭐⭐⭐ 8768 reviews</strong>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white  overflow-hidden flex flex-col">
                        <div className="w-full h-[250px] bg-purple-800 flex items-center justify-center text-white text-sm">
                            <img src={VitaminCSerum} alt="Vitamin C Serum" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-xl font-semibold text-purple-800 mb-2">Vitamin C Serum</h2>
                            <p className="text-gray-700 text-sm mb-4">Brightens skin and reduces fine lines.</p>
                            <div className="mt-auto flex justify-between items-center">

                                <strong className="text-gray-500 text-xs">⭐⭐⭐⭐⭐ 7633 reviews</strong>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white  overflow-hidden flex flex-col">
                        <div className="w-full h-[250px] bg-purple-800 flex items-center justify-center text-white text-sm">
                            <img src={ShimmerPallette} alt="shimmer eyeshadow pallette" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-xl font-semibold text-purple-800 mb-2">Shimmer Palette</h2>
                            <p className="text-gray-700 text-sm mb-4">Blendable shimmer colors for stunning eyes.</p>
                            <div className="mt-auto flex justify-between items-center">

                                <strong className="text-gray-500 text-xs"> ⭐⭐⭐⭐✩  6787 reviews</strong>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/*categories*/}
            <div className="bg-fuchsia-50 py-16 ">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-serif text-purple-800 mb-4">Categories</h1>
                    <p className="text-gray-600">Explore our top-rated beauty products.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 bg-fuchsia-50">
                    {/* Card 1 */}
                    <div className="bg-white shadow-md overflow-hidden flex flex-col">
                        <div className="w-full h-[400px] bg-purple-800 flex items-center justify-center text-white text-sm">
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover"
                            >
                                <source src={hairVideo} type="video/mp4" />
                            </video>
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-2xl font-garamond font-semibold text-purple-800 mb-2 text-center">Hair & Beard</h2>
                            <p className="text-gray-700 text-sm mb-4 text-center">Nourishes and strengthens dry, frizzy hair.</p>
                            <div className="mt-auto flex justify-center items-center">

                                <strong className="text-gray-500 text-xs text-center">Amazing strong and healthy hair</strong>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white shadow-md overflow-hidden flex flex-col">
                        <div className="w-full h-[400px] bg-purple-800 flex items-center justify-center text-white text-sm">
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover"
                            >
                                <source src={faceVideo} type="video/mp4" />
                            </video>
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-2xl font-garamond font-semibold text-purple-800 mb-2 text-center">Face</h2>
                            <p className="text-gray-700 text-sm mb-4 text-center">Long-lasting, bold color for every occasion.</p>
                            <div className="mt-auto flex justify-center items-center">

                                <strong className="text-gray-500 text-xs">Amazing glow and radiance</strong>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white shadow-md overflow-hidden flex flex-col">
                        <div className="w-full h-[400px] bg-purple-800 flex items-center justify-center text-white text-sm">
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover"
                            >
                                <source src={bodyVideo} type="video/mp4" />
                            </video>
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-2xl font-garamond font-semibold text-purple-800 mb-2 text-center">Body</h2>
                            <p className="text-gray-700 text-sm mb-4 text-center">Deep moisture for radiant, glowing skin.</p>
                            <div className="mt-auto flex justify-center items-center">

                                <strong className="text-gray-500 text-xs">Amazing hydration and nourishment</strong>
                            </div>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white shadow-md overflow-hidden flex flex-col">
                        <div className="w-full h-[400px] bg-purple-800 flex items-center justify-center text-white text-sm">
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover"
                            >
                                <source src={perfumeVideo} type="video/mp4" />
                            </video>
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-2xl font-garamond font-semibold text-purple-800 mb-2 text-center">Fragrance</h2>
                            <p className="text-gray-700 text-sm mb-4 text-center">Luxury fragrance with hints of jasmine & rose.</p>
                            <div className="mt-auto flex justify-center items-center">

                                <strong className="text-gray-500 text-xs">Amazing scent and radiance</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*Reviews*/}
            <div className="py-16 bg-white text-gray-700">
                <div className="py-16 px-6 md:px-12 bg-white rounded-3xl">
                    <h2 className="text-5xl font-serif text-purple-700 mb-10 text-center">
                        Success <span className="text-[#706d61]">Metrics</span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {/* Card 1 */}
                        <div className="bg-fuchsia-50 rounded-xl p-6 border border-[#333] text-center shadow-md">
                            <div className="text-black text-5xl mb-4 flex items-center justify-center">
                                {/* <i className="fas fa-certificate"></i> */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-briefcase" viewBox="0 0 16 16">
                                    <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5m1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0M1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5" />
                                </svg>
                            </div>
                            <h4 className="text-black text-sm uppercase tracking-widest mb-1">Years in Business</h4>
                            <p className="text-2xl text-black font-bold">10+</p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-fuchsia-50 rounded-xl p-6 border border-[#333] text-center shadow-md">
                            <div className="text-black text-3xl mb-4 flex items-center justify-center">
                                {/* <i className="fas fa-users"></i> */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                                    <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                                </svg>
                            </div>
                            <h4 className="text-black text-sm uppercase tracking-widest mb-1">Positive Reviews</h4>
                            <p className="text-2xl text-black font-bold">50k+</p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-fuchsia-50 rounded-xl p-6 border border-[#333] text-center shadow-md">
                            <div className="text-black text-3xl mb-4 flex items-center justify-center">
                                {/* <i className="bi bi-gift"></i> */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-gift" viewBox="0 0 16 16">
                                    <path d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 14.5V7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A3 3 0 0 1 3 2.506zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43zM9 3h2.932l.023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0zM1 4v2h6V4zm8 0v2h6V4zm5 3H9v8h4.5a.5.5 0 0 0 .5-.5zm-7 8V7H2v7.5a.5.5 0 0 0 .5.5z" />
                                </svg>
                            </div>
                            <h4 className="text-black text-sm uppercase tracking-widest mb-1">Awards Won</h4>
                            <p className="text-2xl text-black font-bold">5</p>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-fuchsia-50 rounded-xl p-6 border border-[#333] text-center shadow-md">
                            <div className="text-black text-3xl mb-4 flex items-center justify-center">
                                {/* <i className="fas fa-heart"></i> */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-emoji-smile" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5" />
                                </svg>
                            </div>
                            <h4 className="text-black text-sm uppercase tracking-widest mb-1">Happy Clients</h4>
                            <p className="text-2xl text-black font-bold">10k+</p>
                        </div>
                    </div>
                </div>


                {/* Section Title */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-serif text-purple-800">Reviews</h1>
                    <div className="w-24 h-1 bg-purple-800 mx-auto mt-2 rounded"></div>
                </div>

                {/* Cards */}
                <div className="flex flex-col lg:flex-row flex-wrap justify-center items-center gap-10">
                    {/* Card 1 */}
                    <div className="flex flex-col items-center text-center max-w-sm px-4 w-[250px]">
                        <div className="w-[140px] h-[140px] rounded-full bg-purple-200 flex items-center justify-center">
                            <img src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
                                alt="Ray"
                                className="w-full h-full rounded-full object-cover" />
                        </div>
                        <h2 className="text-xl font-semibold mt-4 text-purple-800">Winston</h2>
                        <p className="mt-2"><strong>"Absolutely love it!"</strong> <br />
                            The Argan Hair Oil has completely transformed my hair—it's softer, shinier, and smells amazing. I'll definitely be reordering!
                            <br />— Winston M."</p>

                    </div>

                    {/* Card 2 */}
                    <div className="flex flex-col items-center text-center max-w-sm px-4 w-[250px]">
                        <div className="w-[140px] h-[140px] rounded-full bg-purple-200 flex items-center justify-center">
                            <img src="https://cdn.expertphotography.com/wp-content/uploads/2020/08/social-media-profile-photos.jpg"
                                alt="Milka"
                                className="w-full h-full rounded-full object-cover" />
                        </div>
                        <h2 className="text-xl font-semibold mt-4 text-purple-800">Linda</h2>
                        <p className="mt-2"><strong>"Great but a bit pricey"</strong><br />
                            I adore the Velvet Rose perfume. It lasts all day and I always get compliments. Just wish it was a little more affordable.<br />
                            — Linda K.</p>

                    </div>

                    {/* Card 3 */}
                    <div className="flex flex-col items-center text-center max-w-sm px-4 w-[250px]">
                        <div className="w-[140px] h-[140px] rounded-full bg-purple-200 flex items-center justify-center">
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&amp;q=60&amp;w=3000&amp;ixlib=rb-4.1.0&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
                                alt="Elvis"
                                className="w-full h-full rounded-full object-cover" />
                        </div>
                        <h2 className="text-xl font-semibold mt-4 text-purple-800">Nina</h2>
                        <p className="mt-2"><strong>"Perfect matte finish!"</strong><br />
                            The Matte Lipstick glides on smoothly and stays put all day without drying out my lips. Highly recommend!<br />
                            — Nina N.</p>

                    </div>

                    {/* Card 4 */}
                    <div className="flex flex-col items-center text-center max-w-sm px-4 w-[250px]">
                        <div className="w-[140px] h-[140px] rounded-full bg-purple-200 flex items-center justify-center">
                            <img src="https://images.squarespace-cdn.com/content/v1/5aee389b3c3a531e6245ae76/1628444769450-0AAE0PZIJ0K03LXI66JB/Franklin_Knox_Headshots+%283%29.jpg"
                                alt="Natalie"
                                className="w-full h-full rounded-full object-cover" />
                        </div>
                        <h2 className="text-xl font-semibold mt-4 text-purple-800">Tyrone</h2>
                        <p className="mt-2"><strong>"My skin has never felt better"</strong><br />
                            The Hydrating Cream is my holy grail! I've struggled with dry patches for years, and this gave me glowing skin in just a week.<br />
                            — Tyrone W.</p>

                    </div>
                </div>
            </div>


            {/*location*/}
            <div className="w-full bg-fuchsia-50 py-16">
                <div className="max-w-6xl mx-auto px-6 py-16 bg-fuchsia-50">
                    <h2 className="text-5xl font-serif text-purple-800 mb-10 text-center">Our Location</h2>
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Google Map */}
                        <div className="flex-1 h-[400px] rounded-xl overflow-hidden shadow-lg">
                            <iframe
                                title="shop-location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.093715999743!2d36.8219461!3d-1.2920659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d98a3d4f3d%3A0x5091b41bdf79c2f0!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2ske!4v1629734519384!5m2!1sen!2ske"
                                width="800%"
                                height="100%"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>

                        {/* Contact Info */}
                        <div className="flex-1 bg-purple-50 p-8 rounded-xl shadow-lg space-y-5 ">
                            <h3 className="text-2xl font-semibold text-purple-800">Visit or Contact Us</h3>
                            <p className="text-gray-700">
                                <strong>Address:</strong><br />
                                Afrique Essence Store, Kimathi Street, Nairobi, Kenya
                            </p>
                            <p className="text-gray-700">
                                <strong>Phone:</strong><br />
                                +254 789 767 893
                            </p>
                            <p className="text-gray-700">
                                <strong>Email:</strong><br />
                                contact@afriqueessence.co.ke
                            </p>
                            <p className="text-gray-700">
                                <strong>Opening Hours:</strong><br />
                                Mon – Sat: 9:00 AM – 7:00 PM<br />
                                Sun: Closed
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Home;

