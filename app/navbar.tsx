'use client';
import React from 'react'
import Link from 'next/link'
import { AiFillBug } from 'react-icons/ai'
import { usePathname } from 'next/navigation'
import classnames from 'classnames';


const Navbar = () => {
    const currentPath = usePathname();
    console.log(currentPath);
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href={'/'}><AiFillBug/></Link>
        <ul className="flex space-x-6 items-center m-0 p-0 list-none">
            {[
                { label: 'Dashboard', href: '/' },
                { label: 'Issues', href: '/issues' }
            ].map(({ label, href }) => (
                <li key={href}>
                    <Link
                        className={classnames({
                            'text-zinc-900': href === currentPath,
                            'text-zinc-500': href !== currentPath,
                            'hover:text-zinc-800': true,
                            'transition-colors': true,
                        })}
                        href={href}
                    >
                        {label}
                    </Link>
                </li>
            ))}
        </ul>
    </nav>
  )
}

export default Navbar
