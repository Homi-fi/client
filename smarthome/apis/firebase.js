import { db } from '../configs/firebase'

export const Door = db.collection('door')
export const Lamp = db.collection('lamps')
export const Room = db.collection('rooms')
export const Sensor = db.collection('sensors')
export const Scheduler = db.collection('schedulers')
