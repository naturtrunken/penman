# Penman: Penetration test manager

Web-based system to keep a pentester's notes and thoughts organized.

Features:
* Manage networks and targets.
* Add notes and screenshots to different phases of a pentest.
* Add ideas and attack vectors to not forget them.
* Add checklists to make sure not to forget important tests.

# Installation

Prerequisites: Make sure that the Docker daemon is running.

```shell
mkdir penman && cd penman
wget https://raw.githubusercontent.com/naturtrunken/penman/main/docker-compose.yml
docker-compose up # Or "docker compose up", depending how you installed compose.
```

You can now access Penman via `http://localhost:8080/`.

To install Penman via source, see [INSTALL.md](INSTALL.md)

# License

[GPLv3](LICENSE)
