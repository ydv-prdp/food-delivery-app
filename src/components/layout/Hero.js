import Image from "next/image";
import Right from "../icons/Right";

export default function Hero(){
    return (
        <section className="hero">
            <div className="py-16">
                <h1 className="text-4xl font-semibold leading-normal">Everything <br/> is better <br/> with a&nbsp;<span className="text-primary">Pizza</span></h1>
                <p className="my-4 text-gray-500">
                    Pizza is the missing piece that makes every day complete, a simple yet delicious joy in life
                </p>
                <div className="flex gap-4 py-2 items-center text-sm">
                    <button className="bg-primary uppercase flex items-center gap-2 text-white  text-sm px-4 py-2 rounded-full">Order now <Right/></button>
                    <button className="flex gap-2 text-gray-600 font-semibold items-center">Learn more <Right/></button>
                </div>
            </div>
            <div className="relative">
                <Image src={'/pizza.png'} objectFit={'contain'} alt={'pizza'} layout={'fill'} />
            </div>
        </section>
    );
}