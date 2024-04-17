import '../globals.css'
import MainMenu from '../components/MainMenu'
import Container from '../components/Container'


export default function LocationPage() {
    return (
        <main className="bg-gold-500 text-black">
            <div className="mx-auto w-[1/2]">
            <MainMenu />
            </div>
            <section className="flex flex-col gap-1 place-items-center">
                <div className="mt-[2em] flex flex-col p-2">
                    <img className="h-[300px] w-auto sm:h-[30em] sm:w-[700px] border-spacing-3 border border-navy-500 rounded-t-lg" src="/img/barn.webp" />
                    <article className="bg-white p-4 rounded-b-lg flex flex-col border-navy-500 border border-spacing-3 gap-2">
                        <h1>Ceremony & Reception</h1>
                        <p>Location: Chautauqua Barn</p>
                        <p>Date: August 24, 2024 @4:00PM</p>
                        <p>Address: 4324 Chautauqua-Stedman Rd, Mayville, NY 14757</p>
                        <a href="https://www.chqbarn.com/" className="bg-navy-500 text-white py-1 hover:bg-navy-400 rounded-md">More Information</a>
                        <sub>Note: Follow the signs when you get there</sub>
                    </article>
                </div>
                <iframe className=" border border-spacing-3 border-navy-500 rounded-lg lg:px-0 mb-[2em] w-[350px] h-[300px] md:w-[500px] md:h-[400px] lg:w-[700px] lg:h-[500px]" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2956.193292605415!2d-79.4798316235038!3d42.18893444589515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882d514bcf2f2a1f%3A0xbb5301c93e48dff9!2sCHQ%20Barn!5e0!3m2!1sen!2sus!4v1713369674278!5m2!1sen!2sus" allowFullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </section>
        </main>
    )
}