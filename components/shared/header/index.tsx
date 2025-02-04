import Link from 'next/link';
import Image from 'next/image';
import { APP_NAME } from '@/lib/constants';
import MenuPage from '@/components/shared/header/menu'



const HeaderPage = () => {
    return <header className='w-full borber-b'>
        <div className='wrapper flex-between'>
            <div className='flex-start'>
                <Link href='/' className='flex-start'>
                    <Image src='/images/logo.jpg' alt={`${APP_NAME}`} height={70} width={70} priority={true} className="dark:invert" />
                    <span className='hidden lg:block font-bold text-2xl ml-3'>{APP_NAME}</span>
                </Link>
            </div>
            <MenuPage />
        </div>
    </header>;
};

export default HeaderPage;