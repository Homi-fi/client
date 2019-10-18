import { db } from '../configs/firebase'

export const User = db.collection('doors')
export const Lamp = db.collection('lamps')
export const Room = db.collection('rooms')
export const Sensor = db.collection('sensor')