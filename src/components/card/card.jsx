import React, { useEffect, useState } from 'react';
import axios from 'axios';

import xboxLogo from '../../assets/Icon.png';
import upvote from '../../assets/upvote1.png';
import downvote from '../../assets/downvote1.png';
import comments from '../../assets/comment.png';
import share from '../../assets/ShareButon.png';

import './card.scss';

const API_URL = "https://oauth.reddit.com/hot";
const API_KEY = "eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NTE4MTU2LCJpYXQiOjE2ODQ0MzE3NTYsImp0aSI6Ijc5NzA4OTMtdzg0LUdMNEJCa3pVMXc5SXlTQTdSSHdnNXJsU1pBIiwiY2lkIjoiWGtqdU9DY2tkR0hxRURycVNlaTRidyIsImxpZCI6InQyXzRxdWRwIiwiYWlkIjoidDJfNHF1ZHAiLCJsY2EiOjEyOTU0NzMyNjkzMTcsInNjcCI6ImVKeUtWdEpTaWdVRUFBRF9fd056QVNjIiwiZmxvIjo5fQ.rWR7_4GFtHmsx5ZiVlqBnbq8C64PohZRJbHbVzhLdy23pU1QIbwr12rlLZ9dZ2PWfgjb4B6AIlYuz8mxuj9FSpUz4VkWbJnX91r9r6VOVuWzDH6L8t6zlZOI5PgyHwJKRLOiX32YK9wibIW5lbqCVruxhJDBzmoSiFKYk3N5hW67rBPJWh31BAliRaZ5aTd72YEXSwew8H5tmWf7s4-TUqO35QBvm4C_x9cw0-XEHonsbgjwQM132w_z2MZ9U3UtMpBbXQdWK83zHwSpmO0y6P5f9ot0_Lf0FGcR5Bpuqch3i33MGKCC4Zn08Y7USw-8I6Ibk9_a3my2_g5thP-qkg";
// const API_TEST = "https://oauth.reddit.com/subreddits/popular"
function Card() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_URL, {
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

        fetchData();
    }, []);

    if (!posts.length) return null;

    const getImageUrl = post => {
        if (post.thumbnail === "default") {
            return null;
        } else {
            return post.thumbnail;
        }
    };

    const getVideoUrl = post => {
        if (post.media && post.media.reddit_video) {
            return post.media.reddit_video.fallback_url;
        }
        return "";
    };

    const formatPostedTime = postedTime => {
        const currentTime = new Date();
        const timeDifference = Math.abs(currentTime - postedTime);
        const minutes = Math.floor(timeDifference / 1000 / 60);
        const hours = Math.floor(timeDifference / 1000 / 60 / 60);
        const days = Math.floor(timeDifference / 1000 / 60 / 60 / 24);

        if (minutes < 60) {
            return `${minutes} minutes ago`;
        } else if (hours < 24) {
            return `${hours} hours ago`;
        } else {
            return `${days} days ago`;
        }
    };

    return (
        <div>
            {posts.map(post => {
                const postedTime = new Date(post.created_utc * 1000);
                const formattedPostedTime = formatPostedTime(postedTime);

                return (
                    <div
                        className='parent--container'
                        key={post.id}
                        onClick={() => window.open(post.url, "_blank")}
                    >
                        <div className='card--container'>
                            <div className='card--content'>
                                <div className='card--top'>
                                    <img className='subreddit--avatar' src={xboxLogo} alt="subreddit Avatar" />
                                    <p className='subreddit--text'>{`r/${post.subreddit}`}</p>
                                    <p className='postedBy--text'>{`Posted by u/${post.author} ${formattedPostedTime}`}</p>
                                    <button className='join--button'>Join</button>
                                </div>
                                <h3>{post.title}</h3>
                                <div className="card--img--container">
                                    {post.is_video ? (
                                        <video className="card--img" src={getVideoUrl(post)} controls />
                                    ) : (
                                        <img className={`card--img ${post.thumbnail === "default" ? "hidden" : ""}`} src={getImageUrl(post)} alt="post thumbnail" />
                                    )}
                                </div>
                                <p className='url'>{post.url}</p>
                            </div>
                            <div className='card--bottom' onClick={e => e.stopPropagation()}>
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
                );
            })}
        </div>
    );
}

export default Card;