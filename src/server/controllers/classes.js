module.exports = (db) =>{
    const index  = async (req,res) => {
        try{
            const classes = await db.class1.all();
            res.send(classes);
        }catch(error){
            console.log("classes#index controller error");
        }
    }

    const show = async (req,res) => {
        try{
            const class1 = await db.class1.find(req.params.id);
            res.send(class1);
        }catch(error){
            console.log("classes#show controller error "+ error);
        }
    }

    const create = async (req,res) => {
        try{
            const newClass = await db.class1.save(req.body.data);
            res.send(newClass);
        }catch(error){
            console.log("classes#create controller error " + error);
        }
    }

    const deleteClass = async (req,res) => {
        try{
            const deletedClass = await db.class1.deleteClass(req.params.id);
            res.send(deletedClass);
        }catch(error){
            console.log("classes#delete controller error " + error);
        }
    }


    return {
        index,
        show,
        create,
        deleteClass

    }
}