const makeName = (name, to) => {
    return [name, to].sort().join('_');
  };

const Query = {
    statsCount(parent,{severity,locationKeywords},{ db },info) {
        const output = [];
        try {
            if (!severity){
            locationKeywords.forEach((keyword)=>{
                let count=0
                db.people.forEach((person)=>{
                    if (person.location.description.includes(keyword)){
                        count=count+1
                    }
                })
                output.push(count)
            })
            return output
        }
        else{
            locationKeywords.forEach((keyword)=>{
                let count=0
                db.people.forEach((person)=>{
                    if (person.location.description.includes(keyword)&&person.severity>=severity){
                        count=count+1
                    }
                })
                output.push(count)
            })
            return output
        }
        } catch (error) {
            return null
        }
        
        return db.ChatBoxModel.findOne({name:chatBoxName});
    },
};

export { Query as default };