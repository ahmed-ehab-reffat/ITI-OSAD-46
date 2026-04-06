from django import forms
from .models import Subject

class SubjectForm(forms.ModelForm):
    class Meta:
        model = Subject
        fields = ['name', 'code', 'description', 'teacher']
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'e.g. Mathematics',
            }),
            'code': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'e.g. MATH101',
            }),
            'description': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 3,
                'placeholder': 'Brief description of the subject...',
            }),
            'teacher': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'e.g. Dr. Ahmed',
            }),
        }
        labels = {
            'name': 'Subject Name',
            'code': 'Subject Code',
            'description': 'Description',
            'teacher': 'Teacher / Instructor',
        }

    def clean_code(self):
        code = self.cleaned_data.get('code', '').upper().strip()
        qs = Subject.objects.filter(code=code)
        if self.instance.pk:
            qs = qs.exclude(pk=self.instance.pk)
        if qs.exists():
            raise forms.ValidationError(f'A subject with code "{code}" already exists.')
        return code
