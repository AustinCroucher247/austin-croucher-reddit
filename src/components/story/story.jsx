import React, { useState } from 'react';
import './story.scss';
import upvote from '../../assets/upvote.png';
import downvote from '../../assets/downvote.png';

function Story(props) {
    const [upvotes, setUpvotes] = useState(parseInt(props.upvotes, 10));

    const handleUpvote = () => {
        setUpvotes(upvotes + 1);
    };

    const handleDownvote = () => {
        setUpvotes(upvotes - 1);
    };
    return (
        <div className='container'>
            <div className='container--left'>
                <img className='upvote--downvote' src={upvote} alt="upvote" onClick={handleUpvote} />
                <p>{upvotes}</p>
                <img className='upvote--downvote' src={downvote} alt="downvote" onClick={handleDownvote} />
            </div>
            <div className='container--right'>
                <img className='image--thumbnail' src={props.imageSrc} alt={props.imageAlt} />
                <div>
                    <div className='content-wrapper'>
                        <p className='title'>{props.text}</p>
                        <div className='container--bottom'>
                            <p className='comments'>{props.comments} Comments</p>
                            <p className='shares'>{props.shares} Shares</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Story;