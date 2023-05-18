import React, { useState, useEffect } from 'react';
import axios from 'axios';

import redditLogo from '../../assets/reddit-logo-2436.svg';
import homeDownArrow from '../../assets/homeDownArrowWhite.png';
import './header.scss';
import SearchBar from '../searchBar/searchBar';
import AccountArrow from '../../assets/AccountDownArrow.png';
import DropdownMenu from '../dropdown/dropdown';
import SubredditPage from '../subreddit/subredditPage';

const API_URL = "https://oauth.reddit.com/subreddits/popular";
const API_KEY = "eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NTE4MTU2LCJpYXQiOjE2ODQ0MzE3NTYsImp0aSI6Ijc5NzA4OTMtdzg0LUdMNEJCa3pVMXc5SXlTQTdSSHdnNXJsU1pBIiwiY2lkIjoiWGtqdU9DY2tkR0hxRURycVNlaTRidyIsImxpZCI6InQyXzRxdWRwIiwiYWlkIjoidDJfNHF1ZHAiLCJsY2EiOjEyOTU0NzMyNjkzMTcsInNjcCI6ImVKeUtWdEpTaWdVRUFBRF9fd056QVNjIiwiZmxvIjo5fQ.rWR7_4GFtHmsx5ZiVlqBnbq8C64PohZRJbHbVzhLdy23pU1QIbwr12rlLZ9dZ2PWfgjb4B6AIlYuz8mxuj9FSpUz4VkWbJnX91r9r6VOVuWzDH6L8t6zlZOI5PgyHwJKRLOiX32YK9wibIW5lbqCVruxhJDBzmoSiFKYk3N5hW67rBPJWh31BAliRaZ5aTd72YEXSwew8H5tmWf7s4-TUqO35QBvm4C_x9cw0-XEHonsbgjwQM132w_z2MZ9U3UtMpBbXQdWK83zHwSpmO0y6P5f9ot0_Lf0FGcR5Bpuqch3i33MGKCC4Zn08Y7USw-8I6Ibk9_a3my2_g5thP-qkg";

function Header() {
    const [subreddits, setSubreddits] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedSubreddit, setSelectedSubreddit] = useState(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        const fetchSubreddits = async () => {
            try {
                const response = await axios.get(API_URL, {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                    },
                });
                setSubreddits(response.data.data.children.map(child => child.data));
            } catch (error) {
                console.error(error);
            }
        };

        fetchSubreddits();
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleClick = event => {
        const { top, left } = event.target.getBoundingClientRect();
        setDropdownPosition({ top: top + event.target.offsetHeight, left });
        toggleDropdown();
    };

    const handleSubredditSelection = subreddit => {
        setSelectedSubreddit(subreddit);
        toggleDropdown();
    };

    return (
        <div className='header-container'>
            <img className='logo' src={redditLogo} alt="logo" />
            <img className='home' src={homeDownArrow} alt="homeArrow" onClick={handleClick} />
            <SearchBar />
            <img className='account' src={AccountArrow} alt="" />

            {dropdownOpen && (
                <div className='dropdown-container' style={dropdownPosition}>
                    <DropdownMenu subreddits={subreddits} onSelectSubreddit={handleSubredditSelection} />
                </div>
            )}

            {selectedSubreddit && (
                <SubredditPage subreddit={selectedSubreddit} />
            )}
        </div>
    );
}

export default Header;