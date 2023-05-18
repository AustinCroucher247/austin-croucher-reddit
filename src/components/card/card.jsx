import './card.scss';
import Games from '../../assets/Games.png';
import xboxLogo from '../../assets/xboxLogo1.png';
import upvote from '../../assets/upvote1.png';
import downvote from '../../assets/downvote1.png';
import comments from '../../assets/comment.png';
import share from '../../assets/ShareButon.png';


function Card() {
    return (
        <div className='parent--container'>
            <div className='card--container'>
                <div className='card--content'>
                    <div className='card--top'>
                        <img className='subreddit--avatar' src={xboxLogo} alt="subreddit Avatar" />
                        <p className='subreddit--text'>r/Xboxone</p>
                        <p className='postedBy--text'>Posted by u/Shotgun247 23 hours ago</p>
                        <button className='join--button'>Join</button>
                    </div>
                    <h3>New Games coming to Xbox</h3>
                    <div className='card--img--container'>
                        <img className='card--img' src={Games} alt="" />
                    </div>
                    <div className='card--bottom'>
                        <div className='votes'>
                            <img className='upvote' src={upvote} alt="upvote" />
                            <p>1000</p>
                            <img className='downvote' src={downvote} alt="downvote" />
                            <img src={comments} alt="" />
                            <p>264 comments</p>
                            <img className='share' src={share} alt="" />
                            <p className='share--text'>Share</p>
                            <p className='elipsis'>...</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;