import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Echo from "laravel-echo";

export default class Message extends Component {

    constructor() {
        super();
        this.state = {
            message:[]
        };
    }

    componentDidMount()
    {
        console.log("Inicio programa message... ");
        // Enable pusher logging - don't include this in production
        Pusher.logToConsole = true;

        window.Pusher = require('pusher-js');

        window.Echo = new Echo({
            broadcaster: 'pusher',
            key: 'local',
            // key: process.env.MIX_PUSHER_APP_KEY,
            // wsHost: process.env.PUSHER_HOST,
            wsHost: '127.0.0.1',
            wsPort: 6001,
            forceTLS: false,
            disableStats: true,
        });


        var pusher = new Pusher('local', {
            broadcaster: 'pusher',
            key: 'local',
            // key: process.env.MIX_PUSHER_APP_KEY,
            // wsHost: process.env.PUSHER_HOST,
            wsHost: '127.0.0.1',
            wsPort: 6001,
            forceTLS: false,
            disableStats: true,
        });

        const this2 = this
        var channel = pusher.subscribe('notification');
        channel.bind('create', function(data) {
            const message = this2.state.message
            message.push(data.message)
            this2.setState({message:message})
            // console.log({message:message});
        });

        // var channel = pusher.subscribe('notification');
        // channel.bind('create', function(data) {
        //     console.log(JSON.stringify(data));
        // });

        // var channel = pusher.subscribe('notification');
        // channel.bind('create', function(data) {
        //     console.log(JSON.stringify(data));
        // });

        // console.log(JSON.stringify(this.state.message));
        // const this2 = this
        // var channel = pusher.subscribe('notification');
        // channel.bind('create', function(data) {
        //     const message = this2.state.message
        //     message.push(data.message)
        //     this2.setState({message:message})
        // });
    }


    render() {
        return (
            <div className="container">
                {/*<p> {JSON.stringify(this.state.message)} </p>*/}

                {
                    this.state.message.map((msg)=>{
                        return(
                            <p>
                                <b>Nome </b> = {msg.name} <br/>  <b> Image </b> = {msg.url}
                            </p>
                            // <Image
                            //     source={{ uri: msg.url }}
                            //     style={{ width: 40, height: 40 }}
                            // />
                        )
                    })
                }

            </div>
        );
    }
}

if (document.getElementById('message-component')) {
    ReactDOM.render(<Message />, document.getElementById('message-component'));
}
