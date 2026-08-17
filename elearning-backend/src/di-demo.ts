interface Database {
  getCourseById(id: number): string
}

interface CourseService {
  showCourse(id: number): string
}

class Container {
  private factories = new Map<string, (c: Container) => unknown>()
  private singletons = new Map<string, unknown>()

  register<T>(token: string, factory: (c: Container) => T): this {
    this.factories.set(token, factory)
    return this
  }

  resolve<T>(token: string) {
    if (this.singletons.has(token)) {
      return this.singletons.get(token) as T
    }

    const factory = this.factories.get(token)
    if (!factory) throw new Error(`Không có provider cho "${token}"`)

    const instance = factory(this)
    this.singletons.set(token, instance)

    return instance as T
  }
}

const container = new Container()
container
  .register<Database>('database', (c) => ({
    getCourseById(id) {
      return `Course ${id}: NestJS bán`
    },
  }))
  .register<CourseService>('courseService', (c) => {
    const db = c.resolve<Database>('database')

    return {
      showCourse(id) {
        return db.getCourseById(id)
      },
    }
  })

const svc = container.resolve<CourseService>('courseService')
console.log(svc.showCourse(1))
