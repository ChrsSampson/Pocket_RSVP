


export default function Link ({children, to="/"}) {
    console.log(children)

    return (
        <a className="text-black text-xl text-bold hover:text-underline hover:underline" href={to}>
            {children}
        </a>
    )
}