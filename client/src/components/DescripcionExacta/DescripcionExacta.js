import {nvaHora} from './NvaHora'
export default function DescripcionExacta({fecha, hora, direccion, distrito}) {
    const dias = [
        'lunes',
        'martes',
        'miércoles',
        'jueves',
        'viernes',
        'sábado',
        'domingo'
        ]
    const meses = [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre'
    ]
    const elemFecha = fecha.split('-')
    const numDia = () => {
        if (elemFecha[2][0] === '0'){
            return elemFecha[2][1]
        } else {
            return elemFecha[2]
        }
    }
    const mes = Number(elemFecha[1])
    const numDiaSemana = new Date(fecha).getDay()
    const dia = dias[numDiaSemana]

    return <textarea name="" id="" cols="27" rows="5" className='Cart_input_textarea' readOnly="readonly" style={{backgroundColor:'green', color:'white'}} value={`Entrega programada para el ${dia} ${numDia()} de ${meses[mes-1]} del ${elemFecha[0]} en ${direccion} del distrito de ${distrito} a las ${nvaHora(hora)}.`} />
}
