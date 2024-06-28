// teaController.js
const getTeas = (req, res) => {
    // Consulta la base de datos para obtener los datos de los tés
    const teas = [
      { name: 'English Breakfast', type: 'Black Tea' },
      { name: 'Green Tea', type: 'Green Tea' },
      // ...otros datos de tés
    ];
  
    res.json(teas);
  };
  
  module.exports = {
    getTeas,
    // Otras funciones de controlador aquí...
  };
  