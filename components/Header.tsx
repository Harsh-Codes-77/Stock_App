
import Link from 'next/link';
import Image from 'next/image';
import NavItems from './navigation';
import UserDropDown from './UserDropdown';
import { searchStocks } from '@/lib/actions/finnhub.actions';

const Header = async( {user}: { user: User } ) => {

    const initialStocks = await searchStocks();

    return (
        
        <header className="sticky top-0 header">
            <div className="container header-wrapper">
                <Link href="/">
                    <Image src="/public/assets/icons/logo.svg" alt="Signalist logo" width={140} height={32} className="h-8 w-auto cursor-pointer" />
                </Link>
                <nav className="hidden sm:block">
                    <NavItems initialStocks={initialStocks}/>
                </nav>
                <UserDropDown user={user} initialStocks={initialStocks} />
            </div>
        </header>
    );
};

export default Header;