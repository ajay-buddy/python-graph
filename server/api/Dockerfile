FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /app
WORKDIR /app
COPY . /app
RUN pip install -r requirements.txt
RUN pip install graphene-django>=2.0
RUN pip install django-graphql-jwt
RUN pip install uwsgi