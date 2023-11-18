import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeader from "@/components/layout/SectionHeader";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero/>
      <HomeMenu/>
      <section className="text-center my-16">
        <SectionHeader
          subHeader={'Our story'}
          mainHeader={'About us'}
        />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            lorem ipsm lorem ipsmlorem ipsmlorem ipsmlorem ipsmlorem ipsmlorem ipsmlorem ipsmlorem ipsmlorem ipsmlorem ipsm
            lorem ipsmlorem ipsmlorem ipsmlorem ipsmlorem ipsmlorem ipsmlorem ipsm 
          </p>
          <p>
            lorem ipsm lorem ipsmlorem ipsmlorem ipsmlorem ipsmlorem ipsmlorem ipsmlorem ipsmlorem ipsmlorem ipsmlorem ipsm
            lorem ipsmlorem ipsmlorem ipsmlorem ipsmlorem ipsmlorem ipsmlorem ipsm 
          </p>
        </div>
       
      </section>
      <section className="text-center">
        <SectionHeader
          subHeader={'Don\'t hesitate'}
          mainHeader={'Contact us'}
        />
        <div className="mt-8">
          <Link href={'tel:+911234567890'} className="underline text-gray-500">+91 1234567890</Link>
        </div>
      </section>
    </>
  )
}
