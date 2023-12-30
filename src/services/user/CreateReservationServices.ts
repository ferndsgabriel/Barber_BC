interface reservationProps{
    HourStart:number,
    HourFinish:number, 
    user_id:string,
    date:string
}

class CreateReservationServices{
    async execute({HourStart, HourFinish, user_id, date}:reservationProps){
        if (!HourStart || !HourFinish || !user_id || !date){
            throw new Error('Digite todos os campos.');
        }
    }
}

export {CreateReservationServices}