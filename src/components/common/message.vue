<template>
    <div></div>
</template>
<script>
import eventBus from '../../utils/eventBus';
import EventsName from '../../constants/eventsName';
import { constants } from 'crypto';
export default {
    name: "alert-message",
    mounted(){
        this.registerListener()
    },
    methods: {
        registerListener(){
            eventBus.$on(EventsName.SHOW_ALERT_MESSAGE, (error) => {
                console.log('aaa',JSON.stringify(error));
                this.$message.error(`出错啦!${error.code}:${error.message}`);
            });
        }
    }
}
</script>

