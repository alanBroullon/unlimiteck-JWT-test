from django import forms
from django.forms import ModelForm
from backend.models import UserNotes
from django.contrib.auth.models import User


class RegistrationForm(forms.ModelForm):
    first_name = forms.CharField(required=False, min_length=2, max_length=50)
    last_name = forms.CharField(required=False, min_length=2, max_length=50)
    email = forms.CharField(required=True)

    class Meta():
        model = User
        fields = (
            'first_name',
            'last_name',
            'email',
            'password',
        )

    def clean_password(self):
        password = self.cleaned_data.get('password')
        return password

    def clean_email(self):
        email = self.cleaned_data.get('email').lower()
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError('Este mail ya ha sido registrado')
        return email

    def save(self):
        user = super(RegistrationForm, self).save()
        user.username = self.cleaned_data['email']
        user.set_password(self.cleaned_data['password'])
        user.save()
        return user


class NoteFrom(forms.Form):
    name = forms.CharField()
    note = forms.CharField()
    image = forms.ImageField(required=False)
    user = forms.Field()

    def process(self):
        note = self.cleaned_data['note']
        name = self.cleaned_data['name']
        image = self.data['image']
        user = self.data['user']

        user_notes = UserNotes.objects.create(name=name, note=note, image=image, user=user)
        user_notes.save()
