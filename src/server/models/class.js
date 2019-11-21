module.exports = (dbPoolInstance) => {
    const all = async() => {
        try{
            const query = 'SELECT * FROM classes ORDER BY id ASC';
            const queryResult = await dbPoolInstance.query(query);
            if (queryResult.rows.length > 0) {
                return queryResult.rows;
            } else {
                return Promise.reject(new Error("class#all return null"));
            }
        }catch(error){
            console.log("class#all model error")
        }
    }


    return {
        all
    }

}