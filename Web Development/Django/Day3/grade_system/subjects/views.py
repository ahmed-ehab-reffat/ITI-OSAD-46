from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404, redirect
from django.db.models import Q
from .models import Subject
from .forms import SubjectForm

@login_required
def subject_list(request):
    query = request.GET.get('q', '').strip()
    subjects = Subject.objects.all().order_by('code')

    if query:
        subjects = subjects.filter(
            Q(name__icontains=query) |
            Q(code__icontains=query) |
            Q(teacher__icontains=query) |
            Q(description__icontains=query)
        )

    return render(request, 'subject_list.html', {
        'subjects': subjects,
        'query': query,
    })

@login_required
def subject_detail(request, pk):
    subject = get_object_or_404(Subject, pk=pk)
    # Fetch all grades linked to this subject, with student info
    grades = subject.grades.select_related('student').order_by('-score')
    return render(request, 'subject_detail.html', {
        'subject': subject,
        'grades': grades,
    })

@login_required
def subject_create(request):
    form = SubjectForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect('subject_list')
    return render(request, 'subject_form.html', {
        'form': form,
        'title': 'Add Subject',
        'btn_label': 'Create',
    })

@login_required
def subject_update(request, pk):
    subject = get_object_or_404(Subject, pk=pk)
    form = SubjectForm(request.POST or None, instance=subject)
    if form.is_valid():
        form.save()
        return redirect('subject_list')
    return render(request, 'subject_form.html', {
        'form': form,
        'title': f'Edit — {subject.name}',
        'btn_label': 'Save Changes',
    })

@login_required
def subject_delete(request, pk):
    subject = get_object_or_404(Subject, pk=pk)
    if request.method == 'POST':
        subject.delete()
        return redirect('subject_list')
    return render(request, 'subject_confirm_delete.html', {
        'subject': subject,
    })
