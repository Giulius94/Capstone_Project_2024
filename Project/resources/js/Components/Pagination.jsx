import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    return(
        <nav className="text-center mt-4">
            {links.map(link => (
                <Link
                preserveScroll
                href={link.url || ""}
                key={link.label} 
                className={"inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-black border rounded-md  mx-1 text-decoration-none" + (link.active ? " border-success fs-5" : " ") + (!link.url ? 'cursor-not-allowed opacity-25' : ' hover:bg-gray-50')}  
                dangerouslySetInnerHTML={{__html: link.label}}></Link>
            ))}
        </nav>
    )
}