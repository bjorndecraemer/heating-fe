import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {Tab1Page} from './tab1/tab1.page';

export class WebSocketAPI {
    webSocketEndPoint = 'http://localhost:8080/ws';
    topic = '/topic/greetings';
    stompClient: any;
    tab1Page: Tab1Page;
    constructor(tab1Page: Tab1Page) {
        this.tab1Page = tab1Page;
    }
    _connect() {
        console.log('Initialize WebSocket Connection');
        const ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function(frame) {
            _this.stompClient.subscribe(_this.topic, function(sdkEvent) {
                _this.onMessageReceived(sdkEvent);
            });
            // _this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);
    }

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log('Disconnected');
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error) {
        console.log('errorCallBack -> ' + error);
        setTimeout(() => {
            this._connect();
        }, 5000);
    }

    _send(message) {
        console.log('calling logout api via web socket');
        this.stompClient.send('/app/hello', {}, JSON.stringify(message));
    }

    onMessageReceived(message) {
        console.log('Message Recieved from Server :: ' + message);
        this.tab1Page.handleMessage(JSON.stringify(message.body));
    }
}
