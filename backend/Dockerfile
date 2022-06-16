# Build Rails application
FROM ruby:3.1.2
RUN apt-get update -qq && apt-get install -y postgresql-client
WORKDIR /penman
COPY . .
COPY config/database.yml.template config/database.yml
RUN bundle install --without development test

ENV RAILS_ENV production
ENV RAILS_SERVE_STATIC_FILES true
ENV RAILS_LOG_TO_STDOUT true
EXPOSE 3000

# Build the init script
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

# Configure the main process to run when running the image
CMD ["rails", "server", "-b", "0.0.0.0"]
