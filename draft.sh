# auto import of environment variables
# run on terminal: ./heroku.sh

heroku config:set NODE_ENV=  &&
heroku config:set DBURL= &&
heroku config:set CLOUDINARY_API_KEY= &&
heroku config:set COOKIE_SECRET= &&
heroku config:set COOKIE_NAME= &&
heroku config:set JWT_SECRET_KEY= &&
heroku config:set JWT_EXPIRE_TIME= &&
heroku config:set GMAILUN= &&
heroku config:set GMAILPW=