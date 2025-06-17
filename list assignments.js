function listAssignments() {
  const COURSE_ID = '785901115125'; // Your Course ID

  const courseworkList = Classroom.Courses.CourseWork.list(COURSE_ID);

  if (!courseworkList.courseWork || courseworkList.courseWork.length === 0) {
    Logger.log('No assignments found.');
    return;
  }

  courseworkList.courseWork.forEach(work => {
    Logger.log(`Title: ${work.title}, ID: ${work.id}, Due: ${work.dueDate ? `${work.dueDate.year}-${work.dueDate.month}-${work.dueDate.day}` : 'No due date'}`);
  });
}
