import type { Lessons } from './lessons'

export type MarkerTime = `${number | ''}${number}:${number}${number}`

export interface MarkerResponse {
   h: number
   m: number
}

export interface TimeResponse {
   h: number
   m: number
   s: number
   d: {
      index: number
      name: string
   }
}

export const timeFromMarker = (m: MarkerTime): MarkerResponse => ({
   h: parseInt(m.split(':')[0]),
   m: parseInt(m.split(':')[1]),
})

export const dateFromMarker = (m: MarkerTime): Date => {
   const c: Date = new Date()
   return new Date(
      c.getFullYear(),
      c.getMonth(),
      c.getDate(),
      timeFromMarker(m).h,
      timeFromMarker(m).m
   )
}

// noinspection JSUnusedGlobalSymbols
export const timeToEnd = (n: MarkerTime, e: MarkerTime): number | undefined => {
   const now = dateFromMarker(n).getTime()
   const end = dateFromMarker(e).getTime()
   if (now > end) {
      return
   }
   return Math.round((((end - now) % 86400000) % 3600000) / 60000)
}

export const getTime = (lessons: Lessons): TimeResponse => {
   const c: Date = new Date()
   return {
      h: c.getHours(),
      m: c.getMinutes(),
      s: c.getSeconds(),
      d: {
         index: c.getDay() - 1,
         name:
            typeof lessons.days[c.getDay() - 1] !== 'undefined'
               ? lessons.days[c.getDay() - 1].name
               : 'Вихідний',
      },
   }
}
