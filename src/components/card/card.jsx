import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';

import xboxLogo from '../../assets/Icon.png';
import upvote from '../../assets/upvote1.png';
import downvote from '../../assets/downvote1.png';
import comments from '../../assets/comment.png';
import share from '../../assets/ShareButon.png';

import './card.scss';

// const API_URL = "https://oauth.reddit.com/hot";
const API_KEY = "eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NjA1MjIxLjc4NzQ3MSwiaWF0IjoxNjg0NTE4ODIxLjc4NzQ3MCwianRpIjoiNzk3MDg5My1lTGI2dmt3SGczUXJEdDBsQk4zRUt5RHB5X1lyR0EiLCJjaWQiOiJUdnR0T2tsNFRBU0FQMkE2cVU1ZHVRIiwibGlkIjoidDJfNHF1ZHAiLCJhaWQiOiJ0Ml80cXVkcCIsImxjYSI6MTI5NTQ3MzI2OTMxNywic2NwIjoiZUp5S1Z0SlNpZ1VFQUFEX193TnpBU2MiLCJmbG8iOjl9.cwnVz8sHUmlVFSsYWEBQcrc1u0y9VcgOn-ONhZx7YbIKqfxLpIkc-SbUt568xWjYAPt6_Vff2AJBe56BI8rbzUMPHrdUZ8U4gvpLuMj-MwliakAi3nHhWX9UkjqG4NVCLnNMQxTm79LhS0_J_Ufn5nJMJeC8Uo1k7FcFCQHhG3QGxUJegBD2NmxapSizvVmOPCpMMcG7qLbUxbOsz-0Ud7g4vFBVySoHpGdYOGFsCs30KN4XKifb_RnpyBMnmMMT-oJ3MjPxrou6NWjFAmHDSvMLcSdzo0rwTQ4--femt_b6iW-QaRGoFkp61Au1WTtdtVmOXfbSTd-_jsIJiSMpZA";
// const API_TEST = "https://oauth.reddit.com/subreddits/popular"
function Card({ selectedSubreddit, subredditPageLoaded }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const API_URL = selectedSubreddit ? `https://oauth.reddit.com/r/${selectedSubreddit.display_name}/hot` : "https://oauth.reddit.com/hot";
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

        if (!subredditPageLoaded) {
            fetchData();
        }
    }, [selectedSubreddit, subredditPageLoaded]);

    const memoizedPosts = useMemo(() => posts, [posts]);

    if (!memoizedPosts.length) return null;


    const getImageUrl = post => {
        if (post.thumbnail === "default") {
            return null;
        } else {
            return post.thumbnail;
        }
    };

    const getVideoUrl = (post) => {
        if (post.media && post.media.reddit_video) {
            const fallbackUrl = post.media.reddit_video.fallback_url;
            const audioUrl = fallbackUrl.replace("DASH_360", "DASH_audio");
            return audioUrl;
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