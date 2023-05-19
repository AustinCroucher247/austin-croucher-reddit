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
const API_KEY = "eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NjA1MjIxLjc4NzQ3MSwiaWF0IjoxNjg0NTE4ODIxLjc4NzQ3MCwianRpIjoiNzk3MDg5My1lTGI2dmt3SGczUXJEdDBsQk4zRUt5RHB5X1lyR0EiLCJjaWQiOiJUdnR0T2tsNFRBU0FQMkE2cVU1ZHVRIiwibGlkIjoidDJfNHF1ZHAiLCJhaWQiOiJ0Ml80cXVkcCIsImxjYSI6MTI5NTQ3MzI2OTMxNywic2NwIjoiZUp5S1Z0SlNpZ1VFQUFEX193TnpBU2MiLCJmbG8iOjl9.cwnVz8sHUmlVFSsYWEBQcrc1u0y9VcgOn-ONhZx7YbIKqfxLpIkc-SbUt568xWjYAPt6_Vff2AJBe56BI8rbzUMPHrdUZ8U4gvpLuMj-MwliakAi3nHhWX9UkjqG4NVCLnNMQxTm79LhS0_J_Ufn5nJMJeC8Uo1k7FcFCQHhG3QGxUJegBD2NmxapSizvVmOPCpMMcG7qLbUxbOsz-0Ud7g4vFBVySoHpGdYOGFsCs30KN4XKifb_RnpyBMnmMMT-oJ3MjPxrou6NWjFAmHDSvMLcSdzo0rwTQ4--femt_b6iW-QaRGoFkp61Au1WTtdtVmOXfbSTd-_jsIJiSMpZA";

function Header(props) {
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
        if (props.onSubredditSelect) {
            props.onSubredditSelect(subreddit);
        }
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