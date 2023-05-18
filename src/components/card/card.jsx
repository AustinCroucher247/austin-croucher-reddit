import './card.scss'
import xboxLogo from '../../assets/xboxLogo1.png'


function Card() {
    return (
        <>
            <div className='parent--container'>
                <div className='card--container'>
                    <div className='card--top'>
                        <img className='subreddit--avatar' src={xboxLogo} alt="subreddit Avatar" />
                        <p className='subreddit--text'>r/Xboxone</p>
                        <p className='postedBy--text'>Posted by u/Shotgun247 23 hours ago</p>
                    </div>
                    <button className='join--button'>Join</button>

                </div>
            </div>
        </>
    );
}

export default Card;
