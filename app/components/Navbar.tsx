import { auth, signIn, signOut } from '@/auth'
import Link from 'next/link';
import React from 'react'

export default async function Navbar() {

    const session = await auth();
  return (
    <>
        <header>
            <nav>
                <Link href='/'>
                    Company Name
                </Link>

                <div className="">
                    {session && session?.user ? (
                        <>
                       <form 
                       action={async() => {
                        'use server'
                        await signOut({redirectTo:"/"})
                       }}>

                        <input type='submit' value='Logout' />

                       </form>

                       <Link href={`/user/${session?.user?.id}`}>
                        <span> {session?.user?.name}</span>
                       
                       </Link>
                        </>

                       

                      

                    ):(
                        <form
                        action={async() => {
                            'use server'

                            await signIn('github');

                        }}
                        >

                            <input type='submit' value='Login'/>

                        </form>
                    )}
                </div>
            </nav>
        </header>
    </>
  )
}
