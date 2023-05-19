import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../card/card';
import Header from '../header/header';

function SubredditPage({ subreddit }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const API_KEY = "eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NjA1MjIxLjc4NzQ3MSwiaWF0IjoxNjg0NTE4ODIxLjc4NzQ3MCwianRpIjoiNzk3MDg5My1lTGI2dmt3SGczUXJEdDBsQk4zRUt5RHB5X1lyR0EiLCJjaWQiOiJUdnR0T2tsNFRBU0FQMkE2cVU1ZHVRIiwibGlkIjoidDJfNHF1ZHAiLCJhaWQiOiJ0Ml80cXVkcCIsImxjYSI6MTI5NTQ3MzI2OTMxNywic2NwIjoiZUp5S1Z0SlNpZ1VFQUFEX193TnpBU2MiLCJmbG8iOjl9.cwnVz8sHUmlVFSsYWEBQcrc1u0y9VcgOn-ONhZx7YbIKqfxLpIkc-SbUt568xWjYAPt6_Vff2AJBe56BI8rbzUMPHrdUZ8U4gvpLuMj-MwliakAi3nHhWX9UkjqG4NVCLnNMQxTm79LhS0_J_Ufn5nJMJeC8Uo1k7FcFCQHhG3QGxUJegBD2NmxapSizvVmOPCpMMcG7qLbUxbOsz-0Ud7g4vFBVySoHpGdYOGFsCs30KN4XKifb_RnpyBMnmMMT-oJ3MjPxrou6NWjFAmHDSvMLcSdzo0rwTQ4--femt_b6iW-QaRGoFkp61Au1WTtdtVmOXfbSTd-_jsIJiSMpZA";
                const response = await axios.get(`https://oauth.reddit.com/r/${subreddit.display_name}/hot`, {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                    },
                });
                setPosts(response.data.data.children.map(child => child.data));
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPosts();
    }, [subreddit]);

    return (
        <div>
            <Header />
            <Card posts={posts} />
        </div>
    );
}

export default SubredditPage;

