# Penman: Penetration test manager

Keeps a pentester's notes and thoughts organized.

Features:
* Manage networks and targets.
* Add notes and screenshots to different phases of a pentest.
* Add ideas and attack vectors to not forget them.
* Add checklists to make sure not to forget important tests.

# Installation

## Via source

Penman uses a Ruby on Rails based backend and an Angular based Frontend
together with a Postgres database.

### 1. Database

Create a new database and db user.
A Postgres database is recommended, because the ```pgcrypto``` module
is used for the UUID IDs.
But it should not be a problem to use another SQL-based database as well,
which is supported by Rails.

### 2. Backend

The backend runs on Rails 7 under Ruby 3.
(Older versions may work as well.)

1. I recommend to use [RVM](http://rvm.io/) for the RubyOnRails installation.  Minimal setup with RVM:
```shell
gpg2 --recv-keys ... (see rvm.io)
\curl -sSL https://get.rvm.io | bash -s stable
```
2. Restart the shell to use the new RVM installation.
Then, install Ruby:
```shell
rvm install ruby-3.1
```
3. Clone the repo and install the gems.
```
git clone https://github.com/naturtrunken/penman-backend.git
cd penman-backend
bundle install --without development test
```
If an error occurs from the ```pg``` gem, you may need to install the
Postgres headers (e.g. ```sudo apt install libpq-dev```) and try it again.
4. Create the secret store.
```
EDITOR=vi RAILS_ENV=production bin/rails credentials:edit
```
5. Configure the database.
Copy the file ```conf/database.yml.template``` into ```conf/database.yml```
and set the database host, username and password in the *production* section.
6. Start the build in webserver.
```
RAILS_ENV=production rails s
```
7. Check with ```curl localhost:3000``` if the backend is online.

The installation of the backend is now complete.

### 3. Frontend

1. Install node and npm, if not already installed.
[See the NPM site for instructions.](https://nodejs.org/en/download/package-manager/)

2. Install Angular via npm.
```
npm install @angular/cli
```

3. Clone the repo and install the packages via npm.
```
git clone https://github.com/naturtrunken/penman-frontend.git
cd penman-frontend
npm install --force
```

4. Start the build in webserver.
```
ng serve
```
Should the ng command not be available, you could also try
```./node_modules/@angular/cli/bin/ng.js serve```,
install npm globally via ```npm install -g @angular/cli``` or
just execute the last command with sudo / as root.

The installation of the frontend is now complete.

## Via Docker

TODO 

# License

[GPLv3](LICENSE)
