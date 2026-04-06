from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404, redirect
from django.db.models import Q, Sum, Avg, Count, Max
from .models import Grade
from .forms import GradeForm
from students.models import Student
from subjects.models import Subject

@login_required
def grade_list(request):
    query = request.GET.get('q', '').strip()
    grades = Grade.objects.select_related('student', 'subject').order_by(
        'student__name', 'subject__name'
    )

    if query:
        grades = grades.filter(
            Q(student__name__icontains=query) |
            Q(student__id__icontains=query) |
            Q(subject__name__icontains=query) |
            Q(subject__code__icontains=query)
        )

    summary = None
    if query and grades.exists():
        summary = grades.aggregate(
            avg_score=Avg('score'),
            max_score=Max('score'),
            count=Count('id'),
        )

    return render(request, 'grade_list.html', {
        'grades': grades,
        'query': query,
        'summary': summary,
    })

@login_required
def grade_detail(request, pk):
    grade = get_object_or_404(Grade.objects.select_related('student', 'subject'), pk=pk)
    return render(request, 'grade_detail.html', {'grade': grade})

@login_required
def grade_create(request):
    form = GradeForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect('grade_list')
    return render(request, 'grade_form.html', {
        'form': form,
        'title': 'Add Grade',
        'btn_label': 'Create',
    })

@login_required
def grade_update(request, pk):
    grade = get_object_or_404(Grade, pk=pk)
    form = GradeForm(request.POST or None, instance=grade)
    if form.is_valid():
        form.save()
        return redirect('grade_list')
    return render(request, 'grade_form.html', {
        'form': form,
        'title': f'Edit Grade — {grade.student.name} / {grade.subject.name}',
        'btn_label': 'Save Changes',
    })

@login_required
def grade_delete(request, pk):
    grade = get_object_or_404(Grade.objects.select_related('student', 'subject'), pk=pk)
    if request.method == 'POST':
        grade.delete()
        return redirect('grade_list')
    return render(request, 'grade_confirm_delete.html', {'grade': grade})

@login_required
def leaderboard(request):
    top_students = (
        Student.objects
        .annotate(
            total_score=Sum('grades__score'),
            subject_count=Count('grades__subject', distinct=True),
        )
        .filter(total_score__isnull=False)
        .order_by('-total_score')[:5]
    )

    data = []
    for rank, student in enumerate(top_students, start=1):
        subjects = (
            Subject.objects
            .filter(grades__student=student)
            .annotate(student_score=Sum('grades__score'))
            .order_by('name')
        )
        data.append({
            'rank': rank,
            'student': student,
            'subjects': subjects,
            'total': student.total_score or 0,
        })

    return render(request, 'leaderboard.html', {'data': data})
