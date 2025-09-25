import React from 'react'
import Link from 'next/link'
import { AiFillBug } from 'react-icons/ai'

const Navbar = () => {
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href={'/'}><AiFillBug/></Link>
        <ul className='flex space-x-6 '>
            <li><Link className='text-zinc-500 hover:text-zinc-800' href={'/'}>Dashboard</Link></li>
            <li><Link className='text-zinc-500 hover:text-zinc-800' href={'/issues'}>Issues</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar
