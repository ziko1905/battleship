import "./styles.css";
import PubSub from "pubsub-js";


const f = () => {
    console.log('Hello Babel!')
}

f()

PubSub.subscribe("1", f)