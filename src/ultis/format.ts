export function addZero (value:string | number){
    const inString = value.toString();
    const intValue = parseInt(inString);

    if (intValue < 10){
        return `0${intValue}`;
    }else{
        return value;
    }
}

export function formatHour(hour:number){
    const string = hour.toString();
    if ( string.length < 3 || string.length > 4){
        return false;
    }
    if (string.length === 3){
        const hours = string.substring(0,1);
        const intSubHours = parseInt(hours);
        if (intSubHours < 0 || intSubHours > 23){
            return false
        }
        const minutes = string.substring(1,3);
        const intSubMinutes = parseInt(minutes);
        if (intSubMinutes < 0 || intSubMinutes > 59){
            return false
        }
    }
    if (string.length === 4){
        const hours = string.substring(0,2);
        const intSubHours = parseInt(hours);
        if (intSubHours < 0 || intSubHours > 23){
            return false
        }
        const minutes = string.substring(2,4);
        const intSubMinutes = parseInt(minutes);
        if (intSubMinutes < 0 || intSubMinutes > 59){
            return false
        }
    }
}

export function FormatName(name:string){
    const noSpace = name.trim();
    const lowerCase = noSpace.toLowerCase();
    const upper = lowerCase[0].toUpperCase();
    const removeFirst = lowerCase.substring(1);

    return `${upper}${removeFirst}`;
}