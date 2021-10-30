const Query ={
    findById:(model, column, columns = ['*'])=>{
        const query =`SELECT ${columns} FROM ${model} WHERE ${column} =?`
        return query
    },

    create:(model)=>{
        return  `INSERT INTO ${model} SET ? `
    },
    
    /**
     * 
     * @param {*} model 
     * @param {*} columns 
     * @param {*} column 
     * @param {*} condition 
     * @returns 
     */
    findOne:(model,columns,column)=>{
        const query = `SELECT ${columns} FROM  ${model} WHERE ${column} = ? LIMIT 1`
        return query
    },
    /**
     * 
     * @param {*} model 
     * @param {*} columnToUse 
     * @returns 
     */
    update:(model,columnToUse)=>{
        return `UPDATE ${model} SET ? WHERE ${columnToUse} = ? `
    }
}

module.exports = Query


function isPalindrome(str) {
    // split the string to array, reverse the array, then join the array with ''
    return str === str.split('').reverse().join(''); 
}
// vals  = vals.replace(/,(?=\s*$)/, '')//remove th e trailling comma from the end