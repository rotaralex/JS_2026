"use strict";
class OnlineCourse {
    courseName;
    durationHours;
    students = [];
    constructor(courseName, durationHours) {
        this.courseName = courseName;
        this.durationHours = durationHours;
    }
    registerStudent(student) {
        if (this.isStudentRegistered(student)) {
            console.log(`Студент ${student} вже зареєстрований на курс "${this.courseName}".`);
            return;
        }
        this.students.push(student);
        console.log(`Студента ${student} успішно додано до курсу "${this.courseName}".`);
    }
    isStudentRegistered(student) {
        return this.students.includes(student);
    }
}
class CourseManager {
    courses = [];
    addCourse(course) {
        this.courses.push(course);
        console.log(`Курс "${course.courseName}" додано до каталогу.`);
    }
    removeCourse(courseName) {
        const initialLength = this.courses.length;
        this.courses = this.courses.filter(c => c.courseName !== courseName);
        if (this.courses.length < initialLength) {
            console.log(`Курс "${courseName}" видалено.`);
        }
        else {
            console.log(`Курс "${courseName}" не знайдено.`);
        }
    }
    findCourse(courseName) {
        return this.courses.find(c => c.courseName.toLowerCase() === courseName.toLowerCase());
    }
    displayAllCourses() {
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
