import React from 'react';

function DropdownMenu({ subreddits, onSelectSubreddit }) {
    const handleSubredditClick = subreddit => {
        onSelectSubreddit(subreddit);
    };

    return (
        <ul className="dropdown-menu">
            {subreddits.map(subreddit => (
                <li key={subreddit.id} onClick={() => handleSubredditClick(subreddit)}>
                    {subreddit.display_name}
                </li>
            ))}
        </ul>
    );
}

export default DropdownMenu;