import { FOLLOWUPLIMIT } from "@/config.json"
const followUpLimit = FOLLOWUPLIMIT / 100;
const myFunctions = {
    getProgressColor: (total, done) => {
        if (total / done >= followUpLimit) return "green";
        return "red";
    },
    formatDate(date) {
        if(date === null) return
        let dateArray = date.split("T")
        return dateArray[0];
    },

}

export default myFunctions;