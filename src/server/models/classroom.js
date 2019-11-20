module.exports = (dbPoolInstance) => {

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

    const updateNameById = async(classroom_id,new_name) =>{
        try{
            const query = "UPDATE classrooms SET name = $1 WHERE id = $2 RETURNING *";
            const arr = [new_name,classroom_id];
            let queryResult = await dbPoolInstance.query(query,arr);
            if (queryResult.rows.length > 0) {
                return queryResult.rows[0];
            } else {
                return Promise.reject(new Error("update classroom return null"));
            }
        }catch(error){
            console.log("classroom#update model error")
        }
    }

    return {
        find,
        updateNameById
    }

}