import graphene
import graphql_jwt
from django.contrib.auth.models import User
from graphene_django.forms.mutation import DjangoModelFormMutation
from graphene_django.types import DjangoObjectType
from graphql_jwt.decorators import login_required, staff_member_required, superuser_required
from rest_framework.authtoken.models import Token
from backend.api.forms import RegistrationForm, NoteFrom
from graphene_file_upload.scalars import Upload
from backend.models import UserNotes


class OutputObjectType(graphene.Scalar):
    @staticmethod
    def serialize(value):
        return value


class UserType(DjangoObjectType):
    class Meta:
        model = User


class NotesType(DjangoObjectType):
    class Meta:
        model = UserNotes


class TokenType(DjangoObjectType):
    class Meta:
        model = Token


class RegisterFieldsType(graphene.InputObjectType):
    first_name = graphene.String()
    last_name = graphene.String()
    email = graphene.String()
    password = graphene.String()


class UploadImage(graphene.Mutation):
    class Arguments:
        name = graphene.String()
        note = graphene.String()
        image = Upload()

    ok = graphene.Boolean()
    errors = OutputObjectType()

    @login_required
    def mutate(self, info, name, note, image=None):
        form = EditItemForm({
            'image': image,
            'name': name,
            'note': note,
            'user': info.context.user
        })
        if form.is_valid():
            form.process()

        return UploadImage(ok=False if form.errors else True,
                           errors=form.errors if form.errors else None)


class RegisterMutation(graphene.Mutation):
    class Arguments:
        fields = graphene.Argument(RegisterFieldsType)

    ok = graphene.Boolean()
    user = graphene.Field(UserType)
    errors = OutputObjectType()

    def mutate(self, info, fields):
        form = RegistrationForm(fields)
        form_valid = form.is_valid()
        if form_valid:
            form.save()
        return RegisterMutation(
            ok=False if form.errors else True,
            errors=form.errors or None,
        )


class DeleteUserMutation(graphene.Mutation):
    class Arguments:
        fields = graphene.Argument(RegisterFieldsType)

    ok = graphene.Boolean()
    user = graphene.Field(UserType)
    errors = OutputObjectType()

    def mutate(self, info, fields):
        form = RegistrationForm(fields)
        form_valid = form.is_valid()
        user = None
        if form_valid:
            form.save()
        ok = bool(user and not errors)
        return RegisterMutation(
            ok=ok,
            user=user,
            errors=form.errors or None,
        )


class Mutations(graphene.ObjectType):
    register = RegisterMutation.Field()
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    delete_token_cookie = graphql_jwt.DeleteJSONWebTokenCookie.Field()
    verify_token = graphql_jwt.Verify.Field()
    upload_image = UploadImage.Field()


class Query(graphene.ObjectType):
    empty = graphene.List(graphene.String)
    all_users = graphene.List(UserType)
    is_authenticated = graphene.Boolean()
    user_role = graphene.Field(UserType)
    user_notes = graphene.List(NotesType)

    def resolve_is_authenticated(self, info):
        return info.context.user.is_authenticated()

    @login_required
    @superuser_required
    def resolve_all_users(self, info, **kwargs):
        return User.objects.all()

    @login_required
    def resolve_user_role(self, info):
        return info.context.user

    @login_required
    def resolve_user_notes(self, info):
        return UserNotes.objects.filter(user=info.context.user)
