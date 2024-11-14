from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password2 = validated_data.pop('password2')
        if validated_data['password'] != password2:
            raise serializers.ValidationError({'password': "Passwords don't match."})
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    """
    Serializer for user login.
    This serializer takes a username and password, authenticates the user, and 
    returns the user object if the credentials are valid.
    """

    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        """
        Validate the username and password.

        :param data: The input data
        :return: The validated data
        :raises serializers.ValidationError: If the username or password is invalid
        """
        username = data.get('username')
        password = data.get('password')

        if username and password:
            user = authenticate(username=username, password=password)

            if user:
                if not user.is_active:
                    raise serializers.ValidationError({'username': "User account is inactive."})
                return {'user': user}
            else:
                raise serializers.ValidationError({'username': "Incorrect credentials."})
        else:
            raise serializers.ValidationError({'detail': "Please provide both username and password."})

    def create(self, validated_data):
        """
        This method is not used in this serializer, but it's required by the BaseSerializer class.

        :param validated_data: The validated data
        :return: None
        """
        pass

    def update(self, instance, validated_data):
        """
        This method is not used in this serializer, but it's required by the BaseSerializer class.

        :param instance: The instance to update
        :param validated_data: The validated data
        :return: None
        """
        pass