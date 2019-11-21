module.exports = (db) =>{
    const index  = async (req,res) => {
        try{
            const classrooms = await db.classroom.all();
            res.send(classrooms);
        }catch(error){
            console.log("classrooms#index controller error")
        }
    }
    const show = async (req,res) => {
        try{
            let classroom = await db.classroom.find(req.params.id);
            res.send({name:classroom.name})
        }catch(error){
            console.log("classrooms#show controller error")
        }
    }

    const update = async (req,res) =>{
        console.log(req.params.id);
        console.log(req.body.input);
        try{
            let updated = await db.classroom.updateNameById(req.params.id,req.body.input);
            res.send(true);
        }catch(error){
            console.log("classroom#update controller error")
        }
    }

    return {
        index,
        show,
        update
    }
}