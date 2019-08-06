import React, { Component } from 'react';
import {Accounts} from "meteor/accounts-base";
import {withTracker} from 'meteor/react-meteor-data';
import {Form, Icon, Input, Button, Card} from 'antd';
import Profile from "../../models/profile";

const FormItem = Form.Item;

class find extends Component {

    state = {
        userId:'',
    };

    addFriend = (current ,friendLogin) => {
        Meteor.call('addFriendShip', current, friendLogin)
    };

    onClickFind = e => {
      this.props.history.push(`/find/${this.state.userId}`)
    };

    onChangeUserId = e => {
            this.setState({userId: e.target.value});
            console.log(this.state.userId)
        };

    //Сделать map пока не забыл с приодящей в state строкой

    render() {
        return (
            <div>
                <Form>

                    <FormItem>
                            <Input prefix={<Icon type="user"/>}
                                   placeholder="Input user's phone"
                                   onChange={this.onChangeUserId}/>

                    </FormItem>

                    <FormItem>
                        <Button onClick={this.onClickFind}>Find friend</Button>
                    </FormItem>


                    <FormItem><h1>Результаты поиска:</h1></FormItem>

                </Form>
                <div>
                    {this.props.profiles && this.props.profiles.map((profile, id) => (
                        <Card key={id}>
                            <div style={{
                                color: 'black',
                                display: 'inline-block',
                                marginRight: 5}}
                            >
                                <div style={{display: "inline-block", marginRight: 15}}>{profile.firstName} </div>
                                <div style={{display: "inline-block", marginRight: 15}}>{profile.lastName} </div>
                                <div style={{display: "inline-block", marginRight: 15}}>{profile.phone} </div>
                                <Button onClick={()=>this.addFriend(this.props.currentUser && this.props.currentUser.username
                                    , profile._id)} type="danger">+</Button>
                                <div style={{display: "inline-block"}}>
                                </div>
                                <div>
                                </div>
                            </div>
                        </Card>

                    ))}

                </div>
            </div>
        );
    }
}
export default withTracker((props)  => {
    const {id} = props.match.params;
    return {
        currentUser: Meteor.user(),
        profiles: Profile.find({phone: id}).fetch(),
    }
})(find);
