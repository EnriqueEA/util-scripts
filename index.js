const fechaInicialProyecto = new Date('2024-10-07T05:00:00.000Z');
const diasEstimados = [18,6,8,5,5,5,5,10,4,4,4,6,4,4,4,4,8,4,3,8,5,3,3,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,2];
const feriados = [
   '01-01', // 01 de enero - Año Nuevo
   '04-17', // 17 de abril - Jueves Santo
   '04-18', // 18 de abril - Viernes Santo
   '05-01', // 01 de mayo - Día del Trabajo
   '06-07', // 07 de junio - Día de la Bandera
   '06-29', // 29 de junio - San Pedro y San Pablo
   '07-28', // 28 de julio - Fiestas Patrias
   '07-29', // 29 de julio - Fiestas Patrias
   '08-30', // 30 de agosto - Santa Rosa de Lima
   '10-08', // 08 de octubre - Combate de Angamos
   '11-01', // 01 de noviembre - Día de Todos los Santos
   '12-08', // 08 de diciembre - Inmaculada Concepción
   '12-09', // 09 de diciembre - Batalla de Ayacucho
   '12-25'  // 25 de diciembre - Navidad
];

const esFeriado = (fecha) => {
   const mesDiaStr = fecha.toISOString().slice(5, 10); // Obtener MM-DD
   return feriados.includes(mesDiaStr);
};

const esFinDeSemana = (fecha) => {
   const dia = fecha.getDay();
   return dia === 0 || dia === 6; // 0 es domingo y 6 es sábado
};

const sumarDiasHabiles = (fecha, dias) => {
   const nuevaFecha = new Date(fecha); // Crear una copia de la fecha
   let diasContados = dias === 1 ? 0 : 1;
   while (diasContados < dias) {
      nuevaFecha.setDate(nuevaFecha.getDate() + 1);
      if (!esFinDeSemana(nuevaFecha) && !esFeriado(nuevaFecha)) {
         diasContados++;
      }
   }
   return nuevaFecha;
};

const formatFecha = (fecha) => {
   const dia = String(fecha.getDate()).padStart(2, '0');
   const mes = String(fecha.getMonth() + 1).padStart(2, '0');
   const anio = fecha.getFullYear();
   const res = `${dia}/${mes}/${anio}`;
   return res;
};

let fechaInicio = new Date(fechaInicialProyecto);
const fechas = diasEstimados.map((dias) => {
   const fechaInicial = new Date(fechaInicio);
   const fechaFinal = sumarDiasHabiles(new Date(fechaInicio), dias);
   fechaInicio = sumarDiasHabiles(new Date(fechaFinal), 1); // Sumar un día hábil a la fecha final

   return {
      fechaInicial: formatFecha(fechaInicial),
      fechaFinal: formatFecha(fechaFinal)
   };
});
const excelOutput = fechas.map((fecha) => {
   return (`${fecha.fechaFinal}`)
}) // Use \r\n for new lines in Excel

console.log(excelOutput.join('\n'));
