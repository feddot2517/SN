import React, {Component} from 'react';
import {withTracker} from "meteor/react-meteor-data";
import Profile from "../../models/profile";
import Friend from "../../models/friend";
import News from "../../models/news";
import {Spin, Button, Card, Icon, Input, message, Modal, Audio} from "antd";
import './css/profile.css';
import Avatar from "../../models/avatar";
import Activity from "../../models/activity";
import Online from "../../models/online";
import Music from "../../models/music";

// App component - represents the whole app
class profile extends Component {

  addFriend = (current ,friendLogin) => {
    Meteor.call('addFriendShip', current, friendLogin)
    message.success('Subscribe added');
  };

  closeModal= (profile) => {
    this.setState({
      visible: false,
    });
    this.props.history.push(`/profile/${profile}`);
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  state = {
    newsText: "",
    visible: false,
  };

  delNews = newsText => {
    Meteor.call("delNews", newsText)
  };

  delFriends = (targetId) => {
    Meteor.call("delFriend", targetId);
    message.error('Subscribe deleted');
  };

  addNews = e => {
    Meteor.call('addNews', this.props.currentUser && this.props.currentUser.username, this.state.newsText);
    this.setState({newsText: ""});
    message.success('News added');
  };

  onChangeInputTextNews = e => {
    this.setState({newsText: e.target.value})
  };

  setCurrentPlayingMusic = musicFile => {
    Session.set('currentMusic', musicFile)
  };

  render() {
    if (!this.props.currentUser)
      return (<div className="loadingBox">
        <Spin tip="Loading...">
        </Spin>
      </div>);


    return (
      <div>

        <div style={{width: '30%', minHeight: 1000, float: 'left', marginRight: '2%'}}>

          {/*AVATAR*/}
          <div className='block'>
            {this.props.avatar ?
            <div className="avatar">
              <img src={this.props.avatar.base64} alt="avatar"/>
            </div>:
                <div className="avatar">
                  <img src="/no-avatar.jpg" alt="no-avatar"/>
                </div>}

            {this.props.match.params.id === this.props.currentUser.username &&
            <Button
              style={{width: '90%', marginLeft: '5%', margin: '5%'}}
              onClick={() => this.props.history.push("/upload")}
            >UploadAvatar</Button>}
          </div>

          {/*FOLLOWERS*/}
          {this.props.match.params.id === this.props.currentUser.username &&
          <div className="block" style={{}}>

            <Button
                style={{width: '90%', marginLeft: '5%', margin: '5%'}}
                onClick={this.showModal} type="default">My followers</Button>

            <Modal
                title="Your followers:"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
              {this.props.followers && this.props.followers.map((profile, id) => (
                  <div key={id} style={{display: "inline-block", marginBottom:25}}>

                    {Avatar.findOne({username: profile.id1}) &&
                    <div className="avatar3">
                      <img src={Avatar.findOne({username: profile.id1}).base64} alt="avatar"/>
                    </div>
                    }

                    {!Avatar.findOne({username: profile.id1}) &&
                    <div className="avatar3">
                      <img src="/no-avatar.jpg" alt="noavatar"/>
                    </div>
                    }

                    <div className="userNameFindPage" onClick={()=>this.closeModal(profile.id1)} key={id}>
                      {Profile.findOne({username: profile.id1}).firstName}
                    </div>
                  </div>
              ))}
            </Modal>
          </div>
          }


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


          {/*PHOTOS*/}
          {this.props.photos &&
          <div className='block'>
            <div className='sideTitle'>Photos</div>
            {!this.props.photos.length && <div style={{textAlign: 'center'}}>
              You didn't post any photo yet:(</div>}
            {this.props.photos && this.props.photos.map((photo, id) => (
                <div onClick={()=>this.props.history.push(`/photos/${this.props.match.params.id}`)} key={id} style={{width:'23%', margin: '1%', display:'inline-block'}}>
                  <img style={{width:'100%'}} src={photo.base64} alt="activity"/>
                </div>

            ))}
          </div>}


          {/*MUSIC*/}
          <div className='block'>
            <div className='sideTitle'>Music</div>
            <div style={{textAlign: 'center'}}>
              <Button
                  style={{width: '90%', marginLeft: '5%', margin: '5%'}}
                  onClick={() => this.props.history.push("/upload/music")} type="default">Add music</Button>
            </div>
            {this.props.music && this.props.music.map((music, id) => (
                <div className='block' key={id}>
                  <div className="profileMusicTitle">{music.meta.trackName}</div>
                  <div style={{display:"inline-block", float:"right"}}>
                    <Button type="default" onClick={()=>this.setCurrentPlayingMusic(music)}>
                        <Icon type="caret-right" />
                    </Button></div>
                </div>

            ))}
          </div>


          {/*SUBSCRIPTIONS*/}
          {this.props.match.params.id === this.props.currentUser.username &&
          <div className='block'>
            <div className="sideTitle">Subscriptions:</div>

            {this.props.friendShips && !this.props.friendShips.length &&
            <div style={{textAlign: 'center'}}>
              no subscriptions</div>}

            {this.props.friendShips && this.props.friendShips.map((profile, id) => (
                <div key={id} style={{padding: '0 10px 0 10px'}}>
                  <div
                      className='ant-card ant-card ant-card-bordered ant-card-bordered ant-card-hoverable'
                      style={{float:'left',  width:'70%', height: 35, padding: 5}}
                      onClick={() => this.props.history.push(`/profile/${Profile.findOne({_id: profile.id2}).username}`)}
                  >{Profile.findOne({_id: profile.id2}).username}
                  </div>


                  <Button style={{float:'left',height: 35,width:'30%'}} onClick={() => this.delFriends(profile._id)} type="danger">Unsubscribe</Button></div>

            ))}
          </div>}

        </div>


        <div style={{marginRight: '1%'}}>

          {/*MAININFO*/}
          <div className='block' style={{}}>
            <div className="userCard">
              <div className="firstName">{this.props.profiles.firstName} </div>
              <div className="lastName">{this.props.profiles.lastName} </div>

              {/*ONLINE*/}

              {this.props.profiles.lastActivity&&
              <div style={{ display: "inline-block", color:"royalblue"}}>
                {this.props.profiles.onlineStatus?
                    <div>
                      {this.props.profiles.onlineStatus}
                    </div>:
                    <div>
                      last seen at {this.props.profiles.lastActivity.toLocaleString()}
                    </div>}
              </div>}

              {/*MESSAGE*/}
              {this.props.match.params.id !== this.props.currentUser.username &&
              <div style={{}}>
                <Button onClick={()=>this.props.history.push(`/dialog/${this.props.profiles.username}`)} type="default">
                  <Icon type="message" />
                </Button>
              </div>}

              {/*SUBSCRIBE*/}
              {this.props.match.params.id !== this.props.currentUser.username&&
                  <div>
                      {this.props.match.params.id !== this.props.currentUser.username&&!Friend.findOne({id1: this.props.currentUser.username, id2: this.props.profiles._id}) &&
                      <div style={{display: "inline-block"}}>
                        <Button onClick={()=>this.addFriend(this.props.currentUser.username, this.props.profiles._id)} type="default">
                            subscribe
                        </Button>
                      </div>}

                      {this.props.match.params.id !== this.props.currentUser.username&&Friend.findOne({id1: this.props.currentUser.username, id2: this.props.profiles._id}) &&
                      <div style={{display: "inline-block"}}>
                        <Button onClick={()=>this.delFriends(Friend.findOne({id1: this.props.currentUser.username, id2: this.props.profiles._id})._id)} type="danger">
                            unsubscribe
                        </Button>
                      </div>}
                  </div>
              }

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

    myLastActivity: Profile.findOne({username: currentUser.username}).lastActivity ,

    followers: Friend.find({id2: Profile.findOne({username: currentUser.username})._id}).fetch(),
    news: News.find({id1: id}).fetch(),
    photos: Activity.find({username: id}).fetch(),
    music: Music.find({userId: currentUser._id}).fetch(),
  }
})(profile);

