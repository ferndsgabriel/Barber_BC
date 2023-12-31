interface reservationProps{
    HourStart:number,
    HourFinish:number, 
    user_id:string,
    date:number,
    collaborators_id:string,
    additional_id:string,
    hairStyle_id:string
}

class CreateReservationServices{
    async execute({HourStart, HourFinish, user_id, date, collaborators_id, additional_id, hairStyle_id}:reservationProps){
        
        if (!HourStart || !HourFinish || !user_id || !date || !collaborators_id || !additional_id){
            throw new Error('Digite todos os campos.');
        }
    }
}

export {CreateReservationServices}