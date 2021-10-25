import React, { Component } from 'react';
import ReactDOM from 'react-dom';

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

        var pusher = new Pusher('65c96aa5edb81959f03c', {
            cluster: 'mt1',
            forceTLS: true
        });

        const this2 = this
        var channel = pusher.subscribe('notification');
        channel.bind('create', function(data) {
            const message = this2.state.message
            message.push(data.message)
            this2.setState({message:message})
        });
    }


    render() {
        return (
            <div className="container">
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
