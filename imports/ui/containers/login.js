import React from 'react';
import { Form, Icon, Input, Button, Carousel, Spin } from 'antd';
import { NavLink } from 'react-router-dom';
import './auth.css';


const FormItem = Form.Item;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;


class NormalLoginForm extends React.Component {



    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            Meteor.loginWithPassword(values.userName, values.password,(err)=>{
                if(!err) {
                    this.props.history.push('/');
                    alert("successful");
                }
                else

                    alert(err)
            });

        });
    };

    handleCrate = () => {
        this.props.history.push('/signup/');
    }

    handleReset = () => {
        this.props.history.push('/enterEmail/');
    }



    render() {
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        const { getFieldDecorator } = this.props.form;
        if (this.props.isAuthenticated) {
            this.props.history.push('/');
        }

        return (

            <div style={{background:"white", height:1000}}>


                <div style={{height:"15%"}}/>

                <div className="uraccount">
                    <h1>Your Account</h1>
                </div>



                <div style={{margin:"0 20% 0 20%"}}>


                    <div className="login">
                        <h1>Login</h1>
                        <Form onSubmit={this.handleSubmit} className="login-form">

                            <FormItem>
                                {getFieldDecorator('userName', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                )}
                            </FormItem>

                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                                )}
                            </FormItem>

                            <FormItem>
                                <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
                                    Login
                                </Button>

                                <Button type="primary" htmlType="submit" style={{marginTop: '10px'}} onClick={this.handleReset.bind(this)}>
                                    Forgot Password
                                </Button>

                            </FormItem>
                        </Form>
                    </div>

                    <div className="login2">

                        <h1>Register</h1>

                        <li>
                            By creating an account, you will be able to move through the rent process faster,
                            store multiple addresses, view and track your orders in your account and more.
                        </li>

                        <Button type="primary" htmlType="submit" style={{marginTop: '10px'}} onClick={this.handleCrate.bind(this)}>
                            Create account<Icon type="arrow-right" />
                        </Button>

                    </div>

                </div>

            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);


export default WrappedNormalLoginForm;