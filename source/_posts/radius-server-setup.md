---
title: Radius Server Setup
date: 2019-01-31 09:02:22
tags: Radius, Networking
Category: Networking
---

```bash
apt update && apt -y upgrade;
apt install -y postgresql postgresql-client git iptables
```

```bash 
git clone https://github.com/FreeRADIUS/freeradius-server.git &&
cd freeradius-server &&
git checkout release_3_0_18 &&
apt install -y devscripts quilt debhelper fakeroot equivs &&
fakeroot debian/rules debian/control &&
fakeroot debian/rules clean &&
mk-build-deps -ir debian/control &&
make deb &&
dpkg -i ../*.deb;
```

```bash
chown freerad:freerad -R /etc/freeradius/
su postgres && cd ~
```

Create **postgres** user named freerad, default password is radpass, using a different password it must also be changed in radiusd.conf
```bash
createuser -P -s freerad
exit
su -s /bin/bash freerad
createdb radius
```

```bash
psql -d radius < ~/mods-config/sql/main/postgresql/schema.sql;
psql -d radius < ~/mods-config/sql/main/postgresql/setup.sql;
```

```bash
freeradsql=/etc/freeradius/mods-available/sql;
sed -i 's/"rlm_sql_null"/"rlm_sql_postgresql"/' $freeradsql;
sed -i 's/dialect = "sqlite"/dialect = "postgresql"/' $freeradsql;
sed -i '/port = 3306/a port = 5432' $freeradsql;
ln -s  /etc/freeradius/mods-available/sql /etc/freeradius/mods-enabled/sql;
```

```bash
# Separate window
freeradius -X
```

If SSL context error:
```bash
Unable to check file "/etc/freeradius/certs/server.pem": No such file or directory
rlm_eap_tls: Failed initializing SSL context
```

Run bootstrap executable to generate certificate:
```bash
./etc/freeradius/certs/bootstrap
```

Adding a test user:

```bash
psql -d radius
```

```sql
INSERT INTO radcheck (username,attribute,op,value) VALUES ('davo', 'Cleartext-Password', ':=', 'password');
```

```bash
radtest davo password localhost 0 testing123
```

### Extra tools
```bash
apt install postgresql-doc pgadmin3 phppgadmin;
```