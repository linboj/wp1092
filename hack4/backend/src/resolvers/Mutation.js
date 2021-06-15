const Mutation={
    async insertPeople(parent,{data},{db},info){
        try {
            data.map((inperson)=>{
                const  updateID= db.people.findIndex((person)=>person.ssn===inperson.ssn)
                //console.log(updateID)
                //console.log(db.people)
                if (updateID===-1){
                    db.people.push(inperson)
                    
                   
                }
                else{
                    db.people.splice(updateID,1,inperson)
                    
                }
            })
            //console.log(db.people)
            return  true
        } catch (error) {
            //console.log(error)
            return false
        }        
    }
};
export { Mutation as default };