from django.shortcuts import render, redirect, get_object_or_404
from .models import Student, Feedback
from .forms import StudentForm, FeedbackForm

# Page 1 - Home
def home(request):
    return render(request, 'home.html')


# Page 2 - Students
def students(request):
    form = StudentForm()

    if request.method == 'POST':
        form = StudentForm(request.POST, request.FILES)  # request.FILES handles images
        if form.is_valid():
            form.save()
            return redirect('students')  # refresh the page after saving

    all_students = Student.objects.all()
    return render(request, 'students.html', {'form': form, 'students': all_students})


# Delete a student
def delete_student(request, student_id):
    student = get_object_or_404(Student, id=student_id)
    student.delete()
    return redirect('students')


# Page 3 - Contact Us
def contact(request):
    form = FeedbackForm()

    if request.method == 'POST':
        form = FeedbackForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('contact')  # refresh after saving

    return render(request, 'contact.html', {'form': form})
