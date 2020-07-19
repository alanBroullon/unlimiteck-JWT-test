import Vue from 'vue';
import Component from 'vue-class-component';
import Header from 'Components/Header';

@Component({
    components:{
        Header,
    }
})
export default class App extends Vue {

    /**
     * To know if we can show the header, this is in te case if we have a user logged.
     *
     * @returns {boolean} if axist a user logged, cant be null.
     */
    get showHeader() {
        return this.$store.getters.getUserRole !== null ? true : false;
    }
}
