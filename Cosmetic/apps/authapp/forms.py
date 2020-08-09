from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from Cosmetic.apps.mainapp.models import ShopUser
from django.contrib.auth.forms import UserChangeForm
from django import forms


class ShopUserLoginForm(AuthenticationForm):

    def get_invalid_login_error(self):
        return forms.ValidationError(
            self.error_messages['invalid_login'],
            code='invalid_login',
            params={'username': 'телефон'},
        )

    class Meta:
        model = ShopUser
        fields = ('phone', 'password')

    def __init__(self, *args, **kwargs):
        super(ShopUserLoginForm, self).__init__(*args, **kwargs)
        for fieldname in ['username']:
            self.fields[fieldname].label = 'Телефон (+7)'
        for field_name, field in self.fields.items():

            if field_name == 'username':
                field.widget.attrs['maxlength'] = 10
                field.widget.attrs['minlength'] = 10

            field.widget.attrs['class'] = 'form-control'

            if field_name == 'password':
                field.widget.attrs['minlength'] = 6


class ShopUserRegisterForm(UserCreationForm):
    class Meta:
        model = ShopUser
        fields = ('phone', 'email', 'first_name', 'last_name', 'password1', 'password2')

    def __init__(self, *args, **kwargs):
        super(ShopUserRegisterForm, self).__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            for field_name in ['phone']:
                self.fields[field_name].label = 'Телефон (+7)'

                if field_name == 'phone':
                    field.widget.attrs['maxlength'] = 10
                    field.widget.attrs['minlength'] = 10
            field.widget.attrs['class'] = 'form-control'
            field.help_text = ''

    def save(self, **kwargs):
        user = super(ShopUserRegisterForm, self).save()
        user.username = user.phone
        user.save()
        return user


class ShopUserEditForm(UserChangeForm):
    class Meta:
        model = ShopUser
        fields = ('phone', 'email', 'first_name', 'last_name', 'password')

    def __init__(self, *args, **kwargs):
        super(ShopUserEditForm, self).__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            field.widget.attrs['class'] = 'form-control'
            field.help_text = ''
            if field_name == 'password':
                field.widget = forms.HiddenInput()

    def save(self, **kwargs):
        user = super(UserChangeForm, self).save()
        user.username = user.phone
        user.save()
        return user
