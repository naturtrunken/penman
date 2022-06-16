# Penman: Penetration test manager

Web-based system to keep a pentester's notes and thoughts organized.

Features:
* Manage networks and targets.
* Add notes and screenshots to different phases of a pentest.
* Add ideas and attack vectors to not forget them.
* Add checklists to make sure not to forget important tests.

# Installation

## Via Docker

Prerequisites: Make sure that the Docker daemon is running.

```shell
git clone https://github.com/naturtrunken/penman
cd penman
docker-compose up
```

You can now access Penman via `http://localhost:8080/`.

## Via source

See [INSTALL.md](INSTALL.md)

# License

[GPLv3](LICENSE)
