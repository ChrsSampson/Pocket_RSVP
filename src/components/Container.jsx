export default function Container ({children, id=""}){
    return (
        <article id={id} class="flex flex-col bg-white place-items-center w-full p-5 border-4 rounded-lg border-spacing-4 border-gold-500">
            {children}
        </article>
    )
}