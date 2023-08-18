<template>
    <div class="messageContainer" :class="{meMessage: origin == 'me', outherMessage: origin == 'outher'}">
        <div class="message">
            <div class="top">
                <div class="senderName" v-if="sender">@{{ sender }}</div>
                <div class="dateTime">{{ (date.getDate()).toString().padStart(2,'0') }}/{{ (date.getMonth() + 1).toString().padStart(2,'0') }}/{{ date.getFullYear() }} - {{ date.getHours().toString().padStart(2,'0') }}:{{ date.getMinutes().toString().padStart(2,'0') }}:{{ date.getSeconds().toString().padStart(2,'0') }}</div>
            </div>
            <div class="messageBody">
                {{ message }}
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .meMessage{
        justify-content: right;
        .message{
            background-image: linear-gradient(to top, #242, #295029);
        }
    }
    .outherMessage{
        justify-content: left;
        .message{
            background-image: linear-gradient(to top, #222, #292929);
        }
    }
    .messageContainer{
        width: 491px;
        margin-top: 10px;
        margin-bottom: 10px;
        padding-left: 15px;
        padding-right: 15px;
        display: flex;

        .message{
            width: max-content;
            max-width: 380px;
            height: max-content;
            border-radius: 10px;
            color: #ccc;
            padding: 5px;

            .top{
                display: flex;
                justify-content: left;
                align-items: center;
                margin-bottom: 10px;
                color: #999;

                .dateTime{
                    margin-right: 30px;
                    font-size: 14px;
                }
                .senderName{
                    margin-right: 15px;
                    color: #bbb;
                }
            }
            .messageBody{
                padding-left: 5px;
                padding-right: 5px;
                padding-bottom: 5px;
            }
        }
    }
</style>

<script>
    export default{
        name: 'Message',
        props: ['origin','message','date','sender']
    }
</script>