module.exports = (dbPoolInstance) => {
    const all = async() => {
        try{
            const query = 'SELECT * FROM classrooms ORDER BY id ASC';
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
                const query = "UPDATE classrooms SET title = $1,instructor = $2,starttime = $3,endtime = $4,nickname = $5 WHERE id = $6"
                const arr = [x.title,x.instructor,x.starttime,x.endtime,x.nickname,x.id];
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