import { differenceInMilliseconds, format } from "date-fns"

export const convertDate = (element: string): string => {
    if(element == null || element === '' || element === undefined) return ' - ';
    const dateFormat = format(new Date(element), 'dd/MM/yyyy HH:mm:ss');
    return dateFormat
}

export const diffInHorus = (date1: string, date2: string): string => {
    if(date2 == null || date2 === '' || date2 === undefined) return ' - ';
    const diffInMilliseconds = (differenceInMilliseconds(date1, date2));

    const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffInMilliseconds % (1000 * 60)) / 1000);

    const diff = format(new Date(0, 0, 0, hours, minutes, seconds), 'HH:mm:ss');
    return `${diff}`
}


export const  calcDiff = (data1: any, data2: any) =>  {
    const diffInMilissegundos = differenceInMilliseconds(data2, data1);
    return diffInMilissegundos / (1000 * 60 * 60);
}
export const calcHours = (data1: any, data2: any, numero: any) => {
    const diff = calcDiff(data1, data2);
    return Math.abs(numero - diff);
}

export const formatarHoras = (data1: any, data2: any, numero: any) => {

    console.log("data1", data1)
    console.log("data2", data2)
    console.log("numero",numero)
    if(data2 == null || data2 === '' || data2 === undefined) return ' - ';
    const horas = calcHours(data1, data2, numero);
    const horasInteiras = Math.floor(horas);
    const minutos = Math.floor((horas - horasInteiras) * 60);
    const segundos = Math.floor(((horas - horasInteiras) * 60 - minutos) * 60);

    return format(new Date(0, 0, 0, horasInteiras, minutos, segundos), 'HH:mm:ss');
}


