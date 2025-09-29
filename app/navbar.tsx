'use client';
import React from 'react'
import Link from 'next/link'
import { AiFillBug } from 'react-icons/ai'
import { usePathname } from 'next/navigation'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Avatar, Button, DropdownMenu } from '@radix-ui/themes'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import classnames from 'classnames';


const Navbar = () => {
    const currentPath = usePathname();
    const { data: session, status } = useSession();
    
    return (
        <nav className='flex justify-between border-b mb-5 px-5 h-14 items-center'>
            <div className="flex space-x-6 items-center">
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
            </div>

            <div className="flex items-center">
                {status === "loading" && (
                    <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb">
                        <div className="flex items-center space-x-2 p-2">
                            {/* Avatar skeleton */}
                            <Skeleton 
                                width={32} 
                                height={32} 
                                circle={true} 
                            />
                            {/* Name skeleton - hidden on mobile like the real name */}
                            <div className="hidden md:block">
                                <Skeleton width={80} height={16} />
                            </div>
                        </div>
                    </SkeletonTheme>
                )}
                
                {status === "unauthenticated" && (
                    <Button 
                        onClick={() => signIn('google')}
                        variant="soft"
                    >
                        Login
                    </Button>
                )}
                
                {status === "authenticated" && session?.user && (
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <button className="flex items-center space-x-2 hover:bg-gray-100 rounded-full p-2 transition-colors">
                                <Avatar
                                    src={session.user.image || undefined}
                                    fallback={session.user.name?.[0] || session.user.email?.[0] || 'U'}
                                    size="2"
                                />
                                <span className="text-sm text-zinc-700 hidden md:block">
                                    {session.user.name || session.user.email}
                                </span>
                            </button>
                        </DropdownMenu.Trigger>
                        
                        <DropdownMenu.Content>
                            <DropdownMenu.Label>
                                {session.user.email}
                            </DropdownMenu.Label>
                            <DropdownMenu.Separator />
                            <DropdownMenu.Item onClick={() => signOut()}>
                                Logout
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                )}
            </div>
        </nav>
    )
}

export default Navbar
