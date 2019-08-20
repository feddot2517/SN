import React from 'react';
import { Form, Icon, Input, Button, Carousel, Spin } from 'antd';
import { NavLink } from 'react-router-dom';
import './css/auth.css';


const FormItem = Form.Item;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;


class NormalLoginForm extends React.Component {



    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            Meteor.loginWithPassword(values.userName, values.password,(err)=>{
                if(!err) {
                    this.props.history.push('/');
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




                <div style={{margin:"0 20% 0 20%"}}>


                    <div className="login">
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

                            </FormItem>
                        </Form>

                        <div>
                            <Button type="primary" htmlType="submit" style={{marginTop: '10px'}} onClick={this.handleCrate.bind(this)}>
                                Create account<Icon type="arrow-right" />
                            </Button>
                        </div>
                    </div>


                </div>

            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);


export default WrappedNormalLoginForm;