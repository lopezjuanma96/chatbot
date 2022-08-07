import keywords from './bot-kws.js';

class BotLogic{
    keywords;
    userData;
    constructor(data){
        this.userData = data;
        this.keywords = keywords;
    }

    processQ(msg){
        const scores = []
        msg.split(" ").forEach((w) => { 
            const found = this.keywords.findIndex((e) => e.kw === w) //could be found for fuzzy string matching
            if (found > -1){
                scores.push([found, this.scoreMet(msg, this.keywords[found])]);
            }
        })
        const sorted = scores.sort((a,b) => b[1]-a[1])
        return sorted
    }

    processA(res){
        return this.keywords[res[0][0]].responses[0]
    }

    scoreMet(text, kw){
        var main_index;
        const link_index = [];
        text.split(" ").forEach((w, i) => {
            if (w === kw.kw){
                main_index = i;
            } else if (kw.links.includes(w)){
                link_index.push(i);
            }
        })
        var sum = 0;
        link_index.forEach((i) => sum += 1/Math.abs(i-main_index))
        return sum;
    }
}

const l = new BotLogic({userName: 'Juan'});
const res = l.processQ('hola podría yo saber mi nombre porque quiero');
console.log(res, l.processA(res));