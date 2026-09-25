interface Course {
  courseName: string;
  durationHours: number;
  students: string[];
}

class OnlineCourse implements Course {
  public students: string[] = [];

  constructor(
    public courseName: string,
    public durationHours: number
  ) {}

  registerStudent(student: string): void {
    if (this.isStudentRegistered(student)) {
      console.log(`Студент ${student} вже зареєстрований на курс "${this.courseName}".`);
      return;
    }
    this.students.push(student);
    console.log(`Студента ${student} успішно додано до курсу "${this.courseName}".`);
  }

  isStudentRegistered(student: string): boolean {
    return this.students.includes(student);
  }
}

class CourseManager {
  private courses: Course[] = [];

  addCourse(course: Course): void {
    this.courses.push(course);
    console.log(`Курс "${course.courseName}" додано до каталогу.`);
  }

  removeCourse(courseName: string): void {
    const initialLength = this.courses.length;
    this.courses = this.courses.filter(c => c.courseName !== courseName);
    if (this.courses.length < initialLength) {
      console.log(`Курс "${courseName}" видалено.`);
    } else {
      console.log(`Курс "${courseName}" не знайдено.`);
    }
  }

  findCourse(courseName: string): Course | undefined {
    return this.courses.find(c => c.courseName.toLowerCase() === courseName.toLowerCase());
  }

  displayAllCourses(): void {
    console.log("\n--- Список курсів та зареєстрованих студентів ---");
    this.courses.forEach(course => {
      console.log(`Курс: ${course.courseName} (${course.durationHours} год.)`);
      console.log(`  Студенти: ${course.students.length > 0 ? course.students.join(", ") : "немає"}`);
    });
  }
}

const manager = new CourseManager();

const tsCourse = new OnlineCourse("TypeScript Basics", 30);
const reactCourse = new OnlineCourse("React & Modern Web", 45);

manager.addCourse(tsCourse);
manager.addCourse(reactCourse);

tsCourse.registerStudent("Тарас Шевченко");
tsCourse.registerStudent("Леся Українка");
reactCourse.registerStudent("Іван Франко");
tsCourse.registerStudent("Тарас Шевченко"); // Спроба дублювання

manager.displayAllCourses();