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


class SaveNoteMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String()
        note = graphene.String()
        image = Upload()

    ok = graphene.Boolean()
    errors = OutputObjectType()

    @login_required
    def mutate(self, info, name, note, image=None):
        """
        Upload a note with a image file. The logic is encapsulated in the form.
        :param info: Used to get the actual user logged.
        :param name: String with the name of the note, cant be null.
        :param note: String with the note, cant be null.
        :param image: Graphene scalar to upload files.
        :return:  UploadImage class with a boolean in case the operations is without errors, and errors with the
        validation errors form.
        """""
        form = NoteFrom({
            'image': image,
            'name': name,
            'note': note,
            'user': info.context.user
        })
        if form.is_valid():
            form.process()

        return SaveNoteMutation(ok=False if form.errors else True,
                           errors=form.errors if form.errors else None)


class RegisterMutation(graphene.Mutation):
    class Arguments:
        fields = graphene.Argument(RegisterFieldsType)

    ok = graphene.Boolean()
    errors = OutputObjectType()

    def mutate(self, info, fields):
        """
        Register a new user, the logic is encapsulated in the form.
        :param info:
        :param fields Register type fields
        :return: RegistrationMutation class with a boolean in case the operations is without errors, and errors with the
        validation errors form.
        """
        ok = False
        errors = None
        form = RegistrationForm(fields)
        form_valid = form.is_valid()
        if form_valid:
            form.save()
            ok = True
        else:
            # Bad practice sorry
            ok = False
            errors = form.errors['email'][0]

        return RegisterMutation(
            ok=ok,
            errors=errors or None,
        )


class DeleteUserMutation(graphene.Mutation):
    class Arguments:
        user_id = graphene.ID()

    ok = graphene.Boolean()
    errors = OutputObjectType()

    @login_required
    @superuser_required
    def mutate(self, info, user_id):
        """
        Delete the selected user
        :param info: 
        :param user_id: the user to be deleted, cant be null.
        """""
        ok = False
        errors = None
        try:
            User.objects.get(id=user_id).delete()
            ok = True
        except ObjectDoesNotExist:
            errors = ['El usuario no existe']
            ok = False

        return DeleteUserMutation(
            ok=ok,
            errors=errors
        )


class GivePermissionsMutation(graphene.Mutation):
    class Arguments:
        user_id = graphene.ID()
        permissions = graphene.String()

    ok = graphene.Boolean()
    errors = OutputObjectType()

    @login_required
    @superuser_required
    def mutate(self, info, user_id, permissions):
        ok = False
        errors = None
        try:
            user_to_give_permissions = User.objects.get(id=user_id)
            if permissions == 'staff':
                user_to_give_permissions.is_staff = True
            else:
                user_to_give_permissions.is_superuser = True
            user_to_give_permissions.save()
            ok = True
        except ObjectDoesNotExist:
            errors = ['El usuario no existe']
            ok = False

        return GivePermissionsMutation(
            ok=ok,
            errors=errors
        )


class Mutations(graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    delete_token_cookie = graphql_jwt.DeleteJSONWebTokenCookie.Field()
    verify_token = graphql_jwt.Verify.Field()
    register = RegisterMutation.Field()
    save_note = SaveNoteMutation.Field()
    delete_user = DeleteUserMutation.Field()
    give_permissions = GivePermissionsMutation.Field()


class Query(graphene.ObjectType):
    empty = graphene.List(graphene.String)
    all_users = graphene.List(UserType)
    is_authenticated = graphene.Boolean()
    user_role = graphene.Field(UserType)
    user_notes = graphene.List(NotesType)

    def resolve_is_authenticated(self, info):
        return info.context.user.is_authenticated

    @login_required
    def resolve_user_role(self, info):
        return info.context.user

    @login_required
    def resolve_user_notes(self, info):
        return UserNotes.objects.filter(user=info.context.user)

    @login_required
    @superuser_required
    def resolve_all_users(self, info, **kwargs):
        return User.objects.all()
