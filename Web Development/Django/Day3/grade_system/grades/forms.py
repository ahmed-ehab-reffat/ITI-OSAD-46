from django import forms
from .models import Grade
from students.models import Student
from subjects.models import Subject

class GradeForm(forms.ModelForm):
    class Meta:
        model = Grade
        fields = ['student', 'subject', 'score']
        widgets = {
            'student': forms.Select(attrs={
                'class': 'form-select',
            }),
            'subject': forms.Select(attrs={
                'class': 'form-select',
            }),
            'score': forms.NumberInput(attrs={
                'class': 'form-control',
                'placeholder': '0 – 100',
                'min': 0,
                'max': 100,
                'step': '0.01',
            }),
        }
        labels = {
            'student': 'Student',
            'subject': 'Subject',
            'score': 'Score (out of 100)',
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['student'].queryset = Student.objects.order_by('name')
        self.fields['subject'].queryset = Subject.objects.order_by('code')

    def clean_score(self):
        score = self.cleaned_data.get('score')
        if score is None:
            raise forms.ValidationError('Score is required.')
        if score < 0 or score > 100:
            raise forms.ValidationError('Score must be between 0 and 100.')
        return score

    def clean(self):
        cleaned_data = super().clean()
        student = cleaned_data.get('student')
        subject = cleaned_data.get('subject')

        if student and subject:
            qs = Grade.objects.filter(student=student, subject=subject)
            if self.instance.pk:
                qs = qs.exclude(pk=self.instance.pk)
            if qs.exists():
                raise forms.ValidationError(
                    f'A grade for {student.name} in {subject.name} already exists. '
                    'Use the edit button to update it.'
                )
        return cleaned_data
