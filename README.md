# Eventually Django Project #
## Prerequisites ##

- python >= 2.5
- pip
- virtualenv

## Installation ##
### Creating the environment ###
Create a virtual python environment for the project.
If you're not using virtualenv you may skip this step.

#### For virtualenv ####
```bash
virtualenv venv --distribute
source venv/bin/activate
```

### Clone the code ###
Obtain the url to your git repository.

```bash
git clone git@github.com:folz/Eventually.git eventually
```

### Install requirements ###
```bash
cd eventually
pip install -r requirements.txt
```

### Configure project ###
```bash
cp eventually/__local_settings.py eventually/local_settings.py
vi eventually/local_settings.py
```

### Sync database ###
```bash
python manage.py syncdb
```

## Running ##
```bash
python manage.py runserver
```

Open browser to http://127.0.0.1:8000
