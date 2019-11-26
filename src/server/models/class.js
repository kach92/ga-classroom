module.exports = (dbPoolInstance) => {
    const all = async() => {
        try{
            const query = 'SELECT * FROM classes ORDER BY nickname ASC';
            const queryResult = await dbPoolInstance.query(query);
            if (queryResult.rows.length > 0) {
                return queryResult.rows;
            } else {
                return Promise.reject(new Error("class#all return null"));
            }
        }catch(error){
            console.log("class#all model error " + error);
        }
    }

    const find = async (class_id) => {
        try{
            const query = 'SELECT id AS class_id,title,instructor,starttime,endtime,nickname FROM classes WHERE id = $1';
            const arr = [class_id];
            const queryResult = await dbPoolInstance.query(query,arr);
            if (queryResult.rows.length > 0) {
                return queryResult.rows[0];
            } else {
                return Promise.reject(new Error("class#find return null"));
            }
        }catch(error){
            console.log("class#find model error " + error);
        }
    }

    const save = async (details) => {
        try{
            const query = "INSERT INTO classes (title,instructor,starttime,endtime,nickname) VALUES ($1,$2,$3,$4,$5) RETURNING *";
            const arr = [details.title,details.instructor,details.starttime,details.endtime,details.nickname];
            const queryResult = await dbPoolInstance.query(query,arr);
            if (queryResult.rows.length > 0) {
                return queryResult.rows[0];
            } else {
                return Promise.reject(new Error("class#save return null"));
            }
        }catch(error){
            console.log("class#save model error " + error);
        }
    }

    const deleteClass = async (class_id) =>{
        try{
            const query = "DELETE FROM classes WHERE id = $1 RETURNING *";
            const arr = [class_id];
            const queryResult = await dbPoolInstance.query(query,arr);
            if (queryResult.rows.length > 0) {
                return queryResult.rows[0];
            } else {
                return Promise.reject(new Error("class#save return null"));
            }

        }catch(error){
            if(error.code === "23503"){
                return false;
            }else{
                console.log("class#delete model error " + error);
            }

        }
    }


    return {
        all,
        find,
        save,
        deleteClass
    }

}