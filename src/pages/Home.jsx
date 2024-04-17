import MainMenu from "../components/MainMenu"

import '../globals.css'

export default function Home() {

    return (
        <section className="bg-gold-600 py-3 grid place-items-center h-[100vh]">
            <div className="flex flex-col gap-5 place-items-center h-full">
                <MainMenu />
                <div className="flex flex-col align-middle">
                    <h2 className="text-[1.5em] md:text-[2.5em]">August 24, 2024</h2>
                </div>
                <img className="rounded-full border-8 border-navy-700 h-[10em] md:h-[20em]" src="/img/cover.jpg" />
                <div className="w-1/2 mt-">
                    <p class=" text-black text-[.75em] md:text-[1.25em] text-center">	
                        Family and friends, We hope you will join us for our wedding celebration
                        August 24, 2024 in Mayville, New York at the CHQ Barn.
                    </p>
                    <h5 class="text-center text-[.5em] md:text-[1.25em] text-black">
                        ♥️ Ryan & Heather ♥️
                    </h5> 
                </div>
            </div>
        </section>
    )
}