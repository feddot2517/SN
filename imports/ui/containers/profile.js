import React, {Component} from 'react';
import {withTracker} from "meteor/react-meteor-data";
import Profile from "../../models/profile";
import Friend from "../../models/friend";
import News from "../../models/news";
import {Button, Card, Icon, Input, message} from "antd";
import './css/profile.css';
import Avatar from "../../models/avatar";
import Activity from "../../models/activity";

// App component - represents the whole app
class profile extends Component {

  state = {
    newsText: "",
  };


  delNews = newsText => {
    Meteor.call("delNews", newsText)
  };

  delFriends = (targetId) => {
    Meteor.call("delFriend", targetId);
  };

  addNews = e => {
    Meteor.call('addNews', this.props.currentUser && this.props.currentUser.username, this.state.newsText);
    this.setState({newsText: ""});
    message.success('News added');
  };

  onChangeInputTextNews = e => {
    this.setState({newsText: e.target.value})
  };

  render() {
    console.log(this.props.photos);

    console.log(this.props);
    if (!this.props.currentUser)
      return (<div>Something went wrong ;(</div>);


    return (
      <div>

        <div style={{width: '30%', minHeight: 1000, float: 'left', marginRight: '2%'}}>

          {/*AVATAR*/}
          <div className='block'>
            {this.props.avatar &&
            <div className="avatar">
              <img src={this.props.avatar.base64} alt="avatar"/>
            </div>}

            {this.props.match.params.id === this.props.currentUser.username &&
            <Button
              style={{width: '90%', marginLeft: '5%', margin: '5%'}}
              onClick={() => this.props.history.push("/upload")}
            >UploadAvatar</Button>}
          </div>


          {/*PHOTOS*/}
          {this.props.photos &&
          <div className='block'>
            <div className='sideTitle'>Photos</div>
            {!this.props.photos.length && <div style={{textAlign: 'center'}}>
              You didn't post any photo yet:(</div>}
            {this.props.photos && this.props.photos.map((photo, id) => (
              <div key={id} style={{width:'23%', margin: '1%', display:'inline-block'}}>
                <img style={{width:'100%'}} src={photo.base64} alt="activity"/>
              </div>

            ))}
          </div>}

          {/*ACTIVITY*/}
          <div className='block'>
            <div>
              <div className='sideTitle'>
                Activity
              </div>
              {this.props.match.params.id === this.props.currentUser.username &&
              <Button
                style={{width: '90%', marginLeft: '5%', margin: '5%'}}
                onClick={() => this.props.history.push("/activity")} type="default">Add activity</Button>}
            </div>
          </div>

          {/*MUSIC*/}
          <div className='block'>
            <div className="sideTitle">Music:</div>
            <div style={{textAlign: 'center'}}>
              You didn't post any music yet:(
            </div>
          </div>


          {/*SUBSCRIPTIONS*/}
          {this.props.match.params.id === this.props.currentUser.username &&
          <div className='block'>
            <div className="sideTitle">Subscriptions:</div>

            {this.props.friendShips && !this.props.friendShips.length &&
            <div style={{textAlign: 'center'}}>
              You didn't post any subscriptions yet:(</div>}

            {this.props.friendShips && this.props.friendShips.map((profile, id) => (
              <div key={id} style={{padding: '0 10px 0 10px'}}>
                <div
                  className='ant-card ant-card ant-card-bordered ant-card-bordered ant-card-hoverable'
                  style={{float:'left',  width:'70%', height: 35, padding: 5}}
                  onClick={() => this.props.history.push(`/profile/${Profile.findOne({_id: profile.id2}).username}`)}
                  >{Profile.findOne({_id: profile.id2}).username} </div>

                  <Button style={{float:'right',height: 35,width:'30%'}} onClick={() => this.delFriends(profile._id)} type="danger">Unsubscribe</Button></div>

            ))}
          </div>}


        </div>


        <div style={{marginRight: '1%'}}>

          {/*MAININFO*/}
          <div className='block' style={{}}>
            <div className="userCard">
              <div className="firstName">{this.props.profiles.firstName} </div>
              <div className="lastName">{this.props.profiles.lastName} </div>
            </div>
          </div>

          {/*NEWS*/}
          <div className='block' style={{minHeight: 1000}}>
            <div className="newsBlock">
              <div>News:</div>
              <div className="inputForm">
                {this.props.match.params.id === this.props.currentUser.username ?
                  <div>
                    <Input prefix={<Icon type="user"/>}
                           placeholder="Say anything, PLEASE!"
                           onChange={this.onChangeInputTextNews}/>
                    <Button onClick={this.addNews}>+</Button>
                  </div> : ""}
              </div>
              <div style={{marginTop: 10}}>
                {this.props.news && this.props.news.map((news, id) => (
                  <Card key={id}>
                    <div
                    >
                      <div>
                        {news.createdAt.toDateString()}
                      </div>

                      <div>
                        {news.createdAt.toLocaleTimeString()}
                      </div>

                      <div className="news">
                        {news.newsText}
                      </div>

                      <div className="deleteNewsButton">
                        {this.props.match.params.id === this.props.currentUser.username ?
                          <Button onClick={() => this.delNews(news.newsText)} type="danger">X</Button> : ""}
                      </div>


                    </div>
                  </Card>

                ))}</div>
            </div>
          </div>

        </div>


      </div>
    );
  }
}

export default withTracker((props) => {
  const {id} = props.match.params;

  const currentUser = Meteor.user();
  if (!currentUser)
    return {};

  return {
    avatar: Avatar.findOne({username: id}),
    currentUser: currentUser,
    profiles: Profile.findOne({username: id}),
    friendShips: Friend.find({id1: currentUser.username}).fetch(),
    news: News.find({id1: id}).fetch(),
    photos: Activity.find({username: id}).fetch(),
  }
})(profile);

