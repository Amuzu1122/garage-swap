export default function HowItWorks(){
return(
    <main className="flex-1">
        <section className="px-6 md:px-20 lg:px-40 py-16 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl mt-12">
                <h1 className="text-slate-900 text-5xl md:text-6xl font-black leading-tight tracking-tight mb-6">
                    Giving local items a <span className="text-(--primary)">second life.</span>
                </h1>
                <p className="text-(--text-shade) text-lg md:text-xl font-normal max-w-xl leading-relaxed">
                    GarageSwap is your neighborhood's digital garage sale. Swap, sell, or give away items to people living right next door
                </p>
                <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
                    <button className="bg-(--primary) text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:bg-(--primary/10) transition-all">Start Browsing</button>
                    <button className="bg-(--primary/10) text-(--primary) px-8 py-4 rounded-xl font-bold text-lg hover:bg-(--primary) hover:text-white transition-all border border-(--primary/10)">List an item</button>
                </div>
            </div>
            <div className="w-full lg:w-1/2 aspect-video rounded-3xl overflow-hidden shadow-2xl bg-slate-200 dark:bg-slate-800">
                <img src="/children-book-set.jpg"/>
            </div>
        </section>

        {/**next section */}
        <section className="px-6 md:px-20 lg:px-40 py-20 bg-white">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900">
                    Three easy steps to swap
                </h2>
                <div className="bg-(--primary) w-20 h-1.5 mx-auto mt-5 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                <div className="absolute top-1/6 md:block left-[20%] right-[20%] h-0.5 border-t-2 border-dashed border-(--primary) z-0"></div>
                <div className="flex flex-col items-center text-center relative z-10">
                    <div className="bg-(--primary-shaded) text-(--primary) rounded-2xl size-20 flex items-center justify-center mb-6 group-hover:bg-(--primary) group-hover:text-white transition-all duration-300">
                        {/**camera svg goes in here */}
                        <span className=""></span>
                    </div>
                    <span className="text-(--primary) uppercase font-bold text-sm tracking-widest">step 1</span>
                    <h3 className="text-xl font-bold mt-1 text-slate-900">List Your Item</h3>
                    <p className="text-(--text-shade) tracking-wide">Take a few clear photos, add a description, and choose if you want to sell, start a bid, or give it away for free.</p>
                </div>
            

            <div className="flex flex-col items-center text-center relative z-10">
                    <div className="bg-(--primary-shaded) text-(--primary) rounded-2xl size-20 flex items-center justify-center mb-6 group-hover:bg-(--primary) group-hover:text-white transition-all duration-300">
                        {/**camera svg goes in here */}
                        <span className=""></span>
                    </div>
                    <span className="text-(--primary) uppercase font-bold text-sm tracking-widest">step 1</span>
                    <h3 className="text-xl font-bold mt-1 text-slate-900">List Your Item</h3>
                    <p className="text-(--text-shade) tracking-wide">Take a few clear photos, add a description, and choose if you want to sell, start a bid, or give it away for free.</p>
                </div>

                
                </div>
        </section>
    </main>

)
}