import Divider from './Divider';
import Link from  './Link';

export default function MainMenu () {
    return (
        <nav className="flex gap-2 place-content-start align-middle justify-center">
            <Divider double={true} />
            <Link to="/">Home</Link>
            <Link to="/">Location</Link>
            <Link to="/about">About</Link>
            <Divider double={true} />
        </nav>
    )
}