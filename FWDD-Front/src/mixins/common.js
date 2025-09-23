export default {
    methods: {
        errorMsg() {
            this.$root.vtoast.show({
                icon: 'mdi-alert-circle-outline',
                title: 'System busy',
                message: 'Sorry, the system is currently unavaible. Please try again later',
                color: 'warning',
            });
        },

        warningMsg(title, msg) {
            this.$root.vtoast.show({
                icon: 'mdi-alert-circle-outline',
                title: title ? title : 'Warning',
                message: msg,
                color: 'warning',
            });
        },

        timeoutMsg() {
            this.$root.vtoast.show({
                icon: 'mdi-alert-circle-outline',
                title: 'Warning',
                message: 'The system is currently too busy to process the request, please try again later!',
                color: 'warning',
            });
        },

        updatedMsg(msg) {
            this.$root.vtoast.show({
                icon: 'mdi-check-circle-outline',
                title: 'Successfully Updated',
                message: msg,
                color: 'success',
            });
        },

        successMsg(val, msg) {
            this.$root.vtoast.show({
                icon: 'mdi-check-circle-outline',
                title: 'Successfully ' + val,
                message: msg,
                color: 'success',
            });
        },

        whoopsMsg() {
            this.$root.vtoast.show({
                icon: 'mdi-alert-circle-outline',
                title: 'Whoops',
                message: 'Something went wrong...',
                color: 'warning'
            })
        },

        navigatePush(routeName, params) {
            this.$router.push({ name: routeName, params: { ...params } }).catch(() => { });
        },

        navigateReplace(routeName, params) {
            this.$router.replace({ name: routeName, params: { ...params } }).catch(() => { });
        },
    },
};