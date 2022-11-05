import type {MarkerTime} from './date'

// noinspection JSUnusedGlobalSymbols
export type DayName = 'Понеділок' | 'Вівторок' | 'Середа' | 'Четвер' | "П'ятниця"
export type LessonName =
  'Хімія'
  | 'Християнська етика'
  | 'Правознавство'
  | 'Громадянська освіта'
  | 'Мистецтво'
  | 'Медицина'
  | 'Географія'
  | 'Інформатика'
  | 'Українська література'
  | 'Алгебра'
  | 'Математика'
  | 'Англійська мова'
  | 'Українська мова'
  | 'Історія України'
  | 'Всесвітня історія'
  | 'Історія'
  | 'Фізкультура'
  | 'Геометрія'
  | 'Трудове навчання'
  | 'Німецька мова'
  | 'Фізика'
  | 'Зарубіжна література'
  | 'Біологія'
  | 'Захист Вітчизни'

export interface Day {
  name: string
  lessons: LessonName[]
}

export interface Schedule {
  start: MarkerTime
  end: MarkerTime
}

export interface Lessons {
  days: Day[]
  schedule: Schedule[]
}

interface LessonsSchedule {
  start: number
  end: number
}

export interface Lesson {
  index: number | null
  name: string
}

export const getLessonsSchedule = (
  c: Date,
  lessons: Lessons,
  t: Schedule | null = null
): LessonsSchedule => {
  const createDate = (h: string, m: string): number =>
    new Date(
      c.getFullYear(),
      c.getMonth(),
      c.getDate(),
      parseInt(h),
      parseInt(m)
    ).getTime()

  if (t === null) {
    return {
      start: createDate(
        lessons.schedule[0].start.split(':')[0],
        lessons.schedule[0].start.split(':')[1]
      ),
      end: createDate(
        lessons.schedule[lessons.schedule.length - 1].end.split(':')[0],
        lessons.schedule[lessons.schedule.length - 1].end.split(':')[1]
      ),
    }
  }
  return {
    start: createDate(t.start.split(':')[0], t.start.split(':')[1]),
    end: createDate(t.end.split(':')[0], t.end.split(':')[1]),
  }
}

export const getLesson = (lessons: Lessons): Lesson => {
  const c: Date = new Date()
  const t: number = c.getTime()
  const schedule: LessonsSchedule = getLessonsSchedule(c, lessons)
  const d: number = c.getDay() - 1
  let value: Lesson = {
    index: null,
    name: 'Перерва',
  }

  if (typeof lessons.days[d] === 'undefined') {
    return {
      index: null,
      name: 'Сьогодні вихідний',
    }
  }

  if (schedule.start >= t || t >= schedule.end) {
    return {
      index: null,
      name: 'Уроків немає',
    }
  }

  lessons.schedule.forEach((time: Schedule, i: number) => {
    const lessonRange: LessonsSchedule = getLessonsSchedule(c, lessons, time)
    if (lessonRange.start <= t && t <= lessonRange.end) {
      value = {
        index: i,
        name: lessons.days[d]?.lessons[i],
      }
    }
  })

  return (
    value.name ? value : {
      index: null,
      name: 'Уроків немає',
    }
  )
}
