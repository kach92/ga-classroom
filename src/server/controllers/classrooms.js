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

        try{
            const update = await db.classroom.updateAll(req.body.data)
            if(update){
                res.send(true);
            }
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