export default function Divider(double) {
    if (double) {
        return <div className="border-navy-400 min-w-[60%] w-[80%] border-t py-1 my-4 border-b" />;
    }

    return <hr className="border-navy-400 my-4 mx-10" />;
}