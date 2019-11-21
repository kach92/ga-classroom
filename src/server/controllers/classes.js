module.exports = (db) =>{
    const index  = async (req,res) => {
        try{
            const classes = await db.class1.all();
            res.send(classes);
        }catch(error){
            console.log("classes#index controller error")
        }
    }

    const show = async (req,res) => {
        try{
            const class1 = await db.class1.find(req.params.id);
            res.send(class1);
        }catch(error){
            console.log("classes#show controller error")
        }
    }


    return {
        index,
        show

    }
}