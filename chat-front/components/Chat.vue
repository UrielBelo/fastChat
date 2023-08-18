<template>
    <div id="pageContainer">
        <div id="chat">
            <div id="setUserNameContainer">
                <input type="text" placeholder="Digite seu nome aqui..." v-model="usernameTemp" :class="{nameDefined: usernameTrue && usernameTrue != ''}">
                <button @click="setUsername">Definir</button>
            </div>
            <div id="chatArea">
                <Message v-for="c of chat" :date="c.date" :message="c.message" :origin="c.origin" :sender="c.sender"/>
            </div>
            <div id="sendMessageContainer">
                <div id="sendMessage">
                    <div id="sendMessageInput">
                        <input type="text" v-model="messageInput" ref="messageInput">
                        <button @click="sendMessage">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="gray" class="bi bi-send" viewBox="0 0 16 16">
                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    #pageContainer{
        width: 100vw;
        height: 100vh;
        background-image: linear-gradient(to top, #222, #333);
        display: flex;
        justify-content: center;
        align-items: center;

        #chat{
            width: 500px;
            height: 800px;
            background-image: linear-gradient(to top, #555, #444);
            border-radius: 10px;
            transform: rotateX('5deg') rotateY('4deg');
            box-shadow: 4px 4px 4px black;

            #setUserNameContainer{
                height: 50px;
                border-bottom: 1px solid #333;
                display: flex;
                justify-content: space-around;
                align-items: center;

                input{
                    width: 380px;
                    border: 0;
                    background-color: #222;
                    height: 35px;
                    border-radius: 10px;
                    color: #eee;
                    padding-left: 10px;
                }
                input:focus{
                    outline: 0;
                }
                button{
                    width: 90px;
                    height: 35px;
                    border: 2px solid green;
                    background-color: green;
                    border-radius: 10px;
                    font-weight: 600;
                    color: white;
                    transition: .5s ease;
                }
                button:hover{
                    background-color: transparent;
                }
                .nameDefined{
                    background-color: #232;
                }
            }
            #chatArea{
                width: 500px;
                height: 700px;
                max-height: 700px;
                min-height: 700px;
                max-width: 500px;
                overflow-y: scroll;
                border-bottom: 1px solid #333;
            }
            #chatArea::-webkit-scrollbar{
                width: 9px;
            }
            #chatArea::-webkit-scrollbar-track{
                background: #222;
            }
            #chatArea::-webkit-scrollbar-thumb{
                background: #111;
                border-radius: 2px;
            }
            #sendMessageContainer{
                width: 500px;
                display: flex;
                justify-content: center;
                align-items: center;
                height: calc(800px - 50px - 700px);

                #sendMessageInput{
                    background-color: #333;
                    height: 35px;
                    width: 480px;
                    border-radius: 10px;
                    display: flex;
                    justify-content: space-around;

                    input{
                        width: 400px;
                        border: 0;
                        background-color: transparent;
                        color: #eee;
                    }
                    input:focus{
                        outline: 0;
                    }
                    button{
                        border: 0;
                        background-color: transparent;
                    }
                    button:focus{
                        outline: 0;
                        filter: contrast(4);
                    }
                }
            }
        }
    }
</style>

<script>
import Message from './Message.vue';

export default{
    name: 'Chat',
    created(){
        const ipSocketServer = window.location.href
        .replace(':3000',':3001')
        .replace('http://','ws://')

        this.webSocketObj = new WebSocket(ipSocketServer)

        this.webSocketObj.onmessage = (evt) => {
            const msgObj = JSON.parse(evt.data)

            const parsedObj = {
                origin: 'outher',
                sender: msgObj.username,
                date: new Date(msgObj.date),
                message: msgObj.message
            }

            this.chat.push(parsedObj)
        }

        document.addEventListener('keyup', (ev) => {
            if(ev.code == 'Enter' && ev.shiftKey){
                () => {
                    this.messageInput = this.messageInput + '\n'
                }
            }else if(ev.code == 'Enter' && !ev.shiftKey){
                this.sendMessage()
            }
        })
    },
    data() {
        return {
            chat: [],
            usernameTemp: '',
            usernameTrue: '',
            messageInput: '',
            webSocketObj: null
        };
    },
    methods: {
        setUsername: function(){
            this.usernameTrue = this.usernameTemp

        },
        sendMessage: function(){
            if(!this.usernameTrue && this.usernameTrue == ''){
                alert('Favor defina um nome de usuário para poder enviar mensagens')
            }else if(this.messageInput != ''){
                this.chat.push({
                    origin: 'me',
                    message: this.messageInput,
                    date: new Date()
                })

                this.webSocketObj.send(JSON.stringify({
                    username: this.usernameTrue,
                    date: new Date(),
                    message: this.messageInput
                }))

                this.messageInput = ''
            }
        },
    },
    components: { Message }
}
</script>