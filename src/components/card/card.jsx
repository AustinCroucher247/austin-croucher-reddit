import './card.scss';
import xboxLogo from '../../assets/xboxLogo1.png';
import upvote from '../../assets/upvote1.png';
import downvote from '../../assets/downvote1.png';
import comments from '../../assets/comment.png';
import share from '../../assets/ShareButon.png';
import axios from 'axios';
import { useEffect, useState } from 'react';

const API_URL = "https://oauth.reddit.com/hot";
const API_KEY = "eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NTE4MTU2LCJpYXQiOjE2ODQ0MzE3NTYsImp0aSI6Ijc5NzA4OTMtdzg0LUdMNEJCa3pVMXc5SXlTQTdSSHdnNXJsU1pBIiwiY2lkIjoiWGtqdU9DY2tkR0hxRURycVNlaTRidyIsImxpZCI6InQyXzRxdWRwIiwiYWlkIjoidDJfNHF1ZHAiLCJsY2EiOjEyOTU0NzMyNjkzMTcsInNjcCI6ImVKeUtWdEpTaWdVRUFBRF9fd056QVNjIiwiZmxvIjo5fQ.rWR7_4GFtHmsx5ZiVlqBnbq8C64PohZRJbHbVzhLdy23pU1QIbwr12rlLZ9dZ2PWfgjb4B6AIlYuz8mxuj9FSpUz4VkWbJnX91r9r6VOVuWzDH6L8t6zlZOI5PgyHwJKRLOiX32YK9wibIW5lbqCVruxhJDBzmoSiFKYk3N5hW67rBPJWh31BAliRaZ5aTd72YEXSwew8H5tmWf7s4-TUqO35QBvm4C_x9cw0-XEHonsbgjwQM132w_z2MZ9U3UtMpBbXQdWK83zHwSpmO0y6P5f9ot0_Lf0FGcR5Bpuqch3i33MGKCC4Zn08Y7USw-8I6Ibk9_a3my2_g5thP-qkg";



function Card() {
    const [posts, setPosts] = useState([]); // Changed from post to posts and null to []

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_URL, {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                    },
                });
                setPosts(response.data.data.children.map(child => child.data));
                console.log(response)// Changed from post to posts and used map
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    if (!posts.length) return null;  // Render nothing if posts is not fetched yet

    return posts.map((post) => {
        const postedTime = new Date(post.created_utc * 1000).toLocaleString(); // moved inside map
        return (
            <div className='parent--container' key={post.id}>
                <div className='card--container'>
                    <div className='card--content'>
                        <div className='card--top'>
                            <img className='subreddit--avatar' src={xboxLogo} alt="subreddit Avatar" />
                            <p className='subreddit--text'>{`r/${post.subreddit}`}</p>
                            <p className='postedBy--text'>{`Posted by u/${post.author} at ${postedTime}`}</p>
                            <button className='join--button'>Join</button>
                        </div>
                        <h3>{post.title}</h3>
                        <div className='card--img--container'>
                            <img className='card--img' src={post.thumbnail} alt="post thumbnail" />
                        </div>
                        <div className='card--bottom'>
                            <div className='votes'>
                                <img className='upvote' src={upvote} alt="upvote" />
                                <p>{post.ups}</p>
                                <img className='downvote' src={downvote} alt="downvote" />
                                <img src={comments} alt="" />
                                <p>{`${post.num_comments} comments`}</p>
                                <img className='share' src={share} alt="" />
                                <p className='share--text'>Share</p>
                                <p className='elipsis'>...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    });
}

export default Card;