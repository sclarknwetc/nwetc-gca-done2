const COURSE_ID = 'Nzg1OTAxMTE1MTI1'; // Replace with your Google Classroom course ID
const ASSIGNMENT_IDS = ['assignment-id-1', 'assignment-id-2']; // Replace with your specific assignment IDs

function autoGradeSubmissions() {
  ASSIGNMENT_IDS.forEach(assignmentId => {
    let submissions = Classroom.Courses.CourseWork.StudentSubmissions.list(COURSE_ID, assignmentId, {
      states: ['TURNED_IN']
    });

    if (!submissions.studentSubmissions) return;

    submissions.studentSubmissions.forEach(submission => {
      const submissionId = submission.id;

      // Update the assignedGrade to 100
      const gradeUpdate = {
        assignedGrade: 100
      };
      Classroom.Courses.CourseWork.StudentSubmissions.patch(gradeUpdate, COURSE_ID, assignmentId, submissionId, {
        updateMask: 'assignedGrade'
      });

      // Mark as RETURNED
      Classroom.Courses.CourseWork.StudentSubmissions.returnSubmissions(COURSE_ID, assignmentId, {
        submissionIds: [submissionId]
      });
    });
  });
}
