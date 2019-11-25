module.exports = (db) =>{
    const index  = async (req,res) => {
        try{
            const classrooms = await db.classroom.all();
            const classes = await db.class1.all();

            res.send({classrooms,classes});
        }catch(error){
            console.log("classrooms#index controller error " + error)
        }
    }
    const show = async (req,res) => {
        try{
            let classroom = await db.classroom.find(req.params.id);
            res.send(classroom);
        }catch(error){
            console.log("classrooms#show controller error " + error);
        }
    }

    const update = async (req,res) =>{

        try{
            const update = await db.classroom.updateAll(req.body.data)
            if(update){
                res.send(true);
            }
        }catch(error){
            console.log("classroom#update controller error " +error)
        }
    }

    return {
        index,
        show,
        update
    }
}