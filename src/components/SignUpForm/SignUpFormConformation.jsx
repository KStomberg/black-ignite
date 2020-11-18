import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

function SignUpFormConformation() {
    const history = useHistory();
    const [blackIgniteTwitter, setBlackIgniteTwitter] = useState('@black_ignite');
    const [blackIgniteWebsite, setBlackIgniteWebsite] = useState('speak.blackignite.com');

    return (
        <div>
            <button onClick={() => history.push('/')}>✖</button>

            <h2>Thank you!</h2>
            <p>
                We'll email you the official submission form within 72 hours.
            </p>

            <h2>Tweet this:</h2>
            <p>
                I just signed up to speak at @black_ignite!
                Join me as a speaker at speak.blackignite.com
            </p>
            <a 
                class="twitter-share-button"
                href="https://twitter.com/intent/tweet?text=I%20just%20signed%20up%20to%20speak%20at%20"
                href=""
            >
                Tweet
            </a>

            <p>
                Watch past talk on the Black Ignite YouTube
            </p>
        </div>
    );
}

export default SignUpFormConformation;