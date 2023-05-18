import redditLogo from '../../assets/reddit-logo-2436.svg'
import homeDownArrow from '../../assets/homeDownArrowWhite.png'
import './header.scss'
import SearchBar from '../searchBar/searchBar';
import AccountArrow from '../../assets/AccountDownArrow.png';

function Header() {
    return (
        <div className='logo--container'>
            <img className='logo' src={redditLogo} alt="logo" />
            <img className='home' src={homeDownArrow} alt="homeArrow" />
            <SearchBar />
            <img className='account' src={AccountArrow} alt="" />
        </div>
    );
}

export default Header;
