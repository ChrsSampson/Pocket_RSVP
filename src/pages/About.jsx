import MainMenu from '../components/MainMenu';
import '../globals.css';
import Container from '../components/Container';
import Divider from '../components/Divider';
import { useState } from 'react';
import Link from '../components/Link';

export default function AboutPage() {
    const [expand, setExpand] = useState(false);

    return (
        <main className="flex flex-col text-black place-items-center py-4 bg-gradient-to-t from-navy-500 to-white">
            <MainMenu />

            <section className="max-w-[90%] md:max-w-[80%] lg:min-w-[50%] pt-5 py-4">
                <Container>
                    <div className="flex justify-between place-items-center gap-10">
                        <button
                            onClick={() => setExpand(!expand)}
                            id="table-btn"
                            className="px-5 py-4 bg-navy-500 hover:cursor-pointer text-white rounded-md"
                        >
                            ✚
                        </button>
                        <h1>Table of Contents</h1>
                    </div>
                    {expand && (
                        <div className=" min-w-[50%]" id="table-container">
                            <Divider />
                            <div
                                id="table"
                                className="flex text-2xl flex-col text-left gap-6 md:min-w-[40%] lg:min-w-[50%]"
                            >
                                <Link to="#plan">Agenda</Link>
                                <Link to="#food">Food</Link>
                                <Link to="#dress">Dress Code</Link>
                                <Link to="#hotels">Hotels</Link>
                                <Link to="#registry">Registry</Link>
                            </div>
                        </div>
                    )}
                </Container>
            </section>

            <section className="flex flex-col place-items-center gap-4 max-w-[90%] md:max-w-[80%] lg:max-w-[50%]">
                <Container id="plan">
                    <h1 className="text-2xl">Agenda</h1>
                    <h3 className="text-xl  ">August 24, 2024</h3>
                    <Divider />
                    <ul className="flex flex-col md:text-xl text-left gap-4  md:w-[40%] lg:w-[50%]">
                        <li>
                            4:00PM - Ceremony{' '}
                            <a
                                className="hover:underline hover:bg-green-600 hover:text-white rounded-md  px-1 py-1"
                                href="/location"
                            >
                                @ChautBarn
                            </a>
                        </li>
                        <li>4:30PM - Cocktail Hour</li>
                        <li>5:30PM - First Dance</li>
                        <li>6:00PM - Dinner is Served</li>
                        <li>9:00PM - 🌮 Tacoooooo bar</li>
                        <li>10:00PM - Closing Time</li>
                    </ul>
                </Container>
                <Container id="food">
                    <h1 className="text-2xl">Food</h1>
                    <Divider />
                    <div className="md:text-xl max-w-[75%] flex flex-col gap-2">
                        <div className="border rounded-md">
                            <h3 className="text-[1.2em] underline">Entrees</h3>
                            <div className="flex flex-col">
                                <p>Prime Rib</p>
                                <p>Italian Roasted Chicken</p>
                                <p>Maple Glazed Salmon</p>
                            </div>
                        </div>
                        <div className="border rounded-md">
                            <h3 className="text-[1.2em] underline">Sides</h3>
                            <div className="flex flex-col p-2">
                                <p>Garden Salad with dressing</p>
                                <p className="">
                                    Baby Roasted Potatoes, Grilled Seasonal
                                    Vegatables, Dinner Rolls
                                </p>
                            </div>
                        </div>
                        <div className="text-center">
                            <sub>*Gluten free options will be availible</sub>
                        </div>
                    </div>
                </Container>
                <Container id="dress">
                    <h1 className="text-2xl">Dress Code</h1>
                    <Divider />
                    <p className="md:text-xl max-w-[70%]">
                        Dress code for the event is Formal/Bussiness attire. The
                        wedding party will be wearing navy and champagne. We
                        would appriciate it if you would not wear those colors
                        if you have not been instructed to.
                    </p>
                    <div className="flex justify-center gap-5 py-5">
                        <div className="flex gap-1 place-items-center">
                            <div className="h-8 w-8 rounded-md bg-navy-500"></div>
                            <span>Navy</span>
                        </div>
                        <div className="flex gap-1 place-items-center">
                            <div className="h-8 w-8 rounded-md bg-gold-500"></div>
                            <span>Champagne</span>
                        </div>
                    </div>
                </Container>
                <Container>
                    <h1 className="text-xl">Hotels</h1>
                    <Divider />
                    <p>Some hotels that we recommned:</p>
                    <div>
                        <div>
                            <a href="https://chautauquasuites.com/">
                                <h3 className="text-[1.25em] text-white bg-navy-500 rounded-sm hover:bg-navy-300 px-[.5em] py-[.25em]">
                                    Chautauqua Suites
                                </h3>
                            </a>
                        </div>
                        <div className="flex my-2 flex-col sm:flex-row gap-2 justify-center">
                            <a href="https://www.hilton.com/en/hotels/jhwnkhx-hampton-suites-jamestown/">
                                <h3 className="text-[1.25em] text-white bg-navy-500 rounded-sm hover:bg-navy-300 px-[.5em] py-[.25em]">
                                    Hampton Inn (Jamestown)
                                </h3>
                            </a>
                            <a href="https://www.pknpk.com/">
                                <h3 className="text-[1.25em] text-white bg-navy-500 hover:bg-navy-300 rounded-sm px-[.5em] py-[.25em]">
                                    Peak'n Peak
                                </h3>
                            </a>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 justify-center">
                            <a href="https://www.hilton.com/en/hotels/jhwdtdt-doubletree-jamestown/">
                                <h3 className="text-[1.25em] text-white bg-navy-500 hover:bg-navy-300 rounded-sm px-[.5em] py-[.25em]">
                                    Double Tree
                                </h3>
                            </a>
                            <a href="https://www.thechautauquaharborhotel.com">
                                <h3 className="text-[1.25em] text-white bg-navy-500 hover:bg-navy-300 rounded-sm px-[.5em] py-[.25em]">
                                    Chautauqua Harbor Hotel
                                </h3>
                            </a>
                        </div>
                    </div>
                </Container>
                <Container>
                    <h1 className="text-xl">Registry</h1>
                    <Divider />
                    <div className="mb-[1em]">
                        <div className="border-spacing-1 border rounded-md p-[1em] mb-[2em]">
                            <p className="pb-[1em]">Hello Family & Friends!</p>
                            <p className="px-[4em] text-left mb-[1em] indent-8 leading-7">
                                We know this might not be the most traditional
                                way but having you there on our special day is
                                already the best gift we could ask for. If you
                                do wish to bless us with a gift for our wedding,
                                we would greatly appreciate contributions to
                                help us make the best memories during our
                                upcoming honeymoon or for our future home
                                together.
                            </p>
                            <p className="px-[4em] text-left mb-[1em] indent-8 leading-7">
                                A QRcode will be listed below to scan if you
                                wish to send us a small gift to celebrate. A
                                link to our amazon registry is also available.
                                All gifts will be greatly appreciated! <br />
                                Thank you!
                            </p>
                            <p>Ryan & Heather</p>
                        </div>
                        <a
                            className="text-[1.5em] hover:underline hover:bg-navy-300 bg-navy-500 rounded-sm text-white px-[.5em] py-[.25em]"
                            href="https://amazon.com/wedding/registry/19BN66YELEG4H"
                        >
                            Wedding Registry
                        </a>
                    </div>
                    <div className="hover:border rounded-md px-2">
                        <span className="text-[1.25em]">Venmo</span>
                        <a href="https://venmo.com/u/heather-sampson-10">
                            <img className="h-[10em]" src="/img/venmo_qr.png" />
                        </a>
                    </div>
                </Container>
            </section>
        </main>
    );
}
