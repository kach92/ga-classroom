module.exports = (dbPoolInstance) => {
    const all = async() => {
        try{
            const query = 'SELECT classrooms.id, classes.id AS class_id, classes.title,classes.instructor,classes.starttime,classes.endtime,classes.nickname FROM classrooms LEFT OUTER JOIN classes ON (classrooms.class_id = classes.id) ORDER BY id ASC';
            const queryResult = await dbPoolInstance.query(query);
            if (queryResult.rows.length > 0) {
                return queryResult.rows;
            } else {
                return Promise.reject(new Error("classroom#all return null"));
            }
        }catch(error){
            console.log("classroom#all model error")
        }
    }

    const find = async(classroom_id) =>{
        try{
            const query = "SELECT * FROM classrooms WHERE id = $1";
            const arr = [classroom_id];
            const queryResult = await dbPoolInstance.query(query,arr);
            if (queryResult.rows.length > 0) {
                return queryResult.rows[0];
            } else {
                return Promise.reject(new Error("create trip return null"));
            }
        }catch(error){
            console.log("classroom#find model error")
        }


    }

    const updateAll = async(classroom_details) =>{
        try{
            classroom_details.forEach(async (x)=>{
                const query = "UPDATE classrooms SET class_id = $1 WHERE id = $2"
                const arr = [x.class_id,x.id];
                const update = await dbPoolInstance.query(query,arr);
            })
            return true;

        }catch(error){
            console.log("classroom#update model error")
        }
    }

    return {
        all,
        find,
        updateAll
    }

}