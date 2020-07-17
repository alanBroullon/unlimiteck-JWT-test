if [ -f env/bin/activate ]; then
    . env/bin/activate
fi

# Load Environment Variables from .env file
if [ -f .env ]; then
    export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
fi

export DJANGO_DEBUG=True

alias serve='make run';
alias migrations='python ./manage makemigrations backend'
alias migrationsall='python ./manage makemigrations'
alias migrateall='python ./manage migrate'
alias migrate='python ./manage migrate backend'
alias shell='python ./manage shell_plus'
alias createuser='python ./manage createsuperuser'
alias reset_db='psql -U postgres -c "DROP DATABASE unlimiteckDb" && \
                psql -U postgres -c "CREATE DATABASE unlimiteckDb" && \
                migrationsall && \
                migrateall'
alias reset_migrations='find . -path "*/migrations/*.py" -not -name "__init__.py" -delete &&
                        reset_db'
