const excelGenerator = (products, name, res) => {
    const xl = require('excel4node');

    products = products.map((product) => {
        let id = product._id.toString();
        delete product._id;
        return ({
            id,
            ...product
        })
    })

    let wb = new xl.Workbook();
    let ws = wb.addWorksheet('inventario');

    for (let i = 1; i <= products.length; i++) { //para moverse en las filas
        for (let j = 1; j <=  Object.keys(products[0]).length; j++) { // para moverse en las columnas
            let data = Object.values(products[i-1])[j-1]; //almacenar los datos en c/u de las celdas
            if (typeof data === 'string') {
                ws.cell(i, j).string(data);
            } else {
                ws.cell(i, j).number(data);
            }
        } 
    }

    wb.write(`${name}.xlsx`, res);

};

module.exports.ProductsUtils = {
    excelGenerator
}