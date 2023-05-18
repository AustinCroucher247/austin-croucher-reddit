import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../card/card';
import Header from '../header/header';

function SubredditPage({ subreddit }) {
    const [posts, setPosts] = useState([]);
    const API_KEY = "eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NTE4MTU2LCJpYXQiOjE2ODQ0MzE3NTYsImp0aSI6Ijc5NzA4OTMtdzg0LUdMNEJCa3pVMXc5SXlTQTdSSHdnNXJsU1pBIiwiY2lkIjoiWGtqdU9DY2tkR0hxRURycVNlaTRidyIsImxpZCI6InQyXzRxdWRwIiwiYWlkIjoidDJfNHF1ZHAiLCJsY2EiOjEyOTU0NzMyNjkzMTcsInNjcCI6ImVKeUtWdEpTaWdVRUFBRF9fd056QVNjIiwiZmxvIjo5fQ.rWR7_4GFtHmsx5ZiVlqBnbq8C64PohZRJbHbVzhLdy23pU1QIbwr12rlLZ9dZ2PWfgjb4B6AIlYuz8mxuj9FSpUz4VkWbJnX91r9r6VOVuWzDH6L8t6zlZOI5PgyHwJKRLOiX32YK9wibIW5lbqCVruxhJDBzmoSiFKYk3N5hW67rBPJWh31BAliRaZ5aTd72YEXSwew8H5tmWf7s4-TUqO35QBvm4C_x9cw0-XEHonsbgjwQM132w_z2MZ9U3UtMpBbXQdWK83zHwSpmO0y6P5f9ot0_Lf0FGcR5Bpuqch3i33MGKCC4Zn08Y7USw-8I6Ibk9_a3my2_g5thP-qkg";

    useEffect(() => {
        const fetchPosts = async () => {
            try {
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
            {posts.map(post => (
                <Card key={post.id} post={post} />
            ))}
        </div>
    );
}

export default SubredditPage;