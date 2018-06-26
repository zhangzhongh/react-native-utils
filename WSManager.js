//const mWebSocket = new WebSocket("ws://websocket.pgrab.cn/pgrabSocket/ws")
let mWebSocket = new WebSocket("ws://websocket.pgrab.cn/pgrabSocket/ws/v2")
//let mWebSocket = new WebSocket("ws://47.74.208.149:8088/pgrabSocket/ws/v2")

let preSubscribeData = null
let mCallBackFC = null

const openWs = () => {
    mWebSocket = new WebSocket("ws://websocket.pgrab.cn/pgrabSocket/ws/v2")

    mWebSocket.onopen = () => {
        //console.warn('open')
    }

    mWebSocket.onmessage = (e) => {
        try {
            let result = JSON.parse(e.data)
            if (result.event == "ping" && mWebSocket.readyState == WebSocket.OPEN) {
                mWebSocket.send(JSON.stringify({event: 'pong'}))
            } else if (mCallBackFC != null && result.data != null) {
                mCallBackFC(result)
            }
        } catch (e) {
            console.warn('mWebSocket onmessage',e)
        }
    };

    mWebSocket.onerror = (e) => {
        //console.warn('onerror')
    };

    mWebSocket.onclose = (e) => {
        mCallBackFC = null;
        //console.warn('onclose')
    };


}

//初始化先跑一下
openWs()


export const setWSCallBack = (callback) => {
    mCallBackFC = callback
}

export const sendDataWS = (subscribeData ) => {
    if (subscribeData == null) return
    try {
        if (mWebSocket.readyState == WebSocket.CONNECTING) {
            preSubscribeData = subscribeData
        } else if (mWebSocket.readyState == WebSocket.OPEN) {
            mWebSocket.send(subscribeData)
        } else if (mWebSocket.readyState == WebSocket.CLOSED) {
            preSubscribeData = subscribeData
            openWs()
        }
        //console.warn('send',mWebSocket.readyState)
    } catch (e) {
        console.warn(e)
    }

}

export const clearAllWS = () => {
    sendDataWS(JSON.stringify({'event':'remove_all'}))
}

