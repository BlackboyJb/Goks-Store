import Link from 'next/link';
import Image from 'next/image';
import { APP_NAME } from '@/lib/constants';
import MenuPage from '@/components/shared/header/menu'
import CategoryDrawer from './category-drawer';
import Search from './search';



// const HeaderPage = () => {

//     return <header className='w-full borber-b'>
//         <div className='wrapper flex-between'>
//             <div className='flex-start'>
//                 <CategoryDrawer />
//                 <Link href='/' className='flex-start ml-4'>
//                     <Image src='/images/logo.jpg' alt={`${APP_NAME}`} height={70} width={70} priority={true} className="dark:invert" />
//                     <span className='hidden lg:block font-bold text-2xl ml-3'>{APP_NAME}</span>
//                 </Link>
//             </div>
//             <div className='block md:hidden w-full px-4'>
//                 <Search />
//             </div>
//             <MenuPage />
//         </div>
//     </header>;
// };
// export default HeaderPage;


const HeaderPage = () => {
    return (
        <header className="w-full border-b">
            <div className="wrapper flex items-center justify-between">
                {/* Left Section: Logo & Category Drawer */}
                <div className="flex items-center">
                    <CategoryDrawer />
                    <Link href="/" className="flex items-center ml-4">
                        <Image
                            src="/images/logo.jpg"
                            alt={APP_NAME}
                            height={70}
                            width={70}
                            priority={true}
                            className="dark:invert"
                        />
                        <span className="hidden lg:block font-bold text-2xl ml-3">
                            {APP_NAME}
                        </span>
                    </Link>
                </div>

                {/* Search Bar (Centered on medium+ screens, Hidden on small screens) */}
                <div className="hidden md:flex justify-center flex-1">
                    <Search />
                </div>

                {/* Right Section: Menu */}
                <MenuPage />
            </div>

            {/* Separate search bar for small screens */}
            <div className="block md:hidden w-full px-4 mt-2">
                <Search />
            </div>
        </header>
    );
};

export default HeaderPage;
