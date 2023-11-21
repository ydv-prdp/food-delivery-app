'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"


const AdminTabs = ({isAdmin}) => {
    const path = usePathname();
  return (
    <div className="inline-flex mx-auto gap-2 tabs justify-center">
    <Link className={path === '/profile' ? 'active' : ''} href="/profile">
        Profile
    </Link>
    {isAdmin && (
        <>
            <Link className={path === '/categories' ? 'active' : ''} href={'/categories'}>Categories</Link>
            <Link className={path.includes('menu-items') ? 'active' : ''} href={'/menu-items'}>Menu Items</Link>
            <Link className={path === '/users' ? 'active' : ''} href={'/users'}>Users</Link>
        </>
    )}
    </div>
  )
}

export default AdminTabs