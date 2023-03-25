/**
 * 
 * @param {Array} data 
 * @param {number} num_columns 
 */
/*
This Function is for recalculating and mutating an array of data to make up for the empty columns and rows in a grid layout.
*/
export const format_grid_elements = (data,num_columns)=>{
    const number_of_full_rows = Math.floor(data.length / num_columns);
    let number_of_elements_last_row = data.length - (number_of_full_rows * num_columns)
    while(number_of_elements_last_row !== num_columns && number_of_elements_last_row !== 0){
        data.push({empty:true})
        number_of_elements_last_row = number_of_elements_last_row + 1
    
    }
    return data;
    
}