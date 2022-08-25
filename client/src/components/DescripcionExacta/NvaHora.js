export const nvaHora = (hora) => {
    let nvaHora = ''
    if(Number(hora.substr(0, 2))>12){
        nvaHora = `${Number(hora.substr(0, 2))-12}:${hora.substr(3, 4)} pm`
    } else if ( Number(hora.substr(0, 2))==12 ){
        nvaHora = `${Number(hora.substr(0, 2))}:${hora.substr(3, 4)} del mediodía`
    } else {
        nvaHora = `${Number(hora.substr(0, 2))}:${hora.substr(3, 4)} am`
    }
    return nvaHora
}