# frozen_string_literal: true

server 'next.oblyk.org', user: 'lucien', roles: %w[app], port: 1622

set :deploy_to, '/var/www/oblyk/app'

# Deploy with master branch
set :branch, 'master'
