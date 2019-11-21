module.exports = (db) =>{
    const index  = async (req,res) => {
        try{
            const classes = await db.class1.all();
            res.send(classes);
        }catch(error){
            console.log("classes#index controller error")
        }
    }


    return {
        index

    }
}