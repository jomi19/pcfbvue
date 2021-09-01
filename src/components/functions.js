import { FOLLOWUPLIMIT } from "@/config.json"
const followUpLimit = FOLLOWUPLIMIT / 100;
const myFunctions = {
    getProgressColor: (total, done) => {
        if (done / total >= followUpLimit) return "green";
        return "red";
    },
    formatDate(date) {
        if(date === null) return
        let dateArray = date.split("T")
        return dateArray[0];
    },
    getPercent: (total, part) => {
        console.log(total)
        console.log(part)
        if(total === 0) return "-"
        return (part/total * 100).toFixed(0);
      },

}

export default myFunctions;