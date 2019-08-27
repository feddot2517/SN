import React, { Component } from 'react';
import {Accounts} from "meteor/accounts-base";
import {withTracker} from 'meteor/react-meteor-data';
import './css/mainpage.css';

class music extends Component {



    render() {
        return (
            <div style={{width: 600}}>
                    <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay"
  src="https://w.soundcloud.com/player/?url=https://soundcloud.com/gourski/tracks&show_artwork=true&color=000000&show_playcount=true&hide_related=true&liking=fals‌​e&visual=true&sharing=false&show_comments=false ">
                </iframe>
                <script src="https://w.soundcloud.com/player/api.js">

                </script>
                </div>
        );
    }
}

export default withTracker(() => {
    return {
    };
})(music);