# frozen_string_literal: true

server '185.163.125.60', user: 'root', roles: %w[app]

set :deploy_to, '/var/www/oblyk/app'

# Deploy with master branch
set :branch, 'master'
