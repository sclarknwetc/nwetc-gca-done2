const COURSE_ID = '785901115125';
const ASSIGNMENT_IDS = ['787351118988', '782306427837'];
const DEFAULT_GRADE = 100;

function autoGradeSubmissions() {
  ASSIGNMENT_IDS.forEach(assignmentId => {
    const submissions = Classroom.Courses.CourseWork.StudentSubmissions.list(COURSE_ID, assignmentId, {
      states: ['TURNED_IN']
    });

    const studentSubmissions = submissions.studentSubmissions || [];
    if (studentSubmissions.length === 0) {
      Logger.log(`No TURNED_IN submissions for assignment ${assignmentId}`);
      return;
    }

    studentSubmissions.forEach(submission => {
      const submissionId = submission.id;

      // Assign grade
      Classroom.Courses.CourseWork.StudentSubmissions.patch(
        { assignedGrade: DEFAULT_GRADE },
        COURSE_ID,
        assignmentId,
        submissionId,
        { updateMask: 'assignedGrade' }
      );

      // Return the submission
      Classroom.Courses.CourseWork.StudentSubmissions.returnSubmissions(COURSE_ID, assignmentId, {
        submissionIds: [submissionId]
      });

      Logger.log(`Graded and returned submission ${submissionId} for assignment ${assignmentId}`);
    });
  });
}
